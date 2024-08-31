import React from 'react';
import { createButtonStyle } from '../utils/styleUtils';

const InfoModal = ({ onClose, handleButtonPress, handleButtonRelease, audioSettings }) => {
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
          padding: '0 20px'
        }}>Credits</h2>
        
        <div style={{
          padding: '0 20px 20px',
          overflowY: 'auto',
          flexGrow: 1,
        }}>
          <p>Created with <a href="https://cursor.com">Cursor</a></p>
          <p>Inspired by <a href="https://www.youtube.com/@AIForHumansShow">AI4Humans Podcast</a></p>
          <p>Sound effects obtained from <a href="https://freesound.org">freesound.org</a></p>
          <p>Bertrof (<a href="https://freesound.org/people/Bertrof/">https://freesound.org/people/Bertrof/</a>)</p>
          <p>"Game Sound Correct.wav"</p>
          <p>"Game Sound Wrong.wav"</p>
          <p>"Click Fingers.wav.wav"</p>
          <p>Pokémon and All Respective Names are Trademark & © of Nintendo 1996-{new Date().getFullYear()}</p>
          <p style={{
            marginTop: '20px',
            fontWeight: 'bold',
            fontSize: '0.9em',
          }}>
            Version 1.2
          </p>
        </div>
        
        <div style={{
          padding: '20px',
          borderTop: '1px solid #eee',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <button
            style={createButtonStyle('#f44336', '#d32f2f')}
            onClick={() => onClose(audioSettings)}
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
};

export default InfoModal;