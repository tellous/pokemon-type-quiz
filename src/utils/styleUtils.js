import { getTypeColor } from './typeUtils';

export const typeContainerStyle = (type) => ({
  backgroundColor: getTypeColor(type),
  width: '80px',
  height: '80px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
});

export const emojiStyle = (type) => ({
  fontSize: '2.5em',
  textShadow: `
    0 0 10px white,
    0 0 20px white,
    0 0 30px white
  `,
  color: getTypeColor(type),
});

export const typeNameStyle = (isTopSection) => ({
  margin: '10px 0 0 0',
  fontSize: '1em',
  fontWeight: 'bold',
  borderBottom: isTopSection ? '1px dashed #fff' : 'none',
  display: 'inline-block',
  cursor: isTopSection ? 'pointer' : 'default',
  paddingBottom: '2px',
  fontFamily: "'Nunito', sans-serif",
});

export const appStyles = {
  container: {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    boxSizing: 'border-box',
    fontFamily: "'Nunito', sans-serif",
  },
  innerContainer: {
    width: '100%',
    maxWidth: '375px',
    height: '812px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#282c34',
    position: 'relative',
  },
  contentContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    marginBottom: '10px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '1.2em',
    color: '#ffcb05',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    marginBottom: '10px',
    fontWeight: 'normal',
    fontFamily: "'Pocket Monk', sans-serif",
    letterSpacing: '1px',
    textAlign: 'left',
  },
  scoreContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
    width: '100%',
    fontFamily: "'Nunito', sans-serif",
  },
  scoreItem: {
    textAlign: 'center',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  scoreValue: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  scoreEmoji: {
    fontSize: '1.2em',
  },
  scoreNumber: {
    margin: '0',
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
  feedbackContainer: {
    width: '100%',
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  feedbackText: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    textAlign: 'center',
    whiteSpace: 'pre-line',
  },
};

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
  minWidth: '60px',
  minHeight: '40px',
});

export const effectivenessButtonStyle = (backgroundColor, shadowColor) => ({
  backgroundColor,
  border: 'none',
  boxShadow: `0 4px 0 ${shadowColor}`,
  cursor: 'pointer',
  outline: 'none',
  borderRadius: '8px',
  width: '70px',
  height: '70px',
  padding: 0,
  fontSize: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  top: 0,
  transition: 'all 0.1s ease',
});

export const smallButtonStyle = (backgroundColor, shadowColor) => ({
  ...createButtonStyle(backgroundColor, shadowColor),
  padding: '5px 10px',
  fontSize: '0.8em',
  minWidth: '40px',
  minHeight: '30px',
});

export const mediumButtonStyle = (backgroundColor, shadowColor) => ({
  ...createButtonStyle(backgroundColor, shadowColor),
  fontSize: '1rem',
  padding: '8px 16px',
  minWidth: '50px',
  minHeight: '35px',
});

export const largeButtonStyle = (backgroundColor, shadowColor) => ({
  ...createButtonStyle(backgroundColor, shadowColor),
  fontSize: '1.2rem',
  padding: '12px 24px',
  minWidth: '70px',
  minHeight: '45px',
});

// Add any other UI-related utilities from uiUtils.js here