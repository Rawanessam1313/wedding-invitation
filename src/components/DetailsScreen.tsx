/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Compass, ExternalLink, Brush } from 'lucide-react';

interface DetailsScreenProps {
  onNavigateToRSVP: () => void;
}

interface Swatch {
  id: string;
  name: string;
  colorClass: string;
  colorHex: string;
  description: string;
}

const SWATCHES: Swatch[] = [
  {
    id: 'linen',
    name: 'Soft Linen',
    colorClass: 'bg-linen-100 border-linen-300',
    colorHex: '#F8F6F0',
    description: 'A touch of soft off-white, light linen beige, sand color, cream, or champagne velvet. Clean and classic.',
  },
  {
    id: 'rose',
    name: 'Blush Sand',
    colorClass: 'bg-[#ebdcd1] border-[#d8c3b4]',
    colorHex: '#ebdcd1',
    description: 'A muted, warm peach-pink, dusky rose, light terracotta, or warm champagne-blush silk. Delicate and romantic.',
  },
  {
    id: 'sage',
    name: 'Sage Mist',
    colorClass: 'bg-sage-300 border-sage-400',
    colorHex: '#afc1ab',
    description: 'Dusty eucalytus tone, matching the wedding paper. Suits soft linen suits and flowing tulle.',
  },
  {
    id: 'olive',
    name: 'Deep Forest',
    colorClass: 'bg-[#556252] border-[#444f41]',
    colorHex: '#556252',
    description: 'Rich dark olive green, emerald, forest mist, or cedar bark. Excellent for sharp velvet blazers or accents.',
  },
];

