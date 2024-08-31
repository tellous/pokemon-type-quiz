export const typeSectionStyles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      marginBottom: '20px',
    },
    typeDisplay: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%',
    },
    button: (baseStyle) => ({
      ...baseStyle,
      flex: 1,
      margin: '0 5px',
    }),
  };