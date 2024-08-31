import { useCallback } from 'react';

const useButtonHandlers = () => {
  const handleButtonPress = useCallback((e, color) => {
    if (e && e.currentTarget && !e.currentTarget.disabled) {
      e.currentTarget.style.transform = 'translateY(4px)';
      e.currentTarget.style.boxShadow = 'none';
    }
  }, []);

  const handleButtonRelease = useCallback((e, color) => {
    if (e && e.currentTarget && !e.currentTarget.disabled) {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = `0 4px 0 ${color}`;
    }
  }, []);

  return { handleButtonPress, handleButtonRelease };
};

export default useButtonHandlers;