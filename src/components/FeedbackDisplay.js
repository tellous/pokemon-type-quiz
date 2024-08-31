import React, { useState, useEffect, useRef } from 'react';
import { appStyles, createButtonStyle } from '../utils/styleUtils';
import Confetti from 'react-confetti';

const FeedbackDisplay = ({ feedback, handleContinue, handleButtonPress, handleButtonRelease, setShowTooltip, audioSettings, confettiSource }) => {
  const isCorrect = feedback.startsWith('Correct');
  const feedbackColor = isCorrect ? '#4CAF50' : '#f44336';
  const [mainFeedback, additionalFeedback] = feedback.split('.').map(s => s.trim());
  const [showConfetti, setShowConfetti] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (isCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 700);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }, [isCorrect]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginTop: '10px',
    }}>
      {showConfetti && confettiSource && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={50}
          gravity={0.8}
          initialVelocityY={20}
          initialVelocityX={10}
          colors={['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722']}
          confettiSource={{
            x: confettiSource.x,
            y: confettiSource.y,
            w: 0,
            h: 0
          }}
          tweenDuration={100}
          drawShape={ctx => {
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              ctx.lineTo(4 * Math.cos(i * 2 * Math.PI / 6), 4 * Math.sin(i * 2 * Math.PI / 6));
            }
            ctx.closePath();
            ctx.fill();
          }}
        />
      )}
      <p 
        style={{
          ...appStyles.feedbackText,
          color: feedbackColor,
          fontWeight: 'bold',
          fontSize: '1.2em',
          marginBottom: '5px',
          animation: shake ? 'shake 0.5s' : 'none',
        }}
      >
        {mainFeedback}
      </p>
      {additionalFeedback && (
        <p style={{
          ...appStyles.feedbackText,
          fontSize: '1em',
          marginTop: '0',
        }}>
          {additionalFeedback}
        </p>
      )}
      <button
        style={createButtonStyle('#2196F3', '#1976D2')}
        onClick={() => handleContinue(setShowTooltip, audioSettings)}
        onMouseDown={(e) => handleButtonPress(e, '#1976D2')}
        onMouseUp={(e) => handleButtonRelease(e, '#1976D2')}
        onMouseLeave={(e) => handleButtonRelease(e, '#1976D2')}
        onTouchStart={(e) => handleButtonPress(e, '#1976D2')}
        onTouchEnd={(e) => handleButtonRelease(e, '#1976D2')}
      >
        Continue
      </button>
    </div>
  );
};

export default FeedbackDisplay;