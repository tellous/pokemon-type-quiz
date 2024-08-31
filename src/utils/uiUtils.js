import { playSound } from './soundUtils';

export const handleButtonPress = (e, color) => {
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.top = '4px';
  };
  
  export const handleButtonRelease = (e, color) => {
    e.currentTarget.style.boxShadow = `0 4px 0 ${color}`;
    e.currentTarget.style.top = '0';
  };
  
  export const darkenColor = (color, percent) => {
    const num = parseInt(color.replace("#",""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) - amt,
      G = (num >> 8 & 0x00FF) - amt,
      B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
  };
  
  export const effectivenessDisplay = {
    0: '0',
    0.5: '½',
    1: '1',
    2: '2'
  };

  // Add this function to your existing uiUtils.js file
  export const createButtonStyle = (backgroundColor, shadowColor) => ({
    backgroundColor: backgroundColor,
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '1em',
    fontFamily: "'Nunito', sans-serif",
    position: 'relative',
    top: 0,
    boxShadow: `0 4px 0 ${shadowColor}`,
    transition: 'all 0.1s ease',
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '60px',  // Ensure a minimum width for consistency
    minHeight: '40px', // Ensure a minimum height for consistency
  });

  export const handleCloseClick = (onClose, audioSettings) => {
    playSound('click', audioSettings.isMuted, audioSettings.volume);
    onClose();
  };