import React from 'react';
import { appStyles } from '../utils/styleUtils';
import { formatNumber } from '../utils/gameUtils';

const scoreEmojis = {
  Highest: '🏆',
  Current: '🔥',
  Total: '📝'
};

const ScoreDisplay = ({ highestStreak, currentStreak, totalQuestions }) => (
  <div style={appStyles.scoreContainer}>
    {['Highest', 'Current', 'Total'].map((label) => (
      <div key={label} style={appStyles.scoreItem}>
        <div style={appStyles.scoreValue}>
          <span style={appStyles.scoreEmoji}>{scoreEmojis[label]}</span>
          <p style={appStyles.scoreNumber}>
            {formatNumber(label === 'Highest' ? highestStreak : label === 'Current' ? currentStreak : totalQuestions)}
          </p>
        </div>
      </div>
    ))}
  </div>
);

export default ScoreDisplay;