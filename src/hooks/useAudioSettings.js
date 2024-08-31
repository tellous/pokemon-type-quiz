import { useState, useEffect, useCallback } from 'react';
import { playSound } from '../utils/soundUtils';

export const useAudioSettings = () => {
  const [isMuted, setIsMuted] = useState(() => {
    const savedMuteState = localStorage.getItem('isMuted');
    return savedMuteState ? JSON.parse(savedMuteState) : false;
  });
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem('volume');
    return savedVolume ? parseFloat(savedVolume) : 1;
  });

  useEffect(() => {
    localStorage.setItem('volume', volume.toString());
  }, [volume]);

  useEffect(() => {
    localStorage.setItem('isMuted', JSON.stringify(isMuted));
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prevMuted => {
      if (prevMuted) {
        // Only play sound when unmuting
        playSound('click', false, volume);
      }
      return !prevMuted;
    });
  }, [volume]);

  return { isMuted, setIsMuted, volume, setVolume, toggleMute };
};