/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Music, Heart, Calendar, MapPin, ChevronRight, BookOpen, Volume2, VolumeX } from 'lucide-react';
import { Track, StoryMilestone } from '../types';

interface ScrapbookScreenProps {
  onNavigateToDetails: () => void;
  onNavigateToRSVP: () => void;
  musicPlaying: boolean;
  setMusicPlaying: (play: boolean) => void;
  currentTrackIndex: number;
  setCurrentTrackIndex: (idx: number) => void;
}

const PLAYLIST: Track[] = [
  {
    id: '1',
    title: 'Acoustic Love Story',
    artist: 'Ethereal Acoustic',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // reliable sample
    duration: '2:15',
  },
  {
    id: '2',
    title: 'Sweet Classical Piano',
    artist: 'Linen & Lace Trio',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: '1:50',
  },
  {
    id: '3',
    title: 'Moonlight Romance',
    artist: 'Golden Hour Strings',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: '3:05',
  },
];

const STORY_MILESTONES: StoryMilestone[] = [
  {
    year: '2022',
    title: 'Our Paths Crossed',
    description: 'We met quite by accident in New York, sharing a rainy street awning. Under a massive umbrella, a simple conversation turned into a four-hour coffee date.',
  },
  {
    year: '2024',
    title: 'The First Adventure',
    description: 'From hiking through the misty peaks of Maine to sharing street food in small villages, we knew our hearts beat to the same rhythm of adventure.',
  },
  {
    year: '2026',
    title: 'He Asked, She Said Yes!',
    description: 'On a golden rocky cliffside in Amalfi, overlooking the cobalt ocean, Alexander went down on one knee. It was the easiest "Yes" ever spoken.',
  },
  {
    year: '2028',
    title: 'The Wedding Day',
    description: 'We are stepping into our next great chapter & the beginning of forever. We are so honored to have you beside us as our witness.',
  },
];

