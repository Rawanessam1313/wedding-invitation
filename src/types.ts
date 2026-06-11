/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RSVP {
  id: string;
  fullName: string;
  attendance: 'attending' | 'declining';
  hasGuest: boolean;
  guestName?: string;
  mealPreference: 'Meat' | 'Fish' | 'Vegetarian' | 'Vegan' | 'No Preference';
  allergies?: string;
  submittedAt: string;
}

export interface StoryMilestone {
  year: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string; // audio loop URL (standard royalty-free links)
  duration: string;
}
