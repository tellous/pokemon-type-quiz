export const gameAreaStyles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      marginTop: '30px',
    },
    typeSectionWrapper: {
      width: '100%',
      height: '180px', // Increased from 150px to 180px
    },
    swapButton: (swapButtonStyle) => ({
      ...swapButtonStyle,
      margin: '20px 0',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      width: '120px',
      color: 'black', // Change text color to black for better contrast on yellow
      transition: 'all 0.1s ease',
    }),
    continueButton: (baseStyle) => ({
      ...baseStyle,
      marginTop: '10px',
      width: '100%',
    }),
  };
  
  export const arrowIconStyles = (isRotated) => ({
    transform: isRotated ? 'rotate(180deg)' : 'none',
    transition: 'transform 0.3s ease-in-out',
  });