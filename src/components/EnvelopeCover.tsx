/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, MailOpen } from 'lucide-react';

interface EnvelopeCoverProps {
  onOpen: () => void;
  musicPlaying: boolean;
  setMusicPlaying: (play: boolean) => void;
}

export default function EnvelopeCover({ onOpen, musicPlaying, setMusicPlaying }: EnvelopeCoverProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    setIsOpening(true);
    // Start playing music immediately during the user gesture,
    // then open the invitation after the animation completes.
    setMusicPlaying(true);
    setTimeout(() => {
      onOpen();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#fafdf8] px-4 py-8" dir="rtl">
      {/* Decorative leafy branches and vintage frame background */}
      <div className="absolute inset-4 pointer-events-none border border-sage-200/50 rounded-2xl md:inset-8 z-10">
        <div className="absolute top-4 right-4 font-serif text-sage-500 text-xs tracking-widest uppercase">
          Rana & Yousef • 18 / 8 / 2026
        </div>
        <div className="absolute bottom-4 left-4 font-amiri text-sage-500 text-sm tracking-wide">
          المعادي، القاهرة
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="w-full max-w-lg flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 z-10"
      >
        {/* Subtle music suggestion */}
        <div className="flex items-center gap-2 bg-sage-50 border border-sage-100 rounded-full py-1 px-4 text-xs text-sage-700/95 mb-2 font-cairo">
          <Heart className="w-3 animate-pulse text-gold-500 fill-gold-200" />
          <span>اضغط لتكتشف قصة حبنا وتفاصيل يومنا الكبير</span>
        </div>

        {/* Headings */}
        <div className="space-y-1">
          <h3 className="font-amiri text-base md:text-lg text-sage-600 font-medium tracking-normal">
            بداية رحلة العمر والعهد الأبدي لـ
          </h3>
          <h1 className="font-script text-6xl md:text-7xl text-gold-600 tracking-wide py-2 leading-none drop-shadow-sm select-all">
            Rana & Yousef
          </h1>
        </div>

        {/* The Envelope Representation */}
        <div className="relative w-full max-w-sm aspect-[4/3] my-4 cursor-pointer" onClick={handleOpenClick}>
          {/* Back floral/shadow layer */}
          <div className="absolute inset-0 bg-[#e8ece3]/30 rounded-lg blur-xl transform scale-102 -rotate-1"></div>

          {/* Envelope Mockup with Motion */}
          <motion.div
            animate={
              isOpening
                ? {
                    scale: [1, 1.05, 0.9],
                    rotate: [0, 1, -1, 0],
                    opacity: [1, 1, 0],
                    y: [0, -10, 50],
                  }
                : { y: [0, -4, 0] }
            }
            transition={
              isOpening
                ? { duration: 1.6, ease: 'easeInOut' }
                : { repeat: Infinity, duration: 4, ease: 'easeInOut' }
            }
            className="relative w-full h-full rounded-xl overflow-hidden shadow-xl border border-sage-100 bg-white"
          >
            {/* Sage Green Envelope design view */}
            <img
              src="/src/assets/images/cover_envelope_1781110322215.png"
              alt="دعوة زفاف رنا ويوسف"
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />

            {/* Simulated 3D Flap Overlay for opening animation */}
            {isOpening && (
              <motion.div
                initial={{ rotateX: 0 }}
                animate={{ rotateX: 180 }}
                transition={{ duration: 0.8, ease: 'easeIn' }}
                style={{ originY: 0 }}
                className="absolute top-0 left-0 right-0 h-1/2 bg-sage-400 border-b border-sage-500 shadow-md transform-gpu"
              />
            )}
          </motion.div>

          {/* Floating Gold Wax Seal - Clicking this triggers opening */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenClick}
            disabled={isOpening}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center z-20 cursor-pointer"
            style={{
              background: 'radial-gradient(circle, #e9c874 10%, #d1a137 70%, #aa681a 100%)',
              boxShadow: '0 4px 10px rgba(170, 104, 26, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.5)',
            }}
          >
            <div className="absolute inset-1 rounded-full border border-gold-100/30 flex items-center justify-center">
              <span className="font-serif text-xl font-bold text-amber-950 drop-shadow-sm select-none tracking-normal">
                R & Y
              </span>
            </div>
            {/* Subtle glow circle */}
            <span className="absolute -inset-1 rounded-full border-2 border-gold-300 animate-ping opacity-25"></span>
          </motion.button>
        </div>

        {/* Action Button */}
        <div className="pt-2 z-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenClick}
            disabled={isOpening}
            className="relative px-10 py-3.5 bg-white hover:bg-sage-50 border border-sage-300 rounded-lg font-cairo text-sm tracking-widest text-sage-800 uppercase shadow-sm transition-all focus:outline-none flex items-center gap-3 cursor-pointer"
            id="tap_to_open_button"
          >
            <MailOpen className="w-4 h-4 text-sage-600" />
            <span className="font-bold">{isOpening ? 'يتم فتح الدعوة...' : 'افتح الدعوة'}</span>
          </motion.button>
        </div>

        {/* Traditional poetic verse */}
        <div className="pt-4 font-amiri text-base italic text-sage-500 max-w-sm mx-auto leading-relaxed">
          "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً"
        </div>
      </motion.div>
    </div>
  );
}