export default function ScrapbookScreen({
  onNavigateToDetails,
  onNavigateToRSVP,
  musicPlaying,
  setMusicPlaying,
  currentTrackIndex,
  setCurrentTrackIndex,
}: ScrapbookScreenProps) {
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync music playing state with HTML5 audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(PLAYLIST[currentTrackIndex].url);
      audioRef.current.loop = true;
    }

    if (musicPlaying) {
      audioRef.current.play().catch((err) => {
        console.log('Audio playback prevented by browser autocomplete/interact guidelines', err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [musicPlaying, currentTrackIndex]);

  // Handle changing track
  const handleTrackSelect = (idx: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = PLAYLIST[idx].url;
      setCurrentTrackIndex(idx);
      if (musicPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  const handleTogglePlay = () => {
    setMusicPlaying(!musicPlaying);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Page Header */}
      <div className="text-center space-y-2 max-w-sm mx-auto px-4 pt-4">
        <span className="font-serif text-xs uppercase tracking-[0.25em] text-sage-500">Memory Lane</span>
        <h2 className="font-display text-3xl font-light text-sage-800 tracking-normal">Our Shared World</h2>
        <div className="h-px bg-gradient-to-r from-transparent via-sage-300 to-transparent w-2/3 mx-auto my-2" />
      </div>

      {/* Main Collage Grid & Elements comparable to Image Panel 2 */}
      <div className="max-w-md mx-auto px-4 space-y-10">
        
        {/* Interactive Element 1: Vintage Playlist Player */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-[#f0ece1]/80 border border-linen-300/60 rounded-3xl p-6 shadow-md relative overflow-hidden flex flex-col items-center text-center space-y-4"
        >
          {/* Vinyl Record Spinning graphic */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Ambient Shadow */}
            <div className="absolute inset-0 bg-neutral-900/10 rounded-full blur-md"></div>
            {/* Vinyl Body */}
            <motion.div
              animate={{ rotate: musicPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="w-32 h-32 rounded-full cursor-pointer bg-neutral-950 flex items-center justify-center relative border border-neutral-900 shadow-inner"
              style={{
                backgroundImage: 'radial-gradient(circle, #333 10%, #111 60%, #000 100%)',
              }}
              onClick={handleTogglePlay}
            >
              {/* Vinyl Groove Rings */}
              <div className="absolute inset-2 border border-neutral-800/15 rounded-full"></div>
              <div className="absolute inset-4 border border-neutral-800/20 rounded-full"></div>
              <div className="absolute inset-6 border border-neutral-850/30 rounded-full"></div>
              <div className="absolute inset-8 border border-neutral-800/20 rounded-full"></div>

              {/* Vinyl center album art */}
              <div className="w-12 h-12 rounded-full bg-linen-100 flex items-center justify-center relative border border-neutral-600">
                <span className="font-serif text-[8px] font-bold text-center tracking-tight leading-3 text-sage-800 uppercase px-1">
                  Playlist
                </span>
                <Heart className={`w-2.5 h-2.5 absolute bottom-1.5 text-rose-500 fill-rose-500 ${musicPlaying ? 'animate-ping' : ''}`} />
              </div>
              
              {/* Center small spindle hole */}
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            </motion.div>
          </div>

          <div className="space-y-1">
            <h4 className="font-display text-sm font-semibold text-sage-800">
              {PLAYLIST[currentTrackIndex].title}
            </h4>
            <p className="font-serif text-xs italic text-sage-600">
              {PLAYLIST[currentTrackIndex].artist}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleTogglePlay}
              className="w-10 h-10 rounded-full bg-sage-500 hover:bg-sage-600 text-white flex items-center justify-center shadow-sm cursor-pointer"
            >
              {musicPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
            </button>
            <button
              onClick={() => setShowPlaylistModal(true)}
              className="px-4 py-2 border border-sage-300 rounded font-serif text-xs text-sage-700 tracking-wider hover:bg-sage-50 cursor-pointer"
            >
              SELECT TRACK
            </button>
          </div>
          <span className="absolute bottom-2 text-[10px] uppercase tracking-widest text-sage-400 font-mono">
            Vibe selection
          </span>
        </motion.div>

        {/* Polaroid Segment Header */}
        <div className="text-center pt-2">
          <span className="font-serif italic text-sm text-sage-500">"Capturing our favorite seasons of love"</span>
        </div>

        {/* Polaroid 1: Sunset Engagement (Once) */}
        <motion.div
          initial={{ rotate: -3 }}
          whileHover={{ rotate: 0, scale: 1.03 }}
          className="bg-white border border-linen-200 p-4 pb-12 shadow-md relative group max-w-[280px] mx-auto"
        >
          {/* Vintage tape top decoration */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-linen-100/70 border-x border-linen-300/30 transform rotate-2 pointer-events-none shadow-sm backdrop-blur-[1px]"></div>
          
          <div className="aspect-square w-full overflow-hidden bg-linen-50 relative border border-gray-100">
            <img
              src="/src/assets/images/couple_sunset_1781110389686.png"
              alt="Engagement Sunset"
              className="w-full h-full object-cover grayscale-15 group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute bottom-3 left-0 right-0 text-center">
            <span className="font-script text-2xl text-sage-600 tracking-wide">Once...</span>
          </div>
        </motion.div>

        {/* Polaroid 2: Joyful Laughter (Then) */}
        <motion.div
          initial={{ rotate: 3 }}
          whileHover={{ rotate: 0, scale: 1.03 }}
          className="bg-white border border-linen-200 p-4 pb-12 shadow-md relative group max-w-[280px] mx-auto !mt-8"
        >
          {/* Vintage tape top decoration */}
          <div className="absolute -top-3 left-1/3 w-16 h-6 bg-linen-100/70 border-x border-linen-300/30 transform -rotate-3 pointer-events-none shadow-sm backdrop-blur-[1px]"></div>
          
          <div className="aspect-square w-full overflow-hidden bg-linen-50 relative border border-gray-100">
            <img
              src="/src/assets/images/couple_laughing_1781110404747.png"
              alt="Candid Laughter"
              className="w-full h-full object-cover grayscale-15 group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute bottom-3 left-0 right-0 text-center">
            <span className="font-script text-2xl text-sage-600 tracking-wide">Then...</span>
          </div>
        </motion.div>

        {/* Polaroid 3: The Big Day (Always) */}
        <motion.div
          initial={{ rotate: -2 }}
          whileHover={{ rotate: 0, scale: 1.03 }}
          className="bg-white border border-linen-200 p-4 pb-12 shadow-md relative group max-w-[280px] mx-auto !mt-8"
        >
          {/* Vintage tape top decoration */}
          <div className="absolute -top-3 right-1/4 w-18 h-6 bg-linen-100/70 border-x border-linen-300/30 transform rotate-1 pointer-events-none shadow-sm backdrop-blur-[1px]"></div>
          
          <div className="aspect-square w-full overflow-hidden bg-linen-50 relative border border-gray-100">
            <img
              src="/src/assets/images/couple_main_1781110340029.png"
              alt="The Wedding Day"
              className="w-full h-full object-cover grayscale-15 group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute bottom-3 left-0 right-0 text-center">
            <span className="font-script text-2xl text-sage-600 tracking-wide">Always...</span>
          </div>
        </motion.div>

        {/* Interactive Element 2: Our Story Book Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-cream py-6 px-6 border-2 border-dashed border-sage-300/75 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 cursor-pointer select-none"
          onClick={() => setShowStoryModal(true)}
        >
          <div className="w-12 h-12 rounded-full bg-sage-50 border border-sage-100 flex items-center justify-center text-sage-600 shadow-sm">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-sm tracking-widest uppercase text-sage-800">
              Our Love Story
            </h4>
            <p className="font-serif text-xs text-sage-500 italic">
              Click to unfold our sweetest chapters
            </p>
          </div>
          <span className="text-gold-500 font-script text-xl pt-1">Read Timeline</span>
        </motion.div>

        {/* Call to Actions for navigation */}
        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNavigateToDetails}
            className="flex items-center justify-center gap-2 bg-sage-500 hover:bg-sage-600 text-white font-serif text-xs tracking-widest uppercase font-medium py-3 px-6 rounded shadow-sm transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Event Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNavigateToRSVP}
            className="flex items-center justify-center gap-2 bg-white hover:bg-sage-50 border border-sage-300 text-sage-800 font-serif text-xs tracking-widest uppercase font-medium py-3 px-6 rounded shadow-sm transition-all cursor-pointer"
          >
            <span>RSVP To Wedding</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-100" />
          </motion.button>
        </div>

      </div>

      {/* Playlist Selector Modal */}
      <AnimatePresence>
        {showPlaylistModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPlaylistModal(false)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#fafdf8] border border-sage-100 rounded-2xl max-w-sm w-full p-6 shadow-2xl relative z-10 space-y-4"
            >
              <div className="text-center space-y-1">
                <Music className="w-6 h-6 text-gold-500 mx-auto" />
                <h3 className="font-display text-lg font-medium text-sage-800">Wedding Soundtrack</h3>
                <p className="font-serif text-xs text-sage-500 italic">Select an acoustic loop theme</p>
              </div>

              <div className="divide-y divide-sage-100.20">
                {PLAYLIST.map((track, idx) => (
                  <button
                    key={track.id}
                    onClick={() => {
                      handleTrackSelect(idx);
                      setShowPlaylistModal(false);
                    }}
                    className={`w-full text-left py-3 px-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                      currentTrackIndex === idx ? 'bg-sage-100/50 font-medium text-sage-800' : 'hover:bg-sage-50 text-sage-600'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="text-sm font-sans flex items-center gap-1.5">
                        {currentTrackIndex === idx && <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />}
                        {track.title}
                      </div>
                      <div className="text-xs text-sage-400 font-serif">{track.artist}</div>
                    </div>
                    <span className="text-xs text-sage-400 font-mono">{track.duration}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={() => setShowPlaylistModal(false)}
                  className="px-6 py-2 bg-sage-500 text-white rounded font-serif text-xs uppercase tracking-widest hover:bg-sage-600 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Love Story Modal */}
      <AnimatePresence>
        {showStoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowStoryModal(false)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#fafdf8] border border-sage-100 rounded-2xl max-w-md w-full p-6 shadow-2xl relative z-10 max-h-[85vh] overflow-y-auto no-scrollbar space-y-6"
            >
              <div className="text-center space-y-1">
                <BookOpen className="w-6 h-6 text-gold-500 mx-auto" />
                <h3 className="font-display text-2xl font-light text-sage-800">Our Path To Forever</h3>
                <p className="font-serif text-xs text-sage-500 italic">"The best is yet to be..."</p>
              </div>

              {/* Story Timeline */}
              <div className="space-y-6 border-l-2 border-sage-100 pl-4 ml-2 my-4 relative">
                {STORY_MILESTONES.map((milestone, idx) => (
                  <div key={idx} className="relative space-y-1">
                    {/* Ring timeline bullet */}
                    <div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-gold-400 flex items-center justify-center shadow-sm">
                      <div className="w-1 h-1 rounded-full bg-gold-400"></div>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-xs font-bold text-gold-500 bg-gold-50 px-1.5 py-0.5 rounded border border-gold-200/50">
                        {milestone.year}
                      </span>
                      <h4 className="font-display text-base font-semibold text-sage-800">
                        {milestone.title}
                      </h4>
                    </div>
                    <p className="font-serif text-sm leading-relaxed text-sage-600/90 pl-1">
                      {milestone.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => setShowStoryModal(false)}
                  className="px-8 py-2 bg-sage-500 text-white rounded font-serif text-xs uppercase tracking-widest hover:bg-sage-600 transition-colors cursor-pointer"
                >
                  Beautiful
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
