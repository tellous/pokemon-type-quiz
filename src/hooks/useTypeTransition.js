import { useState, useEffect } from 'react';

const useTypeTransition = (initialType, initialRole, isFocused) => {
  const [isSliding, setIsSliding] = useState(false);
  const [currentType, setCurrentType] = useState(initialType || 'Normal');
  const [currentRole, setCurrentRole] = useState(initialRole || 'Defender');

  useEffect(() => {
    if (initialType !== currentType && !isFocused) {
      setIsSliding(true);
      const timer = setTimeout(() => {
        setCurrentType(initialType);
        setCurrentRole(initialRole);
        setIsSliding(false);
      }, 300); // This should match the CSS transition duration
      return () => clearTimeout(timer);
    } else {
      setCurrentType(initialType);
      setCurrentRole(initialRole);
    }
  }, [initialType, currentType, initialRole, isFocused]);

  return { isSliding, currentType, currentRole };
};

export default useTypeTransition;