/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';

interface Petal {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'sage' | 'white';
  baseColor: string;
  shadeColor: string;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  flutterSpeed: number;
  flutterWidth: number;
  flutterOffset: number;
  blur: boolean;
}

const SAGE_COLORS = [
  { base: '#afc1ab', shade: '#6d7d69' }, // Light Sage to Medium Sage
  { base: '#d1dcce', shade: '#8f9e8b' }, // Pale Sage to Soft Sage
  { base: '#8f9e8b', shade: '#556252' }, // Soft Sage to Darker Sage
  { base: '#e8ede6', shade: '#afc1ab' }, // Very light cream-sage to Sage
  { base: '#6d7d69', shade: '#384236' }, // Sage to Deep Forest Sage
];

const WHITE_COLORS = [
  { base: '#ffffff', shade: '#f4f6f3' }, // Pure white to soft sage-50
  { base: '#fafbf8', shade: '#e8ede6' }, // Ivory white to light sage-100
  { base: '#fffcf7', shade: '#ebdcb9' }, // Delicate White to Linen Cream
  { base: '#faf9f6', shade: '#d1dcce' }, // Off-white to subtle sage-200
];

export default function FallingPetals() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high density displays (Retina) for super crisp, cinematic petals
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Initialize 65 dynamic cinematic petals
    const petalCount = 65;
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      const isSage = Math.random() > 0.55; // beautiful mix of white and sage envelope colors
      const colorPalette = isSage 
        ? SAGE_COLORS[Math.floor(Math.random() * SAGE_COLORS.length)]
        : WHITE_COLORS[Math.floor(Math.random() * WHITE_COLORS.length)];

      const size = 6 + Math.random() * 14; // Sizes from 6px to 20px
      petals.push({
        id: i,
        // Distribute initially all over the screen but biased towards spawning at top
        x: Math.random() * window.innerWidth,
        y: Math.random() * -window.innerHeight, // Start above the screen for a smooth stream
        size,
        type: isSage ? 'sage' : 'white',
        baseColor: colorPalette.base,
        shadeColor: colorPalette.shade,
        speedY: 0.6 + Math.random() * 1.4, // Gentle slow fall
        speedX: -0.4 + Math.random() * 0.8, // Slight initial horizontal drift
        rotation: Math.random() * 360,
        rotationSpeed: -1.5 + Math.random() * 3.0, // Natural spin
        opacity: 0.3 + Math.random() * 0.65, // Varying transparency
        flutterSpeed: 0.01 + Math.random() * 0.03, // Sway frequency
        flutterWidth: 10 + Math.random() * 25, // Sway horizontal amplitude
        flutterOffset: Math.random() * Math.PI * 2, // Dynamic start angle
        blur: size > 16 && Math.random() > 0.5, // Foreground depth-of-field blur effect
      });
    }

    petalsRef.current = petals;

    // Draw an organic petal outline with bezier curves
    const drawPetalShape = (c: CanvasRenderingContext2D, size: number, type: 'sage' | 'white', baseCol: string, shadeCol: string) => {
      c.beginPath();
      
      // Luxurious curved heart-like drop shape
      c.moveTo(0, -size / 2);
      c.bezierCurveTo(size / 1.5, -size / 2, size / 1.1, size / 8, size / 4, size / 2);
      c.bezierCurveTo(size / 12, size / 2 + 3, -size / 12, size / 2 + 3, -size / 4, size / 2);
      c.bezierCurveTo(-size / 1.1, size / 8, -size / 1.5, -size / 2, 0, -size / 2);
      c.closePath();

      // Premium linear gradient mimicking organic vein shading
      const gradient = c.createLinearGradient(-size / 2, -size / 2, size / 2, size / 2);
      gradient.addColorStop(0, baseCol);
      gradient.addColorStop(0.7, baseCol);
      gradient.addColorStop(1, shadeCol);
      c.fillStyle = gradient;
      c.fill();

      // Soft ambient golden/white edge highlight or center vein to add ultimate realism
      c.beginPath();
      c.moveTo(0, -size / 2);
      c.quadraticCurveTo(0, 0, 0, size / 2);
      c.strokeStyle = type === 'sage' ? 'rgba(255,255,255,0.22)' : 'rgba(109,125,105,0.15)'; // soft white or dusty sage vein
      c.lineWidth = 1;
      c.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      timeRef.current += 0.005;
      const globalWind = Math.sin(timeRef.current) * 0.35 + 0.15; // Slow ambient breathing wind drift

      petalsRef.current.forEach((petal) => {
        // Apply physics
        petal.y += petal.speedY;
        
        // Horizontal position combines constant drift, global wind, and individual sinus flutter
        petal.flutterOffset += petal.flutterSpeed;
        const individualSway = Math.sin(petal.flutterOffset) * 0.45;
        petal.x += petal.speedX + globalWind + individualSway;
        
        // Spin rotation
        petal.rotation += petal.rotationSpeed;

        // When a petal exits the bottom or sides of screen, recycle it to the top
        if (petal.y > window.innerHeight + 40) {
          petal.y = -40;
          petal.x = Math.random() * window.innerWidth;
          // Vary the physics on recycled entries for endless natural motion
          petal.speedY = 0.6 + Math.random() * 1.4;
          petal.rotation = Math.random() * 360;
        }
        
        if (petal.x < -40) {
          petal.x = window.innerWidth + 20;
        } else if (petal.x > window.innerWidth + 40) {
          petal.x = -20;
        }

        // Draw Petal
        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate((petal.rotation * Math.PI) / 180);
        ctx.globalAlpha = petal.opacity;

        // Apply a high-end cinematic Gaussian shadow/blur filter mock
        if (petal.blur) {
          ctx.shadowColor = petal.type === 'sage' ? 'rgba(109, 125, 105, 0.2)' : 'rgba(180, 160, 120, 0.12)';
          ctx.shadowBlur = 8;
        } else {
          ctx.shadowColor = 'rgba(0, 0, 0, 0.02)';
          ctx.shadowBlur = 3;
          ctx.shadowOffsetY = 1.5;
        }

        drawPetalShape(ctx, petal.size, petal.type, petal.baseColor, petal.shadeColor);
        ctx.restore();
      });

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="falling_petals_background"
      className="fixed inset-0 pointer-events-none select-none z-[48]"
      style={{
        mixBlendMode: 'normal',
        willChange: 'transform',
      }}
    />
  );
}