export default function DetailsScreen({ onNavigateToRSVP }: DetailsScreenProps) {
  const [selectedSwatch, setSelectedSwatch] = useState<Swatch>(SWATCHES[2]); // Default sage

  const handleOpenGoogleMaps = () => {
    // Open google maps with Cipriani Wall Street location
    window.open('https://maps.google.com/?q=Cipriani+Wall+Street,+55+Wall+St,+New+York,+NY+10005', '_blank');
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Header */}
      <div className="text-center space-y-2 max-w-sm mx-auto px-4 pt-4">
        <span className="font-serif text-xs uppercase tracking-[0.25em] text-sage-500">The Celebration</span>
        <h2 className="font-display text-3xl font-light text-sage-800 tracking-normal text-center uppercase">The Details</h2>
        <h3 className="font-script text-3xl text-gold-500 text-center">You are invited</h3>
        <div className="h-px bg-gradient-to-r from-transparent via-sage-300 to-transparent w-2/3 mx-auto my-2" />
      </div>

      {/* Welcome Message + Envelope Reveal comparable to Image Panel 3 */}
      <div className="max-w-md mx-auto px-4 space-y-8">
        
        {/* Envelope with couple dancing */}
        <div className="relative bg-[#ffffff] border border-linen-200 rounded-2xl p-4 shadow-md overflow-hidden flex flex-col space-y-4">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-100">
            <img
              src="/src/assets/images/couple_main_1781110340029.png"
              alt="Morgane and Alexander Reception Invite"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute top-2 right-6 w-12 h-12 bg-gold-400 rounded-full opacity-65 flex items-center justify-center -rotate-12 transform">
            <span className="font-serif font-bold text-amber-950 text-[10px] tracking-widest uppercase">Love</span>
          </div>
          
          <p className="font-serif text-sm leading-relaxed text-sage-700 font-light text-center px-2">
            "We are so honored to have you with us. What started as a cherished friendship has blossomed into a lifelong love, leading us to this joyful milestone. Within these pages, you will find everything you need to know about our celebration, the venue, and the loved ones who make our lives complete. We look forward to beginning our next chapter and creating timeless memories by your side."
          </p>
        </div>

        {/* Date and Location Sections */}
        <div className="space-y-6">
          <h4 className="font-script text-4xl text-center text-sage-800">Date and Location</h4>
          
          <div className="grid gap-4">
            {/* Date Box */}
            <div className="bg-white hover:bg-sage-50/50 p-5 rounded-2xl border border-linen-200 shadow-sm flex items-start gap-4 transition-all">
              <div className="w-10 h-10 rounded-full bg-sage-50 flex items-center justify-center text-sage-600 mt-0.5 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-serif text-[10px] tracking-widest uppercase text-sage-400 font-semibold">Wedding Date</span>
                <h5 className="font-display text-base font-semibold text-sage-800">Friday, July 18, 2028</h5>
                <p className="font-serif text-xs text-sage-500">Mark your lunar and solar calendars</p>
              </div>
            </div>

            {/* Ceremony Box */}
            <div className="bg-white hover:bg-sage-50/50 p-5 rounded-2xl border border-linen-200 shadow-sm flex items-start gap-4 transition-all">
              <div className="w-10 h-10 rounded-full bg-sage-50 flex items-center justify-center text-sage-600 mt-0.5 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-serif text-[10px] tracking-widest uppercase text-sage-400 font-semibold">Ceremony</span>
                <h5 className="font-display text-base font-semibold text-sage-800">4:30 PM Celebration</h5>
                <p className="font-serif text-sm text-sage-700 font-medium font-serif leading-tight">Cipriani Wall Street</p>
                <p className="font-serif text-xs text-sage-500">55 Wall Street, New York, NY 10005</p>
              </div>
            </div>

            {/* Reception Box */}
            <div className="bg-white hover:bg-sage-50/50 p-5 rounded-2xl border border-linen-200 shadow-sm flex items-start gap-4 transition-all">
              <div className="w-10 h-10 rounded-full bg-sage-50 flex items-center justify-center text-sage-600 mt-0.5 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-serif text-[10px] tracking-widest uppercase text-sage-400 font-semibold">Reception</span>
                <h5 className="font-display text-base font-semibold text-sage-800">6:00 PM Cocktails & Banquet</h5>
                <p className="font-serif text-sm text-sage-700 font-medium font-serif leading-tight">Cipriani Wall Street, Grand Ballroom</p>
                <p className="font-serif text-xs text-sage-500">An evening filled with music, dining, and endless laughter</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dress Code Section with Interactive Swatches */}
        <div className="space-y-6 pt-4">
          <h4 className="font-script text-4xl text-center text-sage-800">Dress Code</h4>
          
          <div className="bg-[#fcfafa] border border-linen-200 p-6 rounded-2xl shadow-sm text-center space-y-4">
            <p className="font-serif text-sm leading-relaxed text-sage-600 italic">
              "Kindly join us in formal dress, drawing inspiration from our custom signature tones."
            </p>

            {/* Swatch Selection Grid */}
            <div className="flex justify-center items-center gap-4 py-2">
              {SWATCHES.map((swatch) => (
                <button
                  key={swatch.id}
                  onClick={() => setSelectedSwatch(swatch)}
                  className={`relative w-12 h-12 rounded-full border-2 cursor-pointer shadow-sm focus:outline-none transition-transform duration-300 ${
                    swatch.colorClass
                  } ${
                    selectedSwatch.id === swatch.id
                      ? 'scale-115 ring-2 ring-sage-400/50 ring-offset-2'
                      : 'hover:scale-105 opacity-85'
                  }`}
                  aria-label={swatch.name}
                >
                  {selectedSwatch.id === swatch.id && (
                    <motion.span
                      layoutId="selectedColorIndicator"
                      className="absolute inset-1 rounded-full border border-white/60 flex items-center justify-center text-[9px] text-[#222]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Selected Swatch Description Panel */}
            <motion.div
              layout
              transition={{ duration: 0.3 }}
              className="bg-sage-50/50 rounded-xl p-4 border border-sage-100 space-y-1 text-left"
            >
              <div className="flex items-center gap-1.5 font-bold text-sage-700 font-sans text-xs uppercase tracking-wide">
                <Brush className="w-3.5 h-3.5 text-gold-500" />
                <span>Selected tone: {selectedSwatch.name}</span>
              </div>
              <p className="font-serif text-xs leading-relaxed text-sage-600 font-light">
                {selectedSwatch.description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Travel and Stay Section */}
        <div className="space-y-6 pt-4">
          <h4 className="font-script text-4xl text-center text-sage-800">Travel and Stay</h4>
          
          <div className="bg-[#ffffff] border border-linen-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
            
            {/* The grand interior view of Venue */}
            <div className="h-44 overflow-hidden relative">
              <img
                src="/src/assets/images/venue_inside_1781110355206.png"
                alt="Venues Grand columns"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent flex items-end p-4">
                <span className="font-serif text-xs tracking-widest text-[#f5f1e8] uppercase bg-sage-850/40 backdrop-blur-md px-2 py-1 rounded">
                  Ballroom Interior
                </span>
              </div>
            </div>

            {/* Map Area */}
            <div className="p-5 space-y-4">
              <div className="text-center space-y-1">
                <h5 className="font-display text-sm font-semibold text-sage-800">Getting to the Celebration</h5>
                <p className="font-serif text-xs text-sage-500">Cipriani Wall Street, 55 Wall Street, New York</p>
              </div>

              {/* Styled Maps Image */}
              <div
                onClick={handleOpenGoogleMaps}
                className="cursor-pointer group relative h-40 rounded-xl overflow-hidden border border-linen-300 shadow-inner flex items-center justify-center bg-[#fdfaf5]"
              >
                <img
                  src="/src/assets/images/google_map_1781110373472.png"
                  alt="Cipriani Wall Street map"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay hover effect and Map Compass */}
                <div className="absolute inset-0 bg-neutral-950/5 group-hover:bg-neutral-950/20 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-white/95 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-serif font-medium text-sage-800 shadow-md group-hover:scale-110 transition-transform">
                    <Compass className="w-4 h-4 text-gold-500 animate-spin-slow" />
                    <span>View Live Map</span>
                    <ExternalLink className="w-3 h-3 text-sage-400" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleOpenGoogleMaps}
                  className="flex-1 py-3 border border-sage-300 rounded font-serif text-xs tracking-widest uppercase text-sage-800 hover:bg-sage-50 cursor-pointer flex items-center justify-center gap-2 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-gold-500" />
                  Get Directions
                </button>

                <button
                  onClick={onNavigateToRSVP}
                  className="flex-1 py-3 bg-sage-500 hover:bg-sage-600 text-white rounded font-serif text-xs tracking-widest uppercase font-medium cursor-pointer shadow-sm flex items-center justify-center gap-1 transition-colors"
                >
                  RSVP NOW
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
