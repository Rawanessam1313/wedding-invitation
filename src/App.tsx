/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import EnvelopeCover from './components/EnvelopeCover';
import ArabicInvitationDetail from './components/ArabicInvitationDetail';
import FallingPetals from './components/FallingPetals';
import { Music, Feather } from 'lucide-react';

const DEFAULT_TRACK_URL = new URL('./assets/images/Stephen Sanchez,Until I Found You.mp3', import.meta.url).href;
const WHITE_ROSES_IMAGE = new URL('./assets/images/white_roses_bouquet_1781207909642.png', import.meta.url).href;

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [musicPlaying, setMusicPlayingState] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const ensureAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio(DEFAULT_TRACK_URL);
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = 0.8;
      audioRef.current = audio;
    }
    return audioRef.current;
  };

  const setMusicPlaying = (play: boolean) => {
    setMusicPlayingState(play);
    const audio = ensureAudio();
    if (play) {
      audio.play().catch((err) => {
        console.log('Audio playback prevented by browser guidelines', err);
      });
    } else {
      audio.pause();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f8f6f0] text-sage-900 font-sans antialiased overflow-x-hidden select-none" dir="rtl">
      {/* Dynamic Romantic Falling Petals Background */}
      <FallingPetals />
      
      {/* 1. Envelope Cover Layer */}
      <AnimatePresence>
        {!isOpen && (
          <EnvelopeCover
            onOpen={() => setIsOpen(true)}
            musicPlaying={musicPlaying}
            setMusicPlaying={setMusicPlaying}
          />
        )}
      </AnimatePresence>

      {/* 2. Main Invitation Content */}
      {isOpen && (
        <div className="flex flex-col min-h-screen relative">
          
          {/* Elegant Page Corner Floral Embellishments (Inside the page) */}
          <div className="fixed top-0 left-0 w-36 h-36 opacity-35 pointer-events-none z-30 select-none">
            <img
              src={WHITE_ROSES_IMAGE}
              alt="ورود"
              className="w-full h-full object-contain mix-blend-multiply rotate-180"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="fixed bottom-0 right-0 w-36 h-36 opacity-35 pointer-events-none z-30 select-none">
            <img
              src={WHITE_ROSES_IMAGE}
              alt="ورود"
              className="w-full h-full object-contain mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Header Bar */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="sticky top-0 z-40 bg-[#f8f6f0]/95 backdrop-blur-md border-b border-linen-300/40 py-4 px-6 flex items-center justify-between"
          >
            {/* Left side text in Arabic */}
            <div className="flex items-center gap-2">
              <span className="font-amiri text-2xl font-bold text-sage-800 tracking-wide">رنا & يوسف</span>
              <span className="font-amiri text-sm text-sage-500 font-semibold">• ١٨ أغسطس ٢٠٢٦</span>
            </div>

            {/* Quick Audio Control in Header */}
            <button
              onClick={() => setMusicPlaying(!musicPlaying)}
              className={`p-2.5 rounded-full border border-linen-350 bg-white shadow-sm flex items-center justify-center transition-all cursor-pointer ${
                musicPlaying ? 'text-gold-500 hover:text-gold-600 bg-gold-50' : 'text-sage-400 hover:text-sage-600'
              }`}
              title={musicPlaying ? 'كتم الموسيقى الرومانسية' : 'تشغيل الموسيقى الرومانسية'}
            >
              <Music className={`w-4 h-4 ${musicPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
            </button>
          </motion.header>

          {/* Left/Right elegant border branches on wide desktops */}
          <div className="hidden xl:block fixed left-6 top-1/4 max-w-xs opacity-20 text-sage-400 pointer-events-none scale-x-[-1] animate-pulse">
            <Feather className="w-14 h-14" />
          </div>
          <div className="hidden xl:block fixed right-6 top-1/4 max-w-xs opacity-20 text-sage-400 pointer-events-none animate-pulse">
            <Feather className="w-14 h-14" />
          </div>

          {/* Core Layout Stage */}
          <main className="flex-1 flex flex-col justify-start py-6 px-4 md:px-0">
            <div className="w-full max-w-4xl mx-auto bg-transparent">
              
              {/* Single View Arabic Details Content (Scrapbook, Dress Code, RSVP completely removed) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <ArabicInvitationDetail
                  musicPlaying={musicPlaying}
                  setMusicPlaying={setMusicPlaying}
                  currentTrackIndex={currentTrackIndex}
                  setCurrentTrackIndex={setCurrentTrackIndex}
                />
              </motion.div>

            </div>
          </main>

          {/* Core Simple Arabic Footer */}
          <footer className="py-8 text-center border-t border-linen-200/50 mt-8">
            <p className="font-amiri text-sm text-sage-400 max-w-xs mx-auto leading-relaxed">
              تسرنا تلبية دعوتكم الغالية بقلوب ملؤها المحبة والشوق. دمتم ودامت أفراحكم بكل خير.
            </p>
          </footer>

        </div>
      )}

    </div>
  );
}
