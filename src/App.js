import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import { FaExchangeAlt, FaChevronLeft, FaChevronRight, FaTimes, FaInfoCircle, FaCog } from 'react-icons/fa';
import correctSound from './sounds/correct-sound.mp3';
import incorrectSound from './sounds/incorrect-sound.mp3';
import clickSound from './sounds/click-sound.mp3';
import CustomSlider from './components/CustomSlider';

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
  const [isMuted, setIsMuted] = useState(() => {
    const savedMuteState = localStorage.getItem('isMuted');
    return savedMuteState ? JSON.parse(savedMuteState) : false;
  });
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem('volume');
    return savedVolume ? parseFloat(savedVolume) : 1;
  });

  const typeColors = {
    Normal: '#A8A878', Fire: '#F08030', Water: '#6890F0', Electric: '#F8D030', Grass: '#78C850',
    Ice: '#98D8D8', Fighting: '#C03028', Poison: '#A040A0', Ground: '#E0C068', Flying: '#A890F0',
    Psychic: '#F85888', Bug: '#A8B820', Rock: '#B8A038', Ghost: '#705898', Dragon: '#7038F8',
    Dark: '#111111', Steel: '#B8B8D0', Fairy: '#EE99AC'
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
    0: { background: '#36454F', text: '#FFFFFF' },    // Charcoal theme, white text
    '1/2': { background: '#FF0000', text: '#FFFFFF' }, // Red theme, white text
    1: { background: '#F0EAD6', text: '#000000' },    // Eggshell theme, black text
    2: { background: '#008000', text: '#000000' }     // Green theme, black text
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
    fontFamily: "'Nunito', sans-serif",
  });

  const Tooltip = ({ attacker, defender }) => {
    const effectiveness = correctEffectiveness[attacker][defender] || 1;
    
    const typeStyle = (type) => ({
      color: typeColors[type],
      fontWeight: 'bold',
      fontFamily: "'Nunito', sans-serif",
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
        fontFamily: "'Nunito', sans-serif",
        width: '90%', // Increased width
        maxWidth: '300px', // Added max-width for larger screens
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

  const darkenColor = (color, amount) => {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) - amount)).toString(16)).substr(-2));
  };

  const smallButtonStyle = (backgroundColor) => {
    const shadowColor = darkenColor(backgroundColor, 20);
    return {
      width: '40px',
      height: '40px',
      fontSize: '1.2em',
      fontWeight: 'bold',
      backgroundColor: backgroundColor,
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 0.1s ease',
      position: 'relative',
      top: 0,
      boxShadow: `0 6px 0 ${shadowColor}`,
      outline: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
  };

  const effectivenessButtonStyle = (backgroundColor, textColor) => {
    const shadowColor = darkenColor(backgroundColor, 20);
    return {
      width: '50px',
      height: '50px',
      fontSize: '1.4em',
      fontWeight: 'bold',
      backgroundColor: backgroundColor,
      color: textColor,
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 0.1s ease',
      position: 'relative',
      top: 0,
      boxShadow: `0 6px 0 ${shadowColor}`,
      outline: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
  };

  const playClickSound = useCallback(() => {
    if (!isMuted) {
      const audio = new Audio(clickSound);
      audio.volume = volume;
      audio.play()
        .then(() => console.log("Click sound played successfully"))
        .catch(error => console.error("Error playing click sound:", error));
    }
  }, [isMuted, volume]);

  const handleButtonPress = (e, shadowColor, playClick = true) => {
    e.currentTarget.style.top = '4px';
    e.currentTarget.style.boxShadow = `0 2px 0 ${shadowColor}`;
    if (playClick && !isMuted) {
      playClickSound();
    }
  };

  const handleButtonRelease = (e, shadowColor) => {
    e.currentTarget.style.top = '0';
    e.currentTarget.style.boxShadow = `0 6px 0 ${shadowColor}`;
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

  useEffect(() => {
    localStorage.setItem('volume', volume.toString());
  }, [volume]);

  useEffect(() => {
    localStorage.setItem('isMuted', JSON.stringify(isMuted));
  }, [isMuted]);

  const resetGame = () => {
    setTopType(getRandomType());
    setBottomType(types[0]);
    setFeedback('');
    setCurrentStreak(0);
  };

  const toggleMute = () => {
    setIsMuted(prev => {
      const newMuteState = !prev;
      if (prev) {
        // If we're unmuting, play the click sound
        playClickSound();
      }
      return newMuteState;
    });
  };

  const playSound = useCallback((isCorrect) => {
    console.log(`Attempting to play ${isCorrect ? 'correct' : 'incorrect'} sound`);
    
    if (!isMuted) {
      const audio = new Audio(isCorrect ? correctSound : incorrectSound);
      audio.volume = volume;
      audio.play()
        .then(() => console.log("Sound played successfully"))
        .catch(error => console.error("Error playing sound:", error));
    } else {
      console.log("Sound is muted");
    }
  }, [isMuted, volume]);

  const [showEffectivenessButtons, setShowEffectivenessButtons] = useState(true);

  const handleEffectivenessClick = (effectiveness) => {
    const attacker = isAttackerMode ? bottomType : topType;
    const defender = isAttackerMode ? topType : bottomType;
    const correctEffectivenessValue = correctEffectiveness[attacker][defender] || 1;
    
    setTotalQuestions(prev => prev + 1);
    setTopTooltipVisible(false);
    setBottomTooltipVisible(false);
    
    if (effectiveness === correctEffectivenessValue) {
      playSound(true);  // Play correct sound
      setFeedback('Correct!');
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > highestStreak) {
        setHighestStreak(newStreak);
      }
    } else {
      playSound(false);  // Play incorrect sound
      setFeedback(`Incorrect.\nThe correct answer was ${correctEffectivenessValue === 0.5 ? '½' : correctEffectivenessValue}x`);
      setCurrentStreak(0);
    }

    // Hide effectiveness buttons after animation
    setTimeout(() => {
      setShowEffectivenessButtons(false);
    }, 100); // Adjust this timing to match your button press animation
  };

  const handleContinue = () => {
    if (isAttackerMode) {
      // Set defender (top type) to focus type if defender focus, otherwise cycle
      if (focusType && !isAttackerFocus) {
        setTopType(focusType);
      } else {
        const nextDefenderIndex = (types.indexOf(topType) + 1) % types.length;
        setTopType(types[nextDefenderIndex]);
      }
      // Set attacker (bottom type) to focus type if attacker focus, otherwise random
      if (focusType && isAttackerFocus) {
        setBottomType(focusType);
      } else {
        setBottomType(getRandomType(bottomType));
      }
    } else {
      // Set defender (bottom type) to focus type if defender focus, otherwise cycle
      if (focusType && !isAttackerFocus) {
        setBottomType(focusType);
      } else {
        const nextDefenderIndex = (types.indexOf(bottomType) + 1) % types.length;
        setBottomType(types[nextDefenderIndex]);
      }
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

    // Show effectiveness buttons after animation
    setTimeout(() => {
      setShowEffectivenessButtons(true);
    }, 100); // Adjust this timing to match your button release animation
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

  const largeButtonStyle = (backgroundColor) => {
    const shadowColor = darkenColor(backgroundColor, 20);
    return {
      width: '200px',
      height: '60px',
      fontSize: '1.2em',
      fontWeight: 'bold',
      backgroundColor: backgroundColor,
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.1s ease',
      position: 'relative',
      top: 0,
      boxShadow: `0 6px 0 ${shadowColor}`,
      outline: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '10px 0',
    };
  };

  const mediumButtonStyle = (backgroundColor) => {
    const shadowColor = darkenColor(backgroundColor, 20);
    return {
      width: '120px',
      height: '50px',
      fontSize: '1em',
      fontWeight: 'bold',
      backgroundColor: backgroundColor,
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.1s ease',
      position: 'relative',
      top: 0,
      boxShadow: `0 4px 0 ${shadowColor}`,
      outline: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '5px',
    };
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
      boxSizing: 'border-box',
      fontFamily: "'Nunito', sans-serif",
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
          padding: '5px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <div style={{
            marginBottom: '10px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <h1 style={{
              fontSize: '1.2em',
              color: '#ffcb05', // Pokémon yellow
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              marginBottom: '10px',
              fontWeight: 'normal',
              fontFamily: "'Pocket Monk', sans-serif",
              letterSpacing: '1px',
              textAlign: 'left',
            }}>
              Pokémon Type Quiz
            </h1>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <button
                onClick={() => setShowSettingsModal(true)}
                style={smallButtonStyle('#4CAF50')}
                onMouseDown={(e) => handleButtonPress(e, '#45a049')}
                onMouseUp={(e) => handleButtonRelease(e, '#45a049')}
                onMouseLeave={(e) => handleButtonRelease(e, '#45a049')}
                onTouchStart={(e) => handleButtonPress(e, '#45a049')}
                onTouchEnd={(e) => handleButtonRelease(e, '#45a049')}
              >
                <FaCog />
              </button>
              <button
                onClick={() => setShowInfoModal(true)}
                style={smallButtonStyle('#2196F3')}
                onMouseDown={(e) => handleButtonPress(e, '#1976D2')}
                onMouseUp={(e) => handleButtonRelease(e, '#1976D2')}
                onMouseLeave={(e) => handleButtonRelease(e, '#1976D2')}
                onTouchStart={(e) => handleButtonPress(e, '#1976D2')}
                onTouchEnd={(e) => handleButtonRelease(e, '#1976D2')}
              >
                <FaInfoCircle />
              </button>
            </div>
          </div>

          {/* Score section */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '20px',
            width: '100%',
            fontFamily: "'Nunito', sans-serif",
          }}>
            {['Highest', 'Current', 'Total'].map((label) => (
              <div key={label} style={{
                textAlign: 'center',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}>
                  <span style={{fontSize: '1.2em'}}>{scoreEmojis[label]}</span>
                  <p style={{margin: '0', fontSize: '1.2em', fontWeight: 'bold'}}>
                    {formatNumber(label === 'Highest' ? highestStreak : label === 'Current' ? currentStreak : totalQuestions)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="top-section" style={{
            width: '100%',
            textAlign: 'center',
            position: 'relative',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              marginBottom: '10px',
            }}>
              <div className="type-color" style={typeContainerStyle(topType)}>
                <span style={emojiStyle(topType)}>{typeEmojis[topType]}</span>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '5px',
              }}>
                <p 
                  style={{...typeNameStyle(true), margin: '0 0 2px 0'}}
                  onClick={() => setTopTooltipVisible(!topTooltipVisible)}
                >
                  {topType}
                </p>
                <span style={{
                  fontSize: '0.8em',
                  fontWeight: 'bold',
                  fontFamily: "'Nunito', sans-serif",
                  opacity: 0.7,
                }}>
                  ({isAttackerMode ? '🛡️ Defender' : '⚔️ Attacker'})
                </span>
              </div>
            </div>
            {topTooltipVisible && <Tooltip attacker={isAttackerMode ? bottomType : topType} defender={isAttackerMode ? topType : bottomType} />}
          </div>

          <button 
            onClick={handleSwap} 
            style={{
              margin: '20px 0', // Reduced margin
              padding: '10px 15px', // Reduced padding
              fontSize: '1.2em', // Slightly smaller font size
              backgroundColor: '#FFD700',
              color: 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              top: 0,
              boxShadow: '0 4px 0 #DAA520', // Reduced shadow size
              transition: 'all 0.1s ease',
              fontFamily: "'Nunito', sans-serif",
            }}
            onMouseDown={(e) => handleButtonPress(e, '#DAA520')}
            onMouseUp={(e) => handleButtonRelease(e, '#DAA520')}
            onMouseLeave={(e) => handleButtonRelease(e, '#DAA520')}
            onTouchStart={(e) => handleButtonPress(e, '#DAA520')}
            onTouchEnd={(e) => handleButtonRelease(e, '#DAA520')}
          >
            <span style={{
              display: 'inline-block',
              transform: isAttackerMode ? 'rotate(-90deg)' : 'rotate(90deg)',
              transition: 'transform 0.3s ease',
              marginRight: '8px', // Add some space between the icon and text
            }}>
              ➜
            </span>
            Swap
          </button>

          <div className="bottom-section" style={{
            width: '100%',
            textAlign: 'center',
            position: 'relative',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              marginBottom: '10px',
            }}>
              <div className="type-color" style={typeContainerStyle(bottomType)}>
                <span style={emojiStyle(bottomType)}>{typeEmojis[bottomType]}</span>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '5px',
              }}>
                <p 
                  style={{...typeNameStyle(false), margin: '0 0 2px 0'}}
                >
                  {bottomType}
                </p>
                <span style={{
                  fontSize: '0.8em',
                  fontWeight: 'bold',
                  fontFamily: "'Nunito', sans-serif",
                  opacity: 0.7,
                }}>
                  ({isAttackerMode ? '⚔️ Attacker' : '🛡️ Defender'})
                </span>
              </div>
            </div>
            {bottomTooltipVisible && <Tooltip attacker={isAttackerMode ? bottomType : topType} defender={isAttackerMode ? topType : bottomType} />}
            {showEffectivenessButtons ? (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '15px',
                width: '100%',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  maxWidth: '300px',
                }}>
                  {[0, '1/2', 1, 2].map((value) => {
                    const { background, text } = effectivenessColors[value];
                    const shadowColor = darkenColor(background, 20);
                    return (
                      <button 
                        key={value} 
                        onClick={() => handleEffectivenessClick(value === '1/2' ? 0.5 : value)} 
                        disabled={!!feedback}
                        style={{
                          ...effectivenessButtonStyle(background, text),
                          color: text,
                        }}
                        onMouseDown={(e) => handleButtonPress(e, shadowColor, false)}
                        onMouseUp={(e) => handleButtonRelease(e, shadowColor)}
                        onMouseLeave={(e) => handleButtonRelease(e, shadowColor)}
                        onTouchStart={(e) => handleButtonPress(e, shadowColor, false)}
                        onTouchEnd={(e) => handleButtonRelease(e, shadowColor)}
                      >
                        {effectivenessDisplay[value]}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div style={{
                height: '120px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start', // Changed from 'center' to 'flex-start'
                alignItems: 'center',
                width: '100%',
              }}>
                <div style={{
                  marginTop: '10px', // Reduced top margin
                  fontSize: '1.2em',
                  fontWeight: 'bold',
                  color: feedback.includes('Correct') ? '#4CAF50' : '#f44336',
                  textAlign: 'center',
                  whiteSpace: 'pre-line',
                }}>
                  {feedback}
                </div>

                <button 
                  onClick={handleContinue}
                  style={{
                    ...smallButtonStyle('#2196F3'),
                    width: 'auto',
                    padding: '10px 20px',
                    marginTop: 'auto', // Changed from fixed value to 'auto'
                    marginBottom: '10px', // Added bottom margin
                    fontFamily: "'Nunito', sans-serif",
                  }}
                  onMouseDown={(e) => handleButtonPress(e, '#1976D2')}
                  onMouseUp={(e) => handleButtonRelease(e, '#1976D2')}
                  onMouseLeave={(e) => handleButtonRelease(e, '#1976D2')}
                  onTouchStart={(e) => handleButtonPress(e, '#1976D2')}
                  onTouchEnd={(e) => handleButtonRelease(e, '#1976D2')}
                >
                  Continue
                </button>
              </div>
            )}
          </div>

          {showSettingsModal && (
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
                padding: '30px',
                borderRadius: '15px',
                width: '90%',
                maxWidth: '340px', // Adjusted to match the outermost container
                maxHeight: '90%',
                overflow: 'auto',
                color: 'black',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <h2 style={{ fontSize: '1.8em', marginBottom: '20px' }}>Settings</h2>
                
                {/* Sound Settings */}
                <button 
                  onClick={toggleMute} 
                  style={largeButtonStyle(isMuted ? '#f44336' : '#4CAF50')}
                  onMouseDown={(e) => handleButtonPress(e, isMuted ? '#d32f2f' : '#45a049', false)}
                  onMouseUp={(e) => handleButtonRelease(e, isMuted ? '#d32f2f' : '#45a049')}
                  onMouseLeave={(e) => handleButtonRelease(e, isMuted ? '#d32f2f' : '#45a049')}
                  onTouchStart={(e) => handleButtonPress(e, isMuted ? '#d32f2f' : '#45a049', false)}
                  onTouchEnd={(e) => handleButtonRelease(e, isMuted ? '#d32f2f' : '#45a049')}
                >
                  {isMuted ? '🔇 Sound Off' : '🔊 Sound On'}
                </button>

                {/* Volume Slider - only show when sound is on */}
                {!isMuted && (
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
                          value={volume}
                          onChange={setVolume}
                        />
                      </div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                      {Math.round(volume * 100)}%
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
                      onClick={() => handleFocusChange(-1)}
                      style={{...mediumButtonStyle('#FFD700'), width: '50px', color: 'black'}}
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
                      {focusTypeIndex === 0 ? (
                        <span style={{ fontSize: '0.9em', opacity: 0.8 }}>None</span>
                      ) : (
                        <>
                          <span>{types[focusTypeIndex - 1]}</span>
                          <span style={{ fontSize: '0.8em', opacity: 0.8 }}>
                            ({isAttackerFocus ? '⚔️ Attacker' : '🛡️ Defender'})
                          </span>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => handleFocusChange(1)}
                      style={{...mediumButtonStyle('#FFD700'), width: '50px', color: 'black'}}
                      onMouseDown={(e) => handleButtonPress(e, '#DAA520')}
                      onMouseUp={(e) => handleButtonRelease(e, '#DAA520')}
                      onMouseLeave={(e) => handleButtonRelease(e, '#DAA520')}
                      onTouchStart={(e) => handleButtonPress(e, '#DAA520')}
                      onTouchEnd={(e) => handleButtonRelease(e, '#DAA520')}
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                  {focusTypeIndex !== 0 && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <button
                        onClick={clearFocus}
                        style={mediumButtonStyle('#f44336')}
                        onMouseDown={(e) => handleButtonPress(e, '#d32f2f')}
                        onMouseUp={(e) => handleButtonRelease(e, '#d32f2f')}
                        onMouseLeave={(e) => handleButtonRelease(e, '#d32f2f')}
                        onTouchStart={(e) => handleButtonPress(e, '#d32f2f')}
                        onTouchEnd={(e) => handleButtonRelease(e, '#d32f2f')}
                      >
                        Clear Focus
                      </button>
                      <button
                        onClick={toggleFocusMode}
                        style={mediumButtonStyle('#2196F3')}
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

                <button
                  onClick={() => setShowSettingsModal(false)}
                  style={{...largeButtonStyle('#f44336'), marginTop: '30px'}}
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
          )}

          {showInfoModal && (
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
                padding: '20px',
                borderRadius: '15px',
                width: '90%',
                maxWidth: '340px', // Adjusted to match the outermost container
                maxHeight: '90%',
                overflow: 'auto',
                color: 'black',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <h2>Credits</h2>
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
                  Version 1.1
                </p>
                <button
                  onClick={() => setShowInfoModal(false)}
                  style={{
                    ...smallButtonStyle('#f44336'),
                    marginTop: '20px',
                    width: '120px',
                    height: '50px',
                    fontSize: '1.2em',
                  }}
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
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
