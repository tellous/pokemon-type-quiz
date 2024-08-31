export const calculateEffectiveness = (attackerType, defenderType) => {
    // Implement your effectiveness calculation logic here
    // This is a placeholder, replace with your actual implementation
    return 1;
  };
  
  export const getEffectivenessText = (effectiveness) => {
    switch (effectiveness) {
      case 0: return "No effect";
      case 0.5: return "Not very effective";
      case 1: return "Normal effectiveness";
      case 2: return "Super effective";
      default: return "Unknown effectiveness";
    }
  };
  
  export const getEffectivenessColor = (effectiveness) => {
    switch (effectiveness) {
      case 0: return 'gray';
      case 0.5: return 'red';
      case 1: return 'white';
      case 2: return 'green';
      default: return 'white';
    }
  };
  
export const generateTooltipContent = (attackerType, defenderType, effectiveness) => (
  <>
    <p style={{ fontSize: '16px', marginBottom: '10px' }}>
      {attackerType} (⚔️) vs {defenderType} (🛡️)
    </p>
    <p className="effectiveness-number" style={{
      color: getEffectivenessColor(effectiveness),
      fontSize: '28px',
      margin: '15px 0'
    }}>
      {effectiveness}x
    </p>
    <p style={{ fontSize: '16px', marginTop: '10px' }}>{getEffectivenessText(effectiveness)}</p>
  </>
);

export const effectivenessColors = {
  0: { background: '#A9A9A9', text: 'white' },    // Gray for no effect
  0.5: { background: '#FF4500', text: 'white' }, // Red-Orange for not very effective
  1: { background: '#F0EAD6', text: 'black' },   // Eggshell for normal effectiveness
  2: { background: '#32CD32', text: 'black' }    // Lime Green for super effective
};

export const effectivenessDisplay = {
  0: '0',
  0.5: '½',
  1: '1',
  2: '2'
};