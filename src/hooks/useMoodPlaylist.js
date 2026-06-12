/**
 * useMoodPlaylist — Fetches YouTube tracks matching the current mood.
 *
 * Uses the hardcoded track arrays from moodConfig.js.
 */
import { useState, useEffect, useRef } from 'react';
import { getMoodConfig } from '../utils/moodConfig';

const MOOD_CHANGE_DEBOUNCE_MS = 3000; // Wait 3s of consistent mood before switching

export function useMoodPlaylist(currentMood) {
  const [tracks, setTracks] = useState([]);
  const [activeMood, setActiveMood] = useState('calm');

  const debounceTimer = useRef(null);
  const consecutiveMoodRef = useRef({ mood: 'calm', count: 0 });

  // Debounced mood change — requires consistent mood for 3 seconds
  useEffect(() => {
    if (!currentMood) return;

    if (currentMood === consecutiveMoodRef.current.mood) {
      consecutiveMoodRef.current.count++;
    } else {
      consecutiveMoodRef.current = { mood: currentMood, count: 1 };
    }

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      setActiveMood(consecutiveMoodRef.current.mood);
    }, MOOD_CHANGE_DEBOUNCE_MS);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [currentMood]);

  // Set tracks when activeMood changes
  useEffect(() => {
    const config = getMoodConfig(activeMood);
    if (config && config.tracks) {
      setTracks(config.tracks);
    }
  }, [activeMood]);

  const refreshPlaylist = () => {
    // For YouTube, we just shuffle the current tracks
    setTracks(prevTracks => {
      const newTracks = [...prevTracks];
      // Simple shuffle
      for (let i = newTracks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newTracks[i], newTracks[j]] = [newTracks[j], newTracks[i]];
      }
      return newTracks;
    });
  };

  return {
    tracks,
    isLoading: false,
    activeMood,
    error: null,
    refreshPlaylist,
  };
}

export default useMoodPlaylist;
