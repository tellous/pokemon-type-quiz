import React, { useState, useEffect } from 'react';
import './App.css';
import { FaExchangeAlt, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

function App() {
  const types = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];

  const getRandomType = () => {
    return types[Math.floor(Math.random() * types.length)];
  };

  const [isAttackerMode, setIsAttackerMode] = useState(false);
  const [isAttackerFocus, setIsAttackerFocus] = useState(true);
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

  const typeNameStyle = (isTop) => ({
    margin: '10px 0 0 0',
    fontSize: '1em',
    fontWeight: 'bold',
    borderBottom: isTop ? '1px dashed #fff' : 'none',
    display: 'inline-block',
    cursor: isTop ? 'pointer' : 'default',
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

  const buttonStyle = (backgroundColor, textColor) => {
    const shadowColor = darkenColor(backgroundColor, 20);
    return {
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
      boxShadow: `0 6px 0 ${shadowColor}`,
      outline: 'none',
    };
  };

  const smallButtonStyle = (backgroundColor) => {
    const shadowColor = darkenColor(backgroundColor, 20);
    return {
      width: 'auto',
      height: '24px',
      fontSize: '0.8em',
      fontWeight: 'bold',
      backgroundColor: backgroundColor,
      color: 'white',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
      transition: 'all 0.1s ease',
      position: 'relative',
      top: 0,
      boxShadow: `0 2px 0 ${shadowColor}`,
      outline: 'none',
      padding: '0 8px',
    };
  };

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
      // Cycle through defenders (top type)
      const nextDefenderIndex = (types.indexOf(topType) + 1) % types.length;
      setTopType(types[nextDefenderIndex]);
      // Set attacker (bottom type) to focus type if attacker focus, otherwise random
      if (focusType && isAttackerFocus) {
        setBottomType(focusType);
      } else {
        setBottomType(getRandomType(bottomType));
      }
    } else {
      // Cycle through defenders (bottom type)
      const nextDefenderIndex = (types.indexOf(bottomType) + 1) % types.length;
      setBottomType(types[nextDefenderIndex]);
      // Set attacker (top type) to focus type if attacker focus, otherwise random
      if (focusType && isAttackerFocus) {
        setTopType(focusType);
      } else {
        setTopType(getRandomType(topType));
      }
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

  const [focusType, setFocusType] = useState(null);
  const [focusTypeIndex, setFocusTypeIndex] = useState(0); // 0 represents 'None'

  const handleFocusChange = (direction) => {
    const newIndex = (focusTypeIndex + direction + types.length + 1) % (types.length + 1);
    setFocusTypeIndex(newIndex);
    const newFocusType = newIndex === 0 ? null : types[newIndex - 1];
    setFocusType(newFocusType);
    if (newFocusType) {
      if (isAttackerFocus) {
        // Change attacker type (bottom in attacker mode, top in defender mode)
        isAttackerMode ? setBottomType(newFocusType) : setTopType(newFocusType);
      } else {
        // Change defender type (top in attacker mode, bottom in defender mode)
        isAttackerMode ? setTopType(newFocusType) : setBottomType(newFocusType);
      }
    }
  };

  const clearFocus = () => {
    setFocusTypeIndex(0);
    setFocusType(null);
  };

  const toggleFocusMode = () => {
    const newIsAttackerFocus = !isAttackerFocus;
    setIsAttackerFocus(newIsAttackerFocus);
    if (focusType) {
      if (newIsAttackerFocus) {
        // Change to attacker focus
        isAttackerMode ? setBottomType(focusType) : setTopType(focusType);
      } else {
        // Change to defender focus
        isAttackerMode ? setTopType(focusType) : setBottomType(focusType);
      }
    }
  };

  const scoreEmojis = {
    Highest: '🏆',
    Current: '🔥',
    Total: '📝'
  };

  const handleSwap = () => {
    setIsAttackerMode(prevMode => !prevMode);
    setTopType(bottomType);
    setBottomType(topType);
    setFeedback('');
    setTopTooltipVisible(false);
    setBottomTooltipVisible(false);

    // Maintain focus when swapping
    if (focusType) {
      if (isAttackerFocus) {
        // If focus is on attacker, move it to the other side
        setBottomType(focusType);
      } else {
        // If focus is on defender, move it to the other side
        setTopType(focusType);
      }
    }
  };

  const handleButtonPress = (e, shadowColor) => {
    e.currentTarget.style.top = '4px';
    e.currentTarget.style.boxShadow = `0 2px 0 ${shadowColor}`;
  };

  const handleButtonRelease = (e, shadowColor) => {
    e.currentTarget.style.top = '0';
    e.currentTarget.style.boxShadow = `0 6px 0 ${shadowColor}`;
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
        maxWidth: '375px',
        height: '812px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#282c34',
        position: 'relative',
      }}>
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <div style={{
            marginBottom: '10px',
            width: '100%',
            textAlign: 'center',
          }}>
            <h1 style={{
              fontSize: '1.2em',
              color: '#ffcb05', // Pokémon yellow
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              marginBottom: '10px',
              fontWeight: 'normal',
              fontFamily: "'Pocket Monk', sans-serif",
              letterSpacing: '1px',
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
                  alignItems: 'center',
                }}>
                  <span style={{ marginRight: '5px' }}>{scoreEmojis[label]}</span>
                  <span style={{ fontWeight: 'bold' }}>{formatNumber(value)}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            width: '100%',
            marginBottom: '20px',
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
              <FaChevronLeft 
                onClick={() => handleFocusChange(-1)} 
                style={{ cursor: 'pointer', flex: '0 0 auto' }}
              />
              <div style={{ 
                flex: '1 1 auto', 
                textAlign: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                padding: '0 10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                Focus: {focusTypeIndex === 0 ? 'None' : (
                  <>
                    <span>{types[focusTypeIndex - 1]}</span>
                    <span style={{ marginLeft: '5px', fontSize: '0.8em', opacity: 0.8 }}>
                      ({isAttackerFocus ? 'Attacker' : 'Defender'})
                    </span>
                  </>
                )}
              </div>
              <FaChevronRight 
                onClick={() => handleFocusChange(1)} 
                style={{ cursor: 'pointer', flex: '0 0 auto' }}
              />
            </div>
            <div style={{ height: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              {focusTypeIndex !== 0 && (
                <>
                  <button
                    onClick={clearFocus}
                    style={smallButtonStyle('#f44336')}
                    onMouseDown={(e) => handleButtonPress(e, '#d32f2f')}
                    onMouseUp={(e) => handleButtonRelease(e, '#d32f2f')}
                    onMouseLeave={(e) => handleButtonRelease(e, '#d32f2f')}
                    onTouchStart={(e) => handleButtonPress(e, '#d32f2f')}
                    onTouchEnd={(e) => handleButtonRelease(e, '#d32f2f')}
                  >
                    Clear
                  </button>
                  <button
                    onClick={toggleFocusMode}
                    style={smallButtonStyle('#2196F3')}
                    onMouseDown={(e) => handleButtonPress(e, '#1976D2')}
                    onMouseUp={(e) => handleButtonRelease(e, '#1976D2')}
                    onMouseLeave={(e) => handleButtonRelease(e, '#1976D2')}
                    onTouchStart={(e) => handleButtonPress(e, '#1976D2')}
                    onTouchEnd={(e) => handleButtonRelease(e, '#1976D2')}
                  >
                    Make {isAttackerFocus ? 'Defender' : 'Attacker'}
                  </button>
                </>
              )}
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
              style={typeNameStyle(true)}
              onClick={() => setTopTooltipVisible(!topTooltipVisible)}
            >
              {topType}
            </p>
            {topTooltipVisible && <Tooltip attacker={isAttackerMode ? bottomType : topType} defender={isAttackerMode ? topType : bottomType} />}
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
              position: 'relative',
              top: 0,
              boxShadow: '0 6px 0 #45a049',
              transition: 'all 0.1s ease',
            }}
            onMouseDown={(e) => handleButtonPress(e, '#45a049')}
            onMouseUp={(e) => handleButtonRelease(e, '#45a049')}
            onMouseLeave={(e) => handleButtonRelease(e, '#45a049')}
            onTouchStart={(e) => handleButtonPress(e, '#45a049')}
            onTouchEnd={(e) => handleButtonRelease(e, '#45a049')}
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
              style={typeNameStyle(false)}
            >
              {bottomType}
            </p>
            {bottomTooltipVisible && <Tooltip attacker={isAttackerMode ? bottomType : topType} defender={isAttackerMode ? topType : bottomType} />}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginTop: '15px',
              width: '100%',
              maxWidth: '400px', // Adjust this value as needed
            }}>
              {[0, '1/2', 1, 2].map((value) => {
                const bgColor = effectivenessColors[value].background;
                const shadowColor = darkenColor(bgColor, 20);
                return (
                  <button 
                    key={value} 
                    onClick={() => handleEffectivenessClick(value === '1/2' ? 0.5 : value)} 
                    disabled={!!feedback}
                    style={buttonStyle(bgColor, effectivenessColors[value].text)}
                    onMouseDown={(e) => handleButtonPress(e, shadowColor)}
                    onMouseUp={(e) => handleButtonRelease(e, shadowColor)}
                    onMouseLeave={(e) => handleButtonRelease(e, shadowColor)}
                    onTouchStart={(e) => handleButtonPress(e, shadowColor)}
                    onTouchEnd={(e) => handleButtonRelease(e, shadowColor)}
                  >
                    {effectivenessDisplay[value]}
                  </button>
                );
              })}
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
                onMouseDown={(e) => handleButtonPress(e, '#1976D2')}
                onMouseUp={(e) => handleButtonRelease(e, '#1976D2')}
                onMouseLeave={(e) => handleButtonRelease(e, '#1976D2')}
                onTouchStart={(e) => handleButtonPress(e, '#1976D2')}
                onTouchEnd={(e) => handleButtonRelease(e, '#1976D2')}
              >
                Continue
              </button>
            )}
          </div>

          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '0',
            right: '0',
            textAlign: 'center',
          }}>
            <p style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.8em',
              margin: 0,
            }}>
              Version 1.1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
