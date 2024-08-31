import React from 'react';
import { gameAreaStyles, arrowIconStyles } from './GameAreaStyles';
import { createButtonStyle } from '../utils/styleUtils';
import { FaArrowUp } from 'react-icons/fa';
import TypeSection from './TypeSection';
import ErrorBoundary from './ErrorBoundary';

const GameArea = ({
  topType,
  bottomType,
  isAttackerMode,
  handleSwapClick,
  handleTopSectionClick,
  handleButtonPress,
  handleButtonRelease,
  isSwapping,
  focusTypeIndex,
  audioSettings,
  showEffectivenessButtons
}) => {
  const isFocusMode = focusTypeIndex !== null;

  const swapButtonStyle = {
    ...gameAreaStyles.swapButton(createButtonStyle('#FFD700', '#DAA520')),
    opacity: showEffectivenessButtons ? 1 : 0.5,
  };

  return (
    <ErrorBoundary>
      <div style={gameAreaStyles.container}>
        <TypeSection
          type={topType}
          role={isAttackerMode ? 'Defender' : 'Attacker'}
          onClick={(e) => handleTopSectionClick(e, audioSettings)}
          isTopSection={true}
          isSwapping={isSwapping}
          isFocused={false}
        />
        <button
          onClick={() => handleSwapClick(audioSettings)}
          style={swapButtonStyle}
          onMouseDown={(e) => handleButtonPress(e, '#DAA520')}
          onMouseUp={(e) => handleButtonRelease(e, '#DAA520')}
          onMouseLeave={(e) => handleButtonRelease(e, '#DAA520')}
          onTouchStart={(e) => handleButtonPress(e, '#DAA520')}
          onTouchEnd={(e) => handleButtonRelease(e, '#DAA520')}
          disabled={!showEffectivenessButtons}
        >
          <FaArrowUp style={arrowIconStyles(!isAttackerMode)} />
          <span style={{ marginLeft: '5px' }}>Swap</span>
        </button>
        <TypeSection
          type={bottomType}
          role={isAttackerMode ? 'Attacker' : 'Defender'}
          isTopSection={false}
          isSwapping={isSwapping}
          isFocused={isFocusMode}
        />
      </div>
    </ErrorBoundary>
  );
};

export default GameArea;