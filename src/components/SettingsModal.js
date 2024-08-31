import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { createButtonStyle } from '../utils/styleUtils';
import { getType } from '../utils/typeUtils';
import CustomSlider from './CustomSlider';

function SettingsModal({
  onClose,
  handleButtonPress,
  handleButtonRelease,
  focusTypeIndex,
  isAttackerFocus,
  clearFocus,
  setBottomType,
  toggleFocusMode,
  title,
  handleFocusChangeClick,
  audioSettings
}) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '15px',
        width: '90%',
        maxWidth: '340px',
        maxHeight: '90%',
        display: 'flex',
        flexDirection: 'column',
        color: 'black',
      }}>
        <h2 style={{
          fontSize: '1.8em',
          margin: '20px 0',
          textAlign: 'center',
          padding: '0 30px'
        }}>{title}</h2>

        <div style={{
          padding: '0 30px 30px',
          overflowY: 'auto',
          flexGrow: 1,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginBottom: '20px',
          }}>
            <button
              onClick={audioSettings.toggleMute}
              style={createButtonStyle(audioSettings.isMuted ? '#f44336' : '#4CAF50', audioSettings.isMuted ? '#d32f2f' : '#45a049')}
              onMouseDown={(e) => handleButtonPress(e, audioSettings.isMuted ? '#d32f2f' : '#45a049', false)}
              onMouseUp={(e) => handleButtonRelease(e, audioSettings.isMuted ? '#d32f2f' : '#45a049')}
              onMouseLeave={(e) => handleButtonRelease(e, audioSettings.isMuted ? '#d32f2f' : '#45a049')}
              onTouchStart={(e) => handleButtonPress(e, audioSettings.isMuted ? '#d32f2f' : '#45a049', false)}
              onTouchEnd={(e) => handleButtonRelease(e, audioSettings.isMuted ? '#d32f2f' : '#45a049')}
            >
              {audioSettings.isMuted ? '🔇 Sound Off' : '🔊 Sound On'}
            </button>
          </div>

          {/* Volume Slider - only show when sound is on */}
          {!audioSettings.isMuted && (
            <div style={{
              width: '100%',
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px',
              }}>
                <span style={{ marginRight: '15px' }}>Volume:</span>
                <div style={{
                  flex: 1,
                  maxWidth: '200px',
                }}>
                  <CustomSlider
                    value={audioSettings.volume}
                    onChange={audioSettings.setVolume}
                  />
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                {Math.round(audioSettings.volume * 100)}%
              </div>
            </div>
          )}

          {/* Focus Settings */}
          <div style={{
            width: '100%',
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
            }}>
              <button
                onClick={() => handleFocusChangeClick(-1, focusTypeIndex, setBottomType, audioSettings)}
                style={{ ...createButtonStyle('#FFD700', '#DAA520'), width: '50px', color: 'black' }}
                onMouseDown={(e) => handleButtonPress(e, '#DAA520')}
                onMouseUp={(e) => handleButtonRelease(e, '#DAA520')}
                onMouseLeave={(e) => handleButtonRelease(e, '#DAA520')}
                onTouchStart={(e) => handleButtonPress(e, '#DAA520')}
                onTouchEnd={(e) => handleButtonRelease(e, '#DAA520')}
              >
                <FaChevronLeft />
              </button>
              <div style={{
                flex: '1 1 auto',
                textAlign: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                padding: '0 10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: "'Nunito', sans-serif",
                fontSize: '1.2em',
              }}>
                <span>Focus</span>
                {focusTypeIndex === null ? (
                  <span style={{ fontSize: '0.9em', opacity: 0.8 }}>None</span>
                ) : (
                  <>
                    <span>{getType(focusTypeIndex)}</span>
                    <span style={{ fontSize: '0.8em', opacity: 0.8 }}>
                      ({isAttackerFocus ? '⚔️ Attacker' : '🛡️ Defender'})
                    </span>
                  </>
                )}
              </div>
              <button
                onClick={() => handleFocusChangeClick(1, focusTypeIndex, setBottomType, audioSettings)}
                style={{ ...createButtonStyle('#FFD700', '#DAA520'), width: '50px', color: 'black' }}
                onMouseDown={(e) => handleButtonPress(e, '#DAA520')}
                onMouseUp={(e) => handleButtonRelease(e, '#DAA520')}
                onMouseLeave={(e) => handleButtonRelease(e, '#DAA520')}
                onTouchStart={(e) => handleButtonPress(e, '#DAA520')}
                onTouchEnd={(e) => handleButtonRelease(e, '#DAA520')}
              >
                <FaChevronRight />
              </button>
            </div>
            {focusTypeIndex !== null && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                width: '100%'
              }}>
                <button
                  onClick={() => { clearFocus(audioSettings) }}
                  style={{ ...createButtonStyle('#f44336', '#d32f2f'), flex: 1 }}
                  onMouseDown={(e) => handleButtonPress(e, '#d32f2f')}
                  onMouseUp={(e) => handleButtonRelease(e, '#d32f2f')}
                  onMouseLeave={(e) => handleButtonRelease(e, '#d32f2f')}
                  onTouchStart={(e) => handleButtonPress(e, '#d32f2f')}
                  onTouchEnd={(e) => handleButtonRelease(e, '#d32f2f')}
                >
                  Clear Focus
                </button>
                <button
                  onClick={() => { toggleFocusMode(audioSettings) }}
                  style={{ ...createButtonStyle('#2196F3', '#1976D2'), flex: 1 }}
                  onMouseDown={(e) => handleButtonPress(e, '#1976D2')}
                  onMouseUp={(e) => handleButtonRelease(e, '#1976D2')}
                  onMouseLeave={(e) => handleButtonRelease(e, '#1976D2')}
                  onTouchStart={(e) => handleButtonPress(e, '#1976D2')}
                  onTouchEnd={(e) => handleButtonRelease(e, '#1976D2')}
                >
                  Make {isAttackerFocus ? '🛡️ Defender' : '⚔️ Attacker'}
                </button>
              </div>
            )}
          </div>
        </div>
        <div style={{
          padding: '20px',
          borderTop: '1px solid #eee',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <button
            onClick={() => { onClose(audioSettings) }}
            style={createButtonStyle('#f44336', '#d32f2f')}
            onMouseDown={(e) => handleButtonPress(e, '#d32f2f')}
            onMouseUp={(e) => handleButtonRelease(e, '#d32f2f')}
            onMouseLeave={(e) => handleButtonRelease(e, '#d32f2f')}
            onTouchStart={(e) => handleButtonPress(e, '#d32f2f')}
            onTouchEnd={(e) => handleButtonRelease(e, '#d32f2f')}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;