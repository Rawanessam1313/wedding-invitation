/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Music, Heart, Calendar, MapPin, Compass, ExternalLink, Volume2, VolumeX } from 'lucide-react';
import { Track } from '../types';

const WHITE_ROSES_IMAGE = new URL('../assets/images/white_roses_bouquet_1781207909642.png', import.meta.url).href;

interface ArabicInvitationDetailProps {
  musicPlaying: boolean;
  setMusicPlaying: (play: boolean) => void;
  currentTrackIndex: number;
  setCurrentTrackIndex: (idx: number) => void;
}

const ARABIC_PLAYLIST: Track[] = [
  {
    id: '1',
    title: 'Until I Found You',
    artist: 'Stephen Sanchez',
    url: new URL('../assets/images/Stephen Sanchez,Until I Found You.mp3', import.meta.url).href,
    duration: '2:56',
  },
];

export default function ArabicInvitationDetail({
  musicPlaying,
  setMusicPlaying,
  currentTrackIndex,
  setCurrentTrackIndex,
}: ArabicInvitationDetailProps) {
  const handleTogglePlay = () => {
    setMusicPlaying(!musicPlaying);
  };

  const handleOpenGoogleMaps = () => {
    // Open Google Maps to the user's requested location
    window.open('https://maps.app.goo.gl/VAHG3da28zm7uXzH6?g_st=iw', '_blank');
  };

  return (
    <div className="space-y-8 pb-16 text-right" dir="rtl">
      
      {/* 1. Main Welcome Section */}
      <div className="text-center space-y-4 max-w-lg mx-auto px-4 pt-4 pb-2">
        <h3 className="font-amiri text-2xl md:text-3xl font-bold text-sage-800 tracking-normal drop-shadow-sm leading-snug">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </h3>
        <p className="font-amiri text-lg md:text-xl text-sage-600 leading-relaxed font-medium">
          بكل الود والحب نتشرف وندعوكم لحضور حفل زفاف
        </p>
        
        <div className="font-amiri text-5xl md:text-6xl font-black text-gold-600 tracking-wide pt-2 pb-1 drop-shadow-sm">
          رنا & يوسف
        </div>

        <div className="h-0.5 bg-gradient-to-r from-transparent via-sage-300 to-transparent w-2/3 mx-auto my-3" />
        
        <p className="font-amiri text-base leading-relaxed text-sage-600 font-light max-w-md mx-auto px-2">
          "يسعدنا ويشرفنا حضوركم لتكتمل بهجتنا وتشاركونا فرحة العمر الكبرى بمناسبة ميثاقنا الغليظ وبداية حياتنا الزوجية السعيدة. حضوركم يبعث البهجة والأمل في قلوبنا ويرسم السعادة على دروبنا."
        </p>
      </div>

      {/* 2. Side-by-side responsive Grid Section (Not stacked strictly in one giant column anymore) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4 items-stretch">
        
        {/* RIGHT COLUMN on desktop: Wedding details */}
        <div className="md:h-full flex flex-col justify-stretch">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-linen-200 shadow-md h-full flex flex-col justify-between space-y-6">
            <div>
              <h3 className="font-amiri text-xl text-sage-800 font-bold border-b border-sage-100 pb-2">تفاصيل الحفل</h3>

              <div className="space-y-4 mt-5">
                {/* Date Card */}
                <div className="bg-[#FAF8F3] p-4 rounded-xl border border-linen-200/50 flex items-start gap-3 transition-all hover:bg-sage-50/20">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <Calendar className="w-4.5 h-4.5 text-gold-500" />
                  </div>
                  <div className="space-y-0.5 text-right">
                    <span className="font-amiri text-[11px] font-bold text-sage-500 uppercase">تاريخ الزفاف</span>
                    <h5 className="font-cairo text-sm font-bold text-sage-800">الثلاثاء، ١٨ أغسطس ٢٠٢٦</h5>
                    <p className="font-amiri text-[11px] text-sage-500">موافق ١٨ / ٨ / ٢٠٢٦ بانتظار تشريفكم</p>
                  </div>
                </div>

                {/* Ceremony Card */}
                <div className="bg-[#FAF8F3] p-4 rounded-xl border border-linen-200/50 flex items-start gap-3 transition-all hover:bg-sage-50/20">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <Compass className="w-4.5 h-4.5 text-gold-500" />
                  </div>
                  <div className="space-y-0.5 text-right">
                    <span className="font-amiri text-[11px] font-bold text-sage-500 uppercase">مراسم الاستقبال وبدء الزفاف</span>
                    <h5 className="font-cairo text-sm font-bold text-sage-800">الساعة السادسة مساءً (6:00 مساءً)</h5>
                    <p className="font-amiri text-[11px] text-sage-500">نستقبل ضيوفنا الكرام لتبدأ مراسم حفلنا الدافئ</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Traditional Quote inside details */}
            <div className="text-center font-amiri text-xs italic text-sage-400 pt-3 border-t border-linen-100">
              "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا"
            </div>
          </div>
        </div>

        {/* LEFT COLUMN on desktop: Music Player & Location Map */}
        <div className="space-y-6 flex flex-col justify-between">
          
          {/* Vinyl Record Music Player Widget */}
          <div className="bg-[#f0ece1]/90 backdrop-blur-sm border border-linen-300/60 rounded-3xl p-5 pb-6 shadow-md flex flex-col items-center text-center space-y-4 flex-1 justify-center relative min-h-[290px] overflow-visible">
            
            {/* Custom Vinyl Sleeve and Sliding Disk Widget with Watercolor Flowers (Just like user uploaded picture) */}
            <div className="relative w-full max-w-[250px] h-36 flex items-center justify-center">
              
              {/* Sleeve jacket on the left */}
              <div className="absolute left-1 top-2 w-[116px] h-[116px] bg-white border border-linen-200 rounded-lg shadow-md p-1.5 flex flex-col justify-between items-center text-center z-20">
                <div className="border border-linen-150 p-1 flex-1 flex flex-col justify-center items-center w-full h-full rounded-md bg-stone-50/10">
                  <span className="font-script text-2xl text-sage-600 tracking-wide select-none leading-none">Playlist</span>
                  <span className="font-serif text-[8px] text-sage-450 tracking-widest mt-1 uppercase select-none leading-none">RANA & YOUSEF</span>
                </div>
              </div>

              {/* Vinyl record spinning on the right, partially behind the sleeve */}
              <div className="absolute right-1 top-2.5 w-[112px] h-[112px] z-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-neutral-900/10 rounded-full blur-sm"></div>
                <motion.div
                  animate={{ rotate: musicPlaying ? 360 : 0 }}
                  transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                  className="w-[110px] h-[110px] rounded-full cursor-pointer bg-neutral-950 flex items-center justify-center relative border border-neutral-900 shadow-inner"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #333 10%, #111 60%, #000 100%)',
                  }}
                  onClick={handleTogglePlay}
                >
                  <div className="absolute inset-2 border border-neutral-850/15 rounded-full"></div>
                  <div className="absolute inset-4 border border-neutral-800/20 rounded-full"></div>
                  <div className="absolute inset-6 border border-neutral-850/30 rounded-full"></div>
                  
                  {/* Vinyl center label */}
                  <div className="w-11 h-11 rounded-full bg-linen-100 flex items-center justify-center relative border border-neutral-600">
                    <Heart className={`w-3.5 h-3.5 text-rose-500 fill-rose-500 ${musicPlaying ? 'animate-pulse' : ''}`} />
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                </motion.div>
              </div>

              {/* Breathtaking watercolor floral bouquet overlapping underneath (Just like the uploaded reference!) */}
              <div className="absolute -bottom-3 right-1/2 translate-x-1/2 w-44 h-24 pointer-events-none select-none z-30">
                <img
                  src={WHITE_ROSES_IMAGE}
                  alt="باقة ورود"
                  className="w-full h-full object-contain mix-blend-multiply opacity-100"
                  referrerPolicy="no-referrer"
                />
              </div>

            </div>

            <div className="space-y-0.5 text-center pt-2 z-10">
              <h4 className="font-cairo text-sm font-bold text-sage-800">
                {ARABIC_PLAYLIST[0].title}
              </h4>
              <p className="font-amiri text-xs italic text-sage-600">
                {ARABIC_PLAYLIST[0].artist}
              </p>
            </div>

            <button
              onClick={handleTogglePlay}
              className="px-6 py-2 bg-sage-500 hover:bg-sage-600 text-white rounded-lg font-cairo text-xs font-bold shadow-sm cursor-pointer transition-all flex items-center gap-2 justify-center"
            >
              {musicPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-white" />
                  <span>إيقاف الموسيقى</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white mr-0.5" />
                  <span>تشغيل الموسيقى</span>
                </>
              )}
            </button>
          </div>

          {/* Location details card (No Banner image!) */}
          <div className="bg-white/80 backdrop-blur-sm p-5 rounded-3xl border border-linen-200 shadow-md space-y-4">
            <div className="space-y-0.5 text-center">
              <span className="font-amiri text-[11px] font-bold text-sage-500 uppercase">موقع ومقر الحفل</span>
              <h4 className="font-cairo text-sm font-bold text-sage-800">كورنيش المعادي، القاهرة</h4>
              <p className="font-amiri text-[11px] text-sage-500">فيلا مطلة على ضفاف نيل المعادي الخلاب</p>
            </div>

            {/* Interactive map view */}
            <div
              onClick={handleOpenGoogleMaps}
              className="cursor-pointer group relative h-32 rounded-xl overflow-hidden border border-linen-350 shadow-inner flex items-center justify-center bg-[#fdfaf5]"
            >
              <img
                src="/src/assets/images/google_map_1781110373472.png"
                alt="خريطة المعادي"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-neutral-950/10 group-hover:bg-neutral-950/20 transition-all flex items-center justify-center">
                <div className="bg-white/95 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[10px] font-cairo font-bold text-sage-800 shadow-sm">
                  <Compass className="w-3.5 h-3.5 text-gold-500 animate-spin-slow" />
                  <span>انقر لفتح الخريطة المباشرة</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleOpenGoogleMaps}
              className="w-full py-2.5 bg-sage-500 hover:bg-sage-600 text-white rounded-lg font-cairo text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5 text-gold-200" />
              <span>اتجاهات الوصول (المعادي)</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
