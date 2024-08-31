import { useState } from 'react';

const useFocusState = () => {
  const [focusTypeIndex, setFocusTypeIndex] = useState(null);
  const [isAttackerFocus, setIsAttackerFocus] = useState(true);

  const handleFocusChange = (newIndex) => {
    setFocusTypeIndex(newIndex);
  };

  const clearFocus = () => {
    setFocusTypeIndex(null);
  };

  const toggleFocusMode = () => {
    setIsAttackerFocus(!isAttackerFocus);
  };

  return {
    focusTypeIndex,
    isAttackerFocus,
    handleFocusChange,
    clearFocus,
    toggleFocusMode
  };
};

export default useFocusState;