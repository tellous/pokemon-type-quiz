import React, { useState } from 'react';
import { effectivenessButtonStyle } from '../utils/styleUtils';
import { darkenColor, effectivenessDisplay } from '../utils/uiUtils';
import { effectivenessColors } from '../utils/effectivenessUtils';

const EffectivenessButtons = ({ handleEffectivenessClick, showEffectivenessButtons, audioSettings }) => {
  const handleClick = (effectiveness, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const buttonPosition = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    handleEffectivenessClick(effectiveness, audioSettings, buttonPosition);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: '15px',
      gap: '8px',
    }}>
      {[0, 0.5, 1, 2].map((effectiveness) => {
        const backgroundColor = effectivenessColors[effectiveness].background;
        const textColor = effectivenessColors[effectiveness].text;
        const shadowColor = darkenColor(backgroundColor, 20);
        return (
          <button
            key={effectiveness}
            style={{
              ...effectivenessButtonStyle(backgroundColor, shadowColor),
              color: textColor,
              transition: 'all 0.1s ease',
              opacity: showEffectivenessButtons ? 1 : 0.5,
            }}
            onClick={(e) => handleClick(effectiveness, e)}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translateY(4px)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 0 ${shadowColor}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 0 ${shadowColor}`;
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.transform = 'translateY(4px)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 0 ${shadowColor}`;
            }}
            disabled={!showEffectivenessButtons}
          >
            {effectivenessDisplay[effectiveness]}
          </button>
        );
      })}
    </div>
  );
};

export default EffectivenessButtons;