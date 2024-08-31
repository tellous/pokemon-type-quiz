import React, { useEffect, useState } from 'react';
import './Tooltip.css';

const Tooltip = ({ content, targetRef }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const updatePosition = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + window.scrollY + 5, // Added 5px gap
          left: rect.left + window.scrollX + rect.width / 2
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [targetRef]);

  return (
    <div className="tooltip" style={{
      top: `${position.top}px`,
      left: `${position.left}px`,
      width: 'calc(100% - 40px)', // Make it responsive
      maxWidth: '300px', // Set a maximum width
    }}>
      {content}
    </div>
  );
};

export default Tooltip;