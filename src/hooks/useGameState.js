import { useState, useEffect, useCallback } from 'react';
import { getTypes, getRandomType } from '../utils/typeUtils';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storageUtils';
import { calculateEffectiveness } from '../utils/effectivenessUtils';
import { playSound } from '../utils/soundUtils';

export const useGameState = (audioSettings) => {
  const [topType, setTopType] = useState(getRandomType());
  const [bottomType, setBottomType] = useState(getRandomType(topType));
  const [isAttackerMode, setIsAttackerMode] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [currentStreak, setCurrentStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(() =>
    loadFromLocalStorage('highestStreak', 0)
  );
  const [totalQuestions, setTotalQuestions] = useState(() =>
    loadFromLocalStorage('totalQuestions', 0)
  );
  const [showEffectivenessButtons, setShowEffectivenessButtons] = useState(true);
  const [isSwapping, setIsSwapping] = useState(false);
  const [focusTypeIndex, setFocusTypeIndex] = useState(null);
  const [isAttackerFocus, setIsAttackerFocus] = useState(true);
  const [confettiSource, setConfettiSource] = useState(null);

  const handleFocusChange = useCallback((newFocusTypeIndex) => {
    setFocusTypeIndex(newFocusTypeIndex);
    if (newFocusTypeIndex !== null) {
      const types = getTypes();
      setBottomType(types[newFocusTypeIndex]);
    }
  }, []);

  const handleSwap = useCallback(() => {
    if (showEffectivenessButtons) {
      setIsSwapping(true);
      setIsAttackerMode(prev => !prev);
      if (focusTypeIndex !== null) {
        setIsAttackerFocus(prev => !prev);
      }
    }
  }, [showEffectivenessButtons, focusTypeIndex]);

  const updateTypes = useCallback(() => {
    const newTopType = getRandomType(topType);
    
    if (focusTypeIndex !== null) {
      // If focus is set, only update the top type
      setTopType(newTopType);
    } else {
      // If no focus, update both types
      const newBottomType = getRandomType(bottomType);
      setTopType(newTopType);
      setBottomType(newBottomType);
    }

    //console.log('New types set. topType:', newTopType, 'bottomType:', focusTypeIndex !== null ? getTypes()[focusTypeIndex] : bottomType);
  }, [topType, bottomType, focusTypeIndex]);

  const handleContinue = useCallback(() => {
    //console.log('handleContinue called. focusTypeIndex:', focusTypeIndex, 'isAttackerFocus:', isAttackerFocus);

    updateTypes();
    setShowEffectivenessButtons(true);
    setFeedback(null);
    setConfettiSource(null);

    // Ensure the attacker mode matches the focus mode if it exists
    if (focusTypeIndex !== null) {
      setIsAttackerMode(isAttackerFocus);
    }
  }, [updateTypes, focusTypeIndex, isAttackerFocus]);

  const handleSwapClick = useCallback((audioSettings) => {
    handleSwap();
    playSound('click', audioSettings.isMuted, audioSettings.volume);
  }, [handleSwap]);

  useEffect(() => {
    saveToLocalStorage('highestStreak', highestStreak);
  }, [highestStreak]);

  useEffect(() => {
    saveToLocalStorage('totalQuestions', totalQuestions);
  }, [totalQuestions]);

  const resetGame = useCallback(() => {
    updateTypes();
    setFeedback('');
    setShowEffectivenessButtons(true);
    setConfettiSource(null);
  }, [updateTypes]);

  const clearFocus = useCallback((audioSettings) => {
    playSound('click', audioSettings.isMuted, audioSettings.volume);
    setFocusTypeIndex(null);
    setIsAttackerFocus(null);
  }, []);

  const handleEffectivenessClick = useCallback((effectiveness, audioSettings, buttonPosition) => {
    const attacker = isAttackerMode ? bottomType : topType;
    const defender = isAttackerMode ? topType : bottomType;
    const correctEffectivenessValue = calculateEffectiveness(attacker, defender);

    setTotalQuestions(prev => prev + 1);

    if (effectiveness === correctEffectivenessValue) {
      playSound('correct', audioSettings.isMuted, audioSettings.volume);
      setFeedback('Correct!');
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > highestStreak) {
        setHighestStreak(newStreak);
      }
      setConfettiSource(buttonPosition);
    } else {
      playSound('incorrect', audioSettings.isMuted, audioSettings.volume);
      setFeedback(`Incorrect. The correct answer was ${correctEffectivenessValue === 0.5 ? '½' : correctEffectivenessValue}x`);
      setCurrentStreak(0); // Only reset the streak on incorrect answers
      setConfettiSource(null);
    }

    setShowEffectivenessButtons(false);
  }, [isAttackerMode, topType, bottomType, currentStreak, highestStreak]);

  const handleFocusChangeClick = useCallback((direction, focusTypeIndex, setBottomType, audioSettings) => {
    playSound('click', audioSettings.isMuted, audioSettings.volume);

    const types = getTypes();
    let newIndex;
    if (focusTypeIndex === null) {
      newIndex = direction === 1 ? 0 : types.length - 1;
    } else {
      newIndex = (focusTypeIndex + direction + types.length) % types.length;
    }
    handleFocusChange(newIndex, audioSettings);

    // Update only the bottom type
    const newFocusType = types[newIndex];
    setBottomType(newFocusType);

    return newIndex;
  }, []);

  const toggleFocusMode = useCallback((audioSettings) => {
    playSound('click', audioSettings.isMuted, audioSettings.volume);
    setFocusTypeIndex(prev => prev === null ? getTypes().indexOf(getRandomType()) : prev);
    setIsAttackerFocus(prev => !prev);
    setIsAttackerMode(prev => !prev); // Add this line to update isAttackerMode
  }, []);

  return {
    topType,
    bottomType,
    isAttackerMode,
    setTopType,
    setBottomType,
    setIsAttackerMode,
    feedback,
    setFeedback,
    currentStreak,
    setCurrentStreak,
    highestStreak,
    setHighestStreak,
    totalQuestions,
    setTotalQuestions,
    showEffectivenessButtons,
    setShowEffectivenessButtons,
    resetGame,
    isSwapping,
    toggleFocusMode,
    handleFocusChange,
    focusTypeIndex,
    isAttackerFocus,
    setFocusTypeIndex,
    setIsAttackerFocus,
    clearFocus,
    handleContinue,
    handleEffectivenessClick,
    handleFocusChangeClick,
    handleSwapClick,
    confettiSource
  };
};