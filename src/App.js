import React from 'react';
import './App.css';
import GameArea from './components/GameArea';
import EffectivenessButtons from './components/EffectivenessButtons';
import Tooltip from './components/Tooltip';
import SettingsModal from './components/SettingsModal';
import InfoModal from './components/InfoModal';
import ControlButtons from './components/ControlButtons';
import ScoreDisplay from './components/ScoreDisplay';
import FeedbackDisplay from './components/FeedbackDisplay';
import { appStyles } from './utils/styleUtils';
import { useGameState } from './hooks/useGameState';
import { useAudioSettings } from './hooks/useAudioSettings';
import { useModalState } from './hooks/useModalState';
import { useTooltip } from './hooks/useTooltip';
import useButtonHandlers from './hooks/useButtonHandlers';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const gameState = useGameState();
  const audioSettings = useAudioSettings();
  const modalState = useModalState();
  const tooltipState = useTooltip(gameState.topType, gameState.bottomType, gameState.isAttackerMode);
  const { handleButtonPress, handleButtonRelease } = useButtonHandlers();

  return (
    <ErrorBoundary>
      <div className="App" style={appStyles.container}>
        <div style={appStyles.contentContainer}>
          <ErrorBoundary>
            <div style={appStyles.header}>
              <h1 style={appStyles.title}>Pokémon Type Quiz</h1>
              <ControlButtons
                handleShowModalClick={modalState.handleShowModalClick}
                setShowSettingsModal={() => {
                  if (!gameState.showEffectivenessButtons) {
                    gameState.resetGame();
                  }
                  modalState.setShowSettingsModal(true);
                }}
                setShowInfoModal={() => modalState.setShowInfoModal(true)}
                handleButtonPress={handleButtonPress}
                handleButtonRelease={handleButtonRelease}
                audioSettings={audioSettings}
              />
            </div>
          </ErrorBoundary>

          <ErrorBoundary>
            <ScoreDisplay
              highestStreak={gameState.highestStreak}
              currentStreak={gameState.currentStreak}
              totalQuestions={gameState.totalQuestions}
            />
          </ErrorBoundary>

          <ErrorBoundary>
            <GameArea
              topType={gameState.topType}
              bottomType={gameState.bottomType}
              isAttackerMode={gameState.isAttackerMode}
              handleTopSectionClick={tooltipState.handleTopSectionClick}
              handleButtonPress={handleButtonPress}
              handleButtonRelease={handleButtonRelease}
              isSwapping={gameState.isSwapping}
              handleSwapClick={gameState.handleSwapClick}
              audioSettings={audioSettings}
              focusTypeIndex={gameState.focusTypeIndex}
              showEffectivenessButtons={gameState.showEffectivenessButtons}
            />
          </ErrorBoundary>

          <EffectivenessButtons
            handleEffectivenessClick={gameState.handleEffectivenessClick}
            showEffectivenessButtons={gameState.showEffectivenessButtons}
            audioSettings={audioSettings}
          />

          <div style={appStyles.feedbackContainer}>
            {!gameState.showEffectivenessButtons && (
              <FeedbackDisplay
                feedback={gameState.feedback}
                handleContinue={gameState.handleContinue}
                handleButtonPress={handleButtonPress}
                handleButtonRelease={handleButtonRelease}
                setShowTooltip={tooltipState.setShowTooltip}
                audioSettings={audioSettings}
                confettiSource={gameState.confettiSource}
              />
            )}
          </div>

          {modalState.showSettingsModal && (
            <SettingsModal
              onClose={modalState.handleCloseSettingsModal}
              handleButtonPress={handleButtonPress}
              handleButtonRelease={handleButtonRelease}
              focusTypeIndex={gameState.focusTypeIndex}
              isAttackerFocus={gameState.isAttackerFocus !== null ? gameState.isAttackerFocus : gameState.isAttackerMode}
              clearFocus={gameState.clearFocus}
              toggleFocusMode={gameState.toggleFocusMode}
              setBottomType={gameState.setBottomType}
              handleFocusChangeClick={gameState.handleFocusChangeClick}
              audioSettings={audioSettings}
              title="Settings"
            />
          )}

          {modalState.showInfoModal && (
            <InfoModal
              onClose={modalState.handleCloseInfoModal}
              handleButtonPress={handleButtonPress}
              handleButtonRelease={handleButtonRelease}
              audioSettings={audioSettings}
            />
          )}

          {tooltipState.showTooltip && (
            <Tooltip
              content={tooltipState.tooltipContent()}
              targetRef={tooltipState.targetRef}
            />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
