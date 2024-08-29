import React, { useState, useEffect } from 'react';
import './App.css';
import { FaExchangeAlt } from 'react-icons/fa';

function App() {
  const types = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];

  const getRandomType = () => {
    return types[Math.floor(Math.random() * types.length)];
  };

  const [isAttackerMode, setIsAttackerMode] = useState(false);
  const [topType, setTopType] = useState(getRandomType());
  const [bottomType, setBottomType] = useState(types[0]);
  const [feedback, setFeedback] = useState('');
  const [currentStreak, setCurrentStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(() => {
    const savedStreak = localStorage.getItem('highestStreak');
    return savedStreak ? parseInt(savedStreak, 10) : 0;
  });
  const [totalQuestions, setTotalQuestions] = useState(() => {
    const savedTotalQuestions = localStorage.getItem('totalQuestions');
    return savedTotalQuestions ? parseInt(savedTotalQuestions, 10) : 0;
  });

  const typeColors = {
    Normal: '#A8A878', Fire: '#F08030', Water: '#6890F0', Electric: '#F8D030', Grass: '#78C850',
    Ice: '#98D8D8', Fighting: '#C03028', Poison: '#A040A0', Ground: '#E0C068', Flying: '#A890F0',
    Psychic: '#F85888', Bug: '#A8B820', Rock: '#B8A038', Ghost: '#705898', Dragon: '#7038F8',
    Dark: '#705848', Steel: '#B8B8D0', Fairy: '#EE99AC'
  };

  const correctEffectiveness = {
    "Normal": { "Rock": 0.5, "Ghost": 0, "Steel": 0.5 },
    "Fire": { "Fire": 0.5, "Water": 0.5, "Grass": 2, "Ice": 2, "Bug": 2, "Rock": 0.5, "Dragon": 0.5, "Steel": 2 },
    "Water": { "Fire": 2, "Water": 0.5, "Grass": 0.5, "Ground": 2, "Rock": 2, "Dragon": 0.5 },
    "Electric": { "Water": 2, "Electric": 0.5, "Grass": 0.5, "Ground": 0, "Flying": 2, "Dragon": 0.5 },
    "Grass": { "Fire": 0.5, "Water": 2, "Grass": 0.5, "Poison": 0.5, "Ground": 2, "Flying": 0.5, "Bug": 0.5, "Rock": 2, "Dragon": 0.5, "Steel": 0.5 },
    "Ice": { "Fire": 0.5, "Water": 0.5, "Grass": 2, "Ice": 0.5, "Ground": 2, "Flying": 2, "Dragon": 2, "Steel": 0.5 },
    "Fighting": { "Normal": 2, "Ice": 2, "Poison": 0.5, "Flying": 0.5, "Psychic": 0.5, "Bug": 0.5, "Rock": 2, "Ghost": 0, "Dark": 2, "Steel": 2, "Fairy": 0.5 },
    "Poison": { "Grass": 2, "Poison": 0.5, "Ground": 0.5, "Rock": 0.5, "Ghost": 0.5, "Steel": 0, "Fairy": 2 },
    "Ground": { "Fire": 2, "Electric": 2, "Grass": 0.5, "Poison": 2, "Flying": 0, "Bug": 0.5, "Rock": 2, "Steel": 2 },
    "Flying": { "Electric": 0.5, "Grass": 2, "Fighting": 2, "Bug": 2, "Rock": 0.5, "Steel": 0.5 },
    "Psychic": { "Fighting": 2, "Poison": 2, "Psychic": 0.5, "Dark": 0, "Steel": 0.5 },
    "Bug": { "Fire": 0.5, "Grass": 2, "Fighting": 0.5, "Poison": 0.5, "Flying": 0.5, "Psychic": 2, "Ghost": 0.5, "Dark": 2, "Steel": 0.5, "Fairy": 0.5 },
    "Rock": { "Fire": 2, "Ice": 2, "Fighting": 0.5, "Ground": 0.5, "Flying": 2, "Bug": 2, "Steel": 0.5 },
    "Ghost": { "Normal": 0, "Psychic": 2, "Ghost": 2, "Dark": 0.5, "Steel": 0.5 },
    "Dragon": { "Dragon": 2, "Steel": 0.5, "Fairy": 0 },
    "Dark": { "Fighting": 0.5, "Psychic": 2, "Ghost": 2, "Dark": 0.5, "Steel": 0.5, "Fairy": 0.5 },
    "Steel": { "Fire": 0.5, "Water": 0.5, "Electric": 0.5, "Ice": 2, "Rock": 2, "Steel": 0.5, "Fairy": 2 },
    "Fairy": { "Fire": 0.5, "Fighting": 2, "Poison": 0.5, "Dragon": 2, "Dark": 2, "Steel": 0.5 }
  };

  const effectivenessColors = {
    0: { background: '#36454F', text: '#ffffff' },    // Charcoal with white text
    '1/2': { background: '#ff0000', text: '#ffffff' },  // Red with white text
    1: { background: '#ffffff', text: '#000000' },    // White with black text
    2: { background: '#00ff00', text: '#000000' },    // Green with black text
  };

  const [topTooltipVisible, setTopTooltipVisible] = useState(false);
  const [bottomTooltipVisible, setBottomTooltipVisible] = useState(false);

  const typeNameStyle = (isAttacker) => ({
    margin: '10px 0 0 0',
    fontSize: '1em',
    fontWeight: isAttacker ? 'bold' : 'normal',
    borderBottom: isAttacker ? '1px dashed #fff' : 'none',
    display: 'inline-block',
    cursor: isAttacker ? 'pointer' : 'default',
    paddingBottom: '2px',
  });

  const Tooltip = ({ attacker, defender }) => {
    const effectiveness = correctEffectiveness[attacker][defender] || 1;
    
    const typeStyle = (type) => ({
      color: typeColors[type],
      fontWeight: 'bold',
    });

    return (
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '0.9em',
        zIndex: 1000,
        textAlign: 'center',
      }}>
        <p style={{ margin: '0 0 5px 0' }}>
          <span style={typeStyle(attacker)}>{typeEmojis[attacker]} {attacker}</span>
          {' vs '}
          <span style={typeStyle(defender)}>{typeEmojis[defender]} {defender}</span>
        </p>
        <p style={{ margin: '0', fontWeight: 'bold' }}>
          {effectiveness === 0.5 ? '½' : effectiveness}x Effectiveness
        </p>
      </div>
    );
  };

  useEffect(() => {
    setTopTooltipVisible(false);
    setBottomTooltipVisible(false);
  }, [topType, bottomType]);

  const typeContainerStyle = (type) => ({
    backgroundColor: typeColors[type],
    width: '80px',
    height: '80px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
  });

  const emojiStyle = (type) => ({
    fontSize: '2.5em', // Slightly larger emoji
    textShadow: `
      0 0 10px white,
      0 0 20px white,
      0 0 30px white
    `,
    color: typeColors[type], // Set the emoji color to match the type color
  });

  const effectivenessDisplay = {
    0: "0",
    '1/2': "½",
    1: "1",
    2: "2"
  };

  const buttonStyle = (backgroundColor, textColor) => ({
    flexGrow: 0,
    flexShrink: 0,
    width: '60px',
    height: '60px',
    fontSize: '1.2em',
    fontWeight: 'bold',
    backgroundColor: backgroundColor,
    color: textColor,
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.1s ease',
    margin: '0 5px',
    position: 'relative',
    top: 0,
    boxShadow: `0 6px 0 ${darkenColor(backgroundColor, 20)}`,
    outline: 'none',
  });

  const darkenColor = (color, amount) => {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) - amount)).toString(16)).substr(-2));
  };

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    localStorage.setItem('highestStreak', highestStreak.toString());
  }, [highestStreak]);

  useEffect(() => {
    localStorage.setItem('totalQuestions', totalQuestions.toString());
  }, [totalQuestions]);

  const resetGame = () => {
    setTopType(getRandomType());
    setBottomType(types[0]);
    setFeedback('');
    setCurrentStreak(0);
  };

  const handleEffectivenessClick = (effectiveness) => {
    const attacker = isAttackerMode ? bottomType : topType;
    const defender = isAttackerMode ? topType : bottomType;
    const correctEffectivenessValue = correctEffectiveness[attacker][defender] || 1;
    
    setTotalQuestions(prev => prev + 1);
    setTopTooltipVisible(false);
    setBottomTooltipVisible(false);
    
    if (effectiveness === correctEffectivenessValue) {
      setFeedback('Correct!');
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > highestStreak) {
        setHighestStreak(newStreak);
      }
    } else {
      setFeedback(`Incorrect.\nThe correct answer was ${correctEffectivenessValue === 0.5 ? '½' : correctEffectivenessValue}x`);
      setCurrentStreak(0);
    }
  };

  const handleContinue = () => {
    if (isAttackerMode) {
      // In attacker mode, cycle through defenders (top type)
      const nextDefenderIndex = (types.indexOf(topType) + 1) % types.length;
      setTopType(types[nextDefenderIndex]);
      // Change the attacker (bottom type) to a new random type
      let newAttackerType;
      do {
        newAttackerType = getRandomType();
      } while (newAttackerType === bottomType);
      setBottomType(newAttackerType);
    } else {
      // In defender mode, cycle through defenders (bottom type)
      const nextDefenderIndex = (types.indexOf(bottomType) + 1) % types.length;
      setBottomType(types[nextDefenderIndex]);
      // Change the attacker (top type) to a new random type
      let newAttackerType;
      do {
        newAttackerType = getRandomType();
      } while (newAttackerType === topType);
      setTopType(newAttackerType);
    }
    setFeedback('');
    setTopTooltipVisible(false);
    setBottomTooltipVisible(false);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num.toString();
    }
  };

  const typeEmojis = {
    Normal: '🐾', Fire: '🔥', Water: '💧', Electric: '⚡', Grass: '🍃',
    Ice: '❄️', Fighting: '🥊', Poison: '☠️', Ground: '🌋', Flying: '🦅',
    Psychic: '🔮', Bug: '🐛', Rock: '🪨', Ghost: '👻', Dragon: '🐉',
    Dark: '🌑', Steel: '⚙️', Fairy: '🧚'
  };

  const handleSwap = () => {
    setIsAttackerMode(!isAttackerMode);
    setTopType(bottomType);
    setBottomType(topType);
    setFeedback('');
    setTopTooltipVisible(false);
    setBottomTooltipVisible(false);
  };

  const getBrightGlowColor = (type) => {
    const color = typeColors[type];
    const rgb = color.match(/\d+/g).map(Number);
    const brightRgb = rgb.map(c => Math.min(255, c + 100)); // Increase brightness
    return `rgba(${brightRgb.join(',')}, 0.8)`;
  };

  return (
    <div className="App" style={{
      backgroundColor: '#282c34',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      padding: '20px',
      boxSizing: 'border-box',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '375px', // iPhone X width
        height: '812px', // iPhone X height
        border: '10px solid #000',
        borderRadius: '40px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        position: 'relative',
      }}>
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#282c34',
        }}>
          <div style={{
            marginBottom: '20px',
            width: '100%',
            textAlign: 'center',
          }}>
            <h1 style={{
              fontSize: '1.5em',
              color: '#fff',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              marginBottom: '10px',
              fontWeight: 'bold',
            }}>
              Pokémon Type Quiz
            </h1>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.9em',
              marginTop: '15px',
            }}>
              {[
                { label: 'Highest', value: highestStreak },
                { label: 'Current', value: currentStreak },
                { label: 'Total', value: totalQuestions }
              ].map(({ label, value }) => (
                <div key={label} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}>
                  <p style={{ margin: '0 0 5px 0' }}>{label}</p>
                  <p style={{ 
                    margin: 0,
                    fontSize: '1.2em',
                    fontWeight: 'bold',
                  }}>
                    {formatNumber(value)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="top-section" style={{
            width: '100%',
            textAlign: 'center',
            marginBottom: '20px',
            position: 'relative',
          }}>
            <h2 style={{fontSize: '1.2em', margin: '0 0 10px 0'}}>
              {isAttackerMode ? 'Defender' : 'Attacker'}
            </h2>
            <div className="type-color" style={typeContainerStyle(topType)}>
              <span style={emojiStyle(topType)}>{typeEmojis[topType]}</span>
            </div>
            <p 
              style={typeNameStyle(!isAttackerMode)}
              onClick={() => !isAttackerMode && setTopTooltipVisible(!topTooltipVisible)}
            >
              {topType}
            </p>
            {topTooltipVisible && <Tooltip attacker={topType} defender={bottomType} />}
          </div>

          <button 
            onClick={handleSwap} 
            style={{
              margin: '10px 0',
              padding: '10px 20px',
              fontSize: '1em',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // Add the following styles for 3D effect
              position: 'relative',
              top: 0,
              boxShadow: '0 6px 0 #45a049',
              transition: 'all 0.1s ease',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.top = '4px';
              e.currentTarget.style.boxShadow = '0 2px 0 #45a049';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.top = '0';
              e.currentTarget.style.boxShadow = '0 6px 0 #45a049';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.top = '0';
              e.currentTarget.style.boxShadow = '0 6px 0 #45a049';
            }}
          >
            <FaExchangeAlt style={{ marginRight: '5px' }} /> Swap
          </button>

          <div className="bottom-section" style={{
            width: '100%',
            textAlign: 'center',
            position: 'relative',
          }}>
            <h2 style={{fontSize: '1.2em', margin: '0 0 10px 0'}}>
              {isAttackerMode ? 'Attacker' : 'Defender'}
            </h2>
            <div className="type-color" style={typeContainerStyle(bottomType)}>
              <span style={emojiStyle(bottomType)}>{typeEmojis[bottomType]}</span>
            </div>
            <p 
              style={typeNameStyle(isAttackerMode)}
              onClick={() => isAttackerMode && setBottomTooltipVisible(!bottomTooltipVisible)}
            >
              {bottomType}
            </p>
            {bottomTooltipVisible && <Tooltip attacker={bottomType} defender={topType} />}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginTop: '15px',
              width: '100%',
              maxWidth: '400px', // Adjust this value as needed
            }}>
              {[0, '1/2', 1, 2].map((value) => (
                <button 
                  key={value} 
                  onClick={() => handleEffectivenessClick(value === '1/2' ? 0.5 : value)} 
                  disabled={!!feedback}
                  style={buttonStyle(effectivenessColors[value].background, effectivenessColors[value].text)}
                  onMouseDown={(e) => {
                    e.currentTarget.style.top = '4px';
                    e.currentTarget.style.boxShadow = `0 2px 0 ${darkenColor(effectivenessColors[value].background, 20)}`;
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.top = '0';
                    e.currentTarget.style.boxShadow = `0 6px 0 ${darkenColor(effectivenessColors[value].background, 20)}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.top = '0';
                    e.currentTarget.style.boxShadow = `0 6px 0 ${darkenColor(effectivenessColors[value].background, 20)}`;
                  }}
                >
                  {effectivenessDisplay[value]}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            height: '120px', // Fixed height for results area
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
            {feedback && (
              <div style={{
                marginTop: '20px',
                fontSize: '1.2em',
                fontWeight: 'bold',
                color: feedback.includes('Correct') ? '#4CAF50' : '#f44336',
                textAlign: 'center',
                whiteSpace: 'pre-line', // This allows line breaks in the text
              }}>
                {feedback}
              </div>
            )}

            {feedback && (
              <button 
                onClick={handleContinue}
                style={{
                  ...buttonStyle('#2196F3', 'white'),
                  width: 'auto',
                  padding: '10px 20px',
                  marginTop: '10px',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.top = '4px';
                  e.currentTarget.style.boxShadow = `0 2px 0 ${darkenColor('#2196F3', 20)}`;
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.top = '0';
                  e.currentTarget.style.boxShadow = `0 6px 0 ${darkenColor('#2196F3', 20)}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.top = '0';
                  e.currentTarget.style.boxShadow = `0 6px 0 ${darkenColor('#2196F3', 20)}`;
                }}
              >
                Continue
              </button>
            )}
          </div>

          <p style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '0.8em',
            marginTop: '20px'
          }}>
            Version 1.1
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
