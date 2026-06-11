/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Check, Users, RefreshCw, ClipboardList, Trash2, ArrowLeft, Award, Lock } from 'lucide-react';
import { RSVP } from '../types';

interface RsvpsScreenProps {
  onSuccess: () => void;
}

export default function RsvpsScreen({ onSuccess }: RsvpsScreenProps) {
  // Form State
  const [fullName, setFullName] = useState('');
  const [attendance, setAttendance] = useState<'attending' | 'declining' | null>(null);
  const [hasGuest, setHasGuest] = useState<boolean | null>(null);
  const [guestName, setGuestName] = useState('');
  const [mealPreference, setMealPreference] = useState<'Meat' | 'Fish' | 'Vegetarian' | 'Vegan' | 'No Preference' | null>(null);
  const [allergies, setAllergies] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Error messaging states
  const [errorText, setErrorText] = useState('');

  // Hosts Dashboard States
  const [showDashboard, setShowDashboard] = useState(false);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [dashboardPassword, setDashboardPassword] = useState('');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [pinError, setPinError] = useState('');

  // Load RSVPs from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('wedding_rsvps');
    if (saved) {
      try {
        setRsvps(JSON.parse(saved));
      } catch (err) {
        console.error('Error parsing RSVPs', err);
      }
    } else {
      // Seed some mock ones for host dashboard testing
      const seedRsvps: RSVP[] = [
        {
          id: 'mock-1',
          fullName: 'Charlotte Dupont',
          attendance: 'attending',
          hasGuest: true,
          guestName: 'Marc Lefebvre',
          mealPreference: 'Fish',
          allergies: 'Gluten-free',
          submittedAt: new Date(Date.now() - 86400000 * 2).toLocaleDateString(),
        },
        {
          id: 'mock-2',
          fullName: 'Thomas Bernard',
          attendance: 'attending',
          hasGuest: false,
          mealPreference: 'Meat',
          submittedAt: new Date(Date.now() - 86400000).toLocaleDateString(),
        },
        {
          id: 'mock-3',
          fullName: 'Clara Oswald',
          attendance: 'declining',
          hasGuest: false,
          mealPreference: 'No Preference',
          submittedAt: new Date().toLocaleDateString(),
        }
      ];
      localStorage.setItem('wedding_rsvps', JSON.stringify(seedRsvps));
      setRsvps(seedRsvps);
    }
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    // Validation
    if (!fullName.trim()) {
      setErrorText("Please provide your Full Name.");
      return;
    }
    if (attendance === null) {
      setErrorText("Please let us know if you'll be attending.");
      return;
    }
    if (attendance === 'attending') {
      if (hasGuest === null) {
        setErrorText("Please let us know if you are bringing a guest.");
        return;
      }
      if (hasGuest === true && !guestName.trim()) {
        setErrorText("Please provide your guest's full name.");
        return;
      }
      if (mealPreference === null) {
        setErrorText("Please select your food preference.");
        return;
      }
    }

    setIsSubmitting(true);

    const newRsvp: RSVP = {
      id: 'rsvp-' + Math.random().toString(36).substr(2, 9),
      fullName: fullName.trim(),
      attendance: attendance,
      hasGuest: hasGuest || false,
      guestName: hasGuest ? guestName.trim() : undefined,
      mealPreference: attendance === 'attending' ? (mealPreference || 'No Preference') : 'No Preference',
      allergies: allergies.trim() || undefined,
      submittedAt: new Date().toLocaleDateString(),
    };

    setTimeout(() => {
      const updatedList = [newRsvp, ...rsvps];
      setRsvps(updatedList);
      localStorage.setItem('wedding_rsvps', JSON.stringify(updatedList));

      setIsSubmitting(false);
      setHasSubmitted(true);
      onSuccess(); // triggers confetti in App component
    }, 1200);
  };

  const handleDeleteRsvp = (id: string) => {
    if (confirm('Are you sure you want to delete this RSVP?')) {
      const filtered = rsvps.filter((r) => r.id !== id);
      setRsvps(filtered);
      localStorage.setItem('wedding_rsvps', JSON.stringify(filtered));
    }
  };

  const handleResetForm = () => {
    setFullName('');
    setAttendance(null);
    setHasGuest(null);
    setGuestName('');
    setMealPreference(null);
    setAllergies('');
    setHasSubmitted(false);
    setErrorText('');
  };

  // Password checker (easy 2028 pin)
  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');
    if (dashboardPassword === '2028' || dashboardPassword.toLowerCase() === 'host') {
      setIsAdminUnlocked(true);
    } else {
      setPinError('Incorrect PIN. Hint: The year of our wedding.');
    }
  };

  // Dashboard calculations
  const totalAttending = rsvps.filter(r => r.attendance === 'attending').length;
  const totalDeclining = rsvps.filter(r => r.attendance === 'declining').length;
  const extraGuestsCount = rsvps.filter(r => r.attendance === 'attending' && r.hasGuest).length;
  const totalPeopleAttending = totalAttending + extraGuestsCount;

  // Meal counts
  const mealCountsByPref = {
    Meat: rsvps.filter(r => r.attendance === 'attending' && r.mealPreference === 'Meat').length,
    Fish: rsvps.filter(r => r.attendance === 'attending' && r.mealPreference === 'Fish').length,
    Vegetarian: rsvps.filter(r => r.attendance === 'attending' && r.mealPreference === 'Vegetarian').length,
    Vegan: rsvps.filter(r => r.attendance === 'attending' && r.mealPreference === 'Vegan').length,
    'No Preference': rsvps.filter(r => r.attendance === 'attending' && r.mealPreference === 'No Preference').length,
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      {!showDashboard && (
        <div className="text-center space-y-2 max-w-sm mx-auto px-4 pt-4">
          <span className="font-serif text-xs uppercase tracking-[0.25em] text-sage-500 font-semibold">Join Our Toast</span>
          <h2 className="font-display text-4xl font-light text-sage-800 tracking-wide uppercase">RSVP</h2>
          <p className="font-script text-2xl text-gold-500 italic pb-1">Kindly reply here</p>
          <div className="h-px bg-gradient-to-r from-transparent via-sage-300 to-transparent w-2/3 mx-auto" />
        </div>
      )}

      <div className="max-w-md mx-auto px-4">
        <AnimatePresence mode="wait">
          {/* HOST DASHBOARD PORTAL */}
          {showDashboard ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border border-linen-200 rounded-3xl p-6 shadow-md space-y-6"
            >
              <div className="flex items-center justify-between border-b border-sage-100 pb-4">
                <button
                  onClick={() => {
                    setShowDashboard(false);
                    setIsAdminUnlocked(false);
                    setDashboardPassword('');
                    setPinError('');
                  }}
                  className="flex items-center gap-1.5 text-xs text-sage-500 hover:text-sage-700 font-medium cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Invitation</span>
                </button>
                <div className="flex items-center gap-1 bg-gold-50 border border-gold-200 text-gold-700 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  <span>Hosts Hub</span>
                </div>
              </div>

              {!isAdminUnlocked ? (
                // Password protection screen
                <form onSubmit={handleVerifyPassword} className="space-y-4 py-4 text-center max-w-xs mx-auto">
                  <div className="w-12 h-12 bg-sage-50 rounded-full flex items-center justify-center text-sage-500 mx-auto">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display text-lg font-medium text-sage-800">Wedding Planner Portal</h4>
                    <p className="font-serif text-xs text-sage-500 italic">Enter PIN to access guest list & catering statistics</p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <input
                      type="password"
                      placeholder="Enter Password (Hint: 2028)"
                      value={dashboardPassword}
                      onChange={(e) => setDashboardPassword(e.target.value)}
                      className="w-full text-center px-4 py-2 border border-linen-300 rounded focus:ring-1 focus:ring-sage-300 focus:outline-none placeholder-sage-300 text-sm"
                    />
                    {pinError && <p className="text-rose-500 text-xs font-serif font-medium">{pinError}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-sage-500 hover:bg-sage-600 text-white rounded font-serif text-xs tracking-wider uppercase font-medium shadow-sm cursor-pointer"
                  >
                    Unlock Dashboard
                  </button>
                </form>
              ) : (
                // Live stats dashboard
                <div className="space-y-6">
                  <div className="text-center space-y-1">
                    <h3 className="font-display text-xl text-sage-800 font-semibold uppercase tracking-wide">RSVP Responses</h3>
                    <p className="font-serif text-xs text-sage-500">Live guestbook & catering tally</p>
                  </div>

                  {/* High level stats boxes */}
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    <div className="bg-sage-50/50 rounded-xl p-2.5 border border-sage-100">
                      <span className="font-mono text-2xl font-bold text-sage-700">{totalPeopleAttending}</span>
                      <p className="font-serif text-[10px] text-sage-500 leading-tight">Total Attending</p>
                    </div>
                    <div className="bg-linen-100/50 rounded-xl p-2.5 border border-linen-300/40">
                      <span className="font-mono text-2xl font-bold text-gray-500">{totalDeclining}</span>
                      <p className="font-serif text-[10px] text-sage-500 leading-tight">Declined</p>
                    </div>
                    <div className="bg-gold-50/50 rounded-xl p-2.5 border border-gold-200/50">
                      <span className="font-mono text-2xl font-bold text-gold-600">{rsvps.length}</span>
                      <p className="font-serif text-[10px] text-sage-500 leading-tight">Cards Received</p>
                    </div>
                  </div>

                  {/* Catering Meal Counts */}
                  <div className="bg-linen-100/50 rounded-2xl p-4 border border-linen-300/40 space-y-2.5">
                    <span className="font-sans text-[10px] uppercase font-bold tracking-wider text-sage-400 block mb-1">Catering Preference Summary</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-serif text-xs">
                      <div className="flex justify-between border-b border-linen-200 pb-1 px-1">
                        <span>🥩 Meat & Poultry:</span>
                        <span className="font-bold font-mono">{mealCountsByPref.Meat}</span>
                      </div>
                      <div className="flex justify-between border-b border-linen-200 pb-1 px-1">
                        <span>🐟 Fish & Seafood:</span>
                        <span className="font-bold font-mono">{mealCountsByPref.Fish}</span>
                      </div>
                      <div className="flex justify-between border-b border-linen-200 pb-1 px-1">
                        <span>🥬 Vegetarian:</span>
                        <span className="font-bold font-mono">{mealCountsByPref.Vegetarian}</span>
                      </div>
                      <div className="flex justify-between border-b border-linen-200 pb-1 px-1">
                        <span>🌱 Vegan Choice:</span>
                        <span className="font-bold font-mono">{mealCountsByPref.Vegan}</span>
                      </div>
                      <div className="flex justify-between border-b border-linen-200 pb-1 px-1 col-span-2">
                        <span>🤷 No Preference:</span>
                        <span className="font-bold font-mono">{mealCountsByPref['No Preference']}</span>
                      </div>
                    </div>
                  </div>

                  {/* Guest List breakdown */}
                  <div className="space-y-3">
                    <span className="font-sans text-[10px] uppercase font-bold tracking-wider text-sage-400 block">Submitted Responses (Newest First)</span>
                    
                    <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1 no-scrollbar-all">
                      {rsvps.length === 0 ? (
                        <p className="text-center font-serif text-xs italic text-sage-400 py-4">No RSVP responses yet.</p>
                      ) : (
                        rsvps.map((rsvp) => (
                          <div
                            key={rsvp.id}
                            className={`p-3.5 rounded-xl border flex flex-col justify-between text-xs transition-colors ${
                              rsvp.attendance === 'attending'
                                ? 'bg-white border-sage-200 shadow-sm'
                                : 'bg-red-50/20 border-red-100/40'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h5 className="font-medium font-sans text-sage-900 text-sm">
                                  {rsvp.fullName}
                                </h5>
                                <p className="font-serif text-[11px] text-sage-400">
                                  Sent on {rsvp.submittedAt}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                  rsvp.attendance === 'attending' ? 'bg-sage-100 text-sage-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {rsvp.attendance === 'attending' ? 'Attending' : 'Declining'}
                                </span>
                                <button
                                  onClick={() => handleDeleteRsvp(rsvp.id)}
                                  className="p-1 text-sage-400 hover:text-red-600 transition-colors cursor-pointer"
                                  title="Delete RSVP"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {rsvp.attendance === 'attending' && (
                              <div className="mt-2 pt-2 border-t border-linen-200 grid grid-cols-2 gap-y-1 gap-x-2 font-serif text-[11px] text-sage-600">
                                <div>
                                  👥 Plus One:{' '}
                                  <span className="font-medium text-sage-800 font-sans">
                                    {rsvp.hasGuest ? rsvp.guestName : 'None'}
                                  </span>
                                </div>
                                <div>
                                  🍽️ Meal:{' '}
                                  <span className="font-medium text-sage-800 font-sans">
                                    {rsvp.mealPreference}
                                  </span>
                                </div>
                                {rsvp.allergies && (
                                  <td className="col-span-2 text-rose-600 pt-0.5 italic text-[11px] leading-tight">
                                    ⚠️ Allergy warning: {rsvp.allergies}
                                  </td>
                                )}
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : hasSubmitted ? (
            /* SUBMIT CONFIRMATION SCREEN */
            <motion.div
              key="submitted"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-linen-200 rounded-3xl p-8 shadow-md text-center space-y-6"
            >
              <div className="w-16 h-16 bg-sage-50 border border-sage-100 text-sage-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8 text-gold-400 fill-transparent" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-2xl font-light text-sage-800 uppercase tracking-wide">RSVP Submitted</h3>
                <p className="font-script text-3xl text-gold-500">Thank you so much!</p>
              </div>

              <p className="font-serif text-sm leading-relaxed text-sage-600 px-2 max-w-sm mx-auto">
                {attendance === 'attending'
                  ? `Your response has been secured. We are overjoyed to celebrate our grand wedding journey alongside you on July 18, 2028, at Cipriani Wall Street!`
                  : `Your warm wishes have been nested. We will carry your sunset love from afar with us on our big day. Thank you so much for responding!`}
              </p>

              <div className="h-px bg-gradient-to-r from-transparent via-sage-200 to-transparent w-2/3 mx-auto my-2" />

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleResetForm}
                  className="px-6 py-2 border border-sage-300 font-serif text-xs uppercase tracking-wider text-sage-700 hover:bg-sage-50 rounded cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-sage-500" />
                  <span>Update RSVP</span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* RSVP FORM ELEMENT */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border border-linen-200 rounded-3xl p-6 shadow-md space-y-6 relative overflow-hidden"
            >
              {/* Decorative dove graphics on corners */}
              <div className="absolute top-3 right-4 opacity-5 pointer-events-none">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33L3,21l3.05-1a9.9,9.9,0,0,0,12,0L21,21l-1.26-2.67A10,10,0,0,0,12,2Z" />
                </svg>
              </div>

              <div className="text-center space-y-1">
                <p className="font-serif text-sm leading-relaxed text-sage-600/80 italic">
                  "We'd love for you to be part of our celebration!"
                </p>
                <div className="font-sans text-[10px] tracking-widest font-bold uppercase text-amber-900 bg-gold-100/30 px-3 py-1 rounded inline-block">
                  Please Reply by May 31, 2028
                </div>
              </div>

              {/* Real Interactive Form fields comparable to Image Panel 1 RSVP part */}
              <form onSubmit={handleFormSubmit} className="space-y-5">
                
                {/* Guest Name field */}
                <div className="space-y-1">
                  <label id="full_name_label" className="block font-serif text-xs font-semibold uppercase tracking-wider text-sage-500">
                    Guest's Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your first and last name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-sage-50/50 border border-linen-300 rounded focus:ring-1 focus:ring-sage-300 focus:outline-none placeholder-sage-300 text-sm font-sans"
                  />
                </div>

                {/* Attendance fields */}
                <div className="space-y-2">
                  <label className="block font-serif text-xs font-semibold uppercase tracking-wider text-sage-500">
                    Will you be attending our wedding?
                  </label>
                  <div className="grid gap-2 text-xs font-serif">
                    <button
                      type="button"
                      onClick={() => setAttendance('attending')}
                      className={`w-full py-2.5 px-4 text-left border rounded transition-all cursor-pointer flex items-center justify-between ${
                        attendance === 'attending'
                          ? 'bg-sage-100 border-sage-300 font-medium text-sage-800'
                          : 'bg-white border-linen-350 text-sage-600 hover:bg-sage-50/30'
                      }`}
                    >
                      <span>Absolutely, wouldn't miss it!</span>
                      {attendance === 'attending' && <Check className="w-4 h-4 text-sage-600" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAttendance('declining');
                        setHasGuest(null);
                        setMealPreference(null);
                      }}
                      className={`w-full py-2.5 px-4 text-left border rounded transition-all cursor-pointer flex items-center justify-between ${
                        attendance === 'declining'
                          ? 'bg-rose-50 border-rose-200 font-medium text-rose-800'
                          : 'bg-white border-linen-350 text-sage-600 hover:bg-sage-50/30'
                      }`}
                    >
                      <span>Regretfully, sending love from afar</span>
                      {attendance === 'declining' && <Check className="w-4 h-4 text-rose-500" />}
                    </button>
                  </div>
                </div>

                {/* Subsections if Attending */}
                <AnimatePresence>
                  {attendance === 'attending' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden space-y-5"
                    >
                      {/* Guest fields */}
                      <div className="space-y-2 pt-1 border-t border-linen-200">
                        <label className="block font-serif text-xs font-semibold uppercase tracking-wider text-sage-500">
                          Are you bringing a guest? (Plus One)
                        </label>
                        <div className="grid grid-cols-2 gap-2 text-xs font-serif">
                          <button
                            type="button"
                            onClick={() => setHasGuest(true)}
                            className={`py-2 px-4 border rounded transition-all cursor-pointer ${
                              hasGuest === true
                                ? 'bg-sage-100 border-sage-300 font-medium text-sage-800'
                                : 'bg-white border-linen-350 text-sage-600 hover:bg-sage-50/30'
                            }`}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setHasGuest(false);
                              setGuestName('');
                            }}
                            className={`py-2 px-4 border rounded transition-all cursor-pointer ${
                              hasGuest === false
                                ? 'bg-sage-100 border-sage-300 font-medium text-sage-800'
                                : 'bg-white border-linen-350 text-sage-600 hover:bg-sage-50/30'
                            }`}
                          >
                            No
                          </button>
                        </div>
                      </div>

                      {/* Guest Name field details */}
                      {hasGuest === true && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-1 pl-2 border-l border-sage-200"
                        >
                          <label className="block font-serif text-xs font-semibold uppercase tracking-wider text-sage-500 inline-flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-sage-400" />
                            <span>Guest's Full Name</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Enter guest's first and last name"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            className="w-full px-4 py-2 bg-sage-50/50 border border-linen-300 rounded focus:ring-1 focus:ring-sage-300 focus:outline-none placeholder-sage-300 text-sm font-sans"
                          />
                        </motion.div>
                      )}

                      {/* Food Preferences */}
                      <div className="space-y-2">
                        <label className="block font-serif text-xs font-semibold uppercase tracking-wider text-sage-500">
                          Please select your meal preference
                        </label>
                        <div className="grid grid-cols-2 gap-2 text-xs font-serif">
                          {(['Meat', 'Fish', 'Vegetarian', 'Vegan', 'No Preference'] as const).map((pref) => (
                            <button
                              key={pref}
                              type="button"
                              onClick={() => setMealPreference(pref)}
                              className={`py-2 px-3 border rounded transition-all cursor-pointer text-center ${
                                mealPreference === pref
                                  ? 'bg-sage-100 border-sage-300 font-medium text-sage-800'
                                  : 'bg-white border-linen-350 text-sage-600 hover:bg-sage-50/30'
                              } ${pref === 'No Preference' ? 'col-span-2' : ''}`}
                            >
                              {pref === 'Meat' && '🥩 Meat'}
                              {pref === 'Fish' && '🐟 Fish'}
                              {pref === 'Vegetarian' && '🥬 Vegetarian'}
                              {pref === 'Vegan' && '🌱 Vegan'}
                              {pref === 'No Preference' && '🤷 No Preference'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Allergies Choice */}
                      <div className="space-y-1">
                        <label className="block font-serif text-xs font-semibold uppercase tracking-wider text-sage-500">
                          Specific food allergies / dietary restrictions
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., nuts, gluten, fruits (or leave blank)"
                          value={allergies}
                          onChange={(e) => setAllergies(e.target.value)}
                          className="w-full px-4 py-2 bg-sage-50/50 border border-linen-300 rounded focus:ring-1 focus:ring-sage-300 focus:outline-none placeholder-sage-300 text-sm font-sans"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {errorText && (
                  <p className="text-rose-500 text-center text-xs font-serif font-semibold">{errorText}</p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-sage-500 hover:bg-sage-600 text-white rounded font-serif text-xs tracking-widest uppercase font-medium shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  id="submit_rsvp_button"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Securing Response...</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-3.5 h-3.5 text-rose-200 fill-rose-200" />
                      <span>Submit RSVP</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard access toggle button */}
        <div className="pt-8 text-center">
          <button
            onClick={() => {
              setShowDashboard(!showDashboard);
              setIsAdminUnlocked(false);
              setDashboardPassword('');
              setPinError('');
            }}
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-sage-400 hover:text-sage-700 font-semibold cursor-pointer"
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>{showDashboard ? 'Close Coordinator Log' : 'Host Coordinator Portal'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
