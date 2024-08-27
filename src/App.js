import React, { useState } from 'react';
import './App.css';

function App() {
  const types = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];
  const [attackingType, setAttackingType] = useState(types[Math.floor(Math.random() * types.length)]);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitHistory, setSubmitHistory] = useState([]);

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

  const typeColors = {
    Normal: '#A8A878', Fire: '#F08030', Water: '#6890F0', Electric: '#F8D030', Grass: '#78C850',
    Ice: '#98D8D8', Fighting: '#C03028', Poison: '#A040A0', Ground: '#E0C068', Flying: '#A890F0',
    Psychic: '#F85888', Bug: '#A8B820', Rock: '#B8A038', Ghost: '#705898', Dragon: '#7038F8',
    Dark: '#705848', Steel: '#B8B8D0', Fairy: '#EE99AC'
  };

  const handleSubmit = () => {
    let newScore = 0;
    const results = [];
    types.forEach((type) => {
      const selected = document.querySelector(`input[name="${type}-effectiveness"]:checked`).value;
      const correct = correctEffectiveness[attackingType][type] || '1';
      //console.log(selected === correct);
      if (selected === correct) {
        newScore++;
        results.push({ type, correctAnswer: true, selected, correct });
      } else {
        results.push({ type, correctAnswer: false, selected, correct });
      }
    });
    setScore((prevScore) => prevScore + newScore);
    setSubmitted(true);
    setSubmitHistory((prevHistory) => [{ attackingType, results, score: newScore }, ...prevHistory]);

    // Change to a new random type
    const newType = types[Math.floor(Math.random() * types.length)];
    setAttackingType(newType);
    setSubmitted(false);

    // Reset all radio buttons to 1x
    types.forEach((type) => {
      const radioButtons = document.querySelectorAll(`input[name="${type}-effectiveness"]`);
      radioButtons.forEach((radio) => {
        radio.checked = radio.value === '1';
      });
    });
  };

  return (
    <div className="App" style={{
      display: 'flex',
      background: 'linear-gradient(135deg, #e0f7fa, #b3e5fc)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle, #ff000040 10%, transparent 10%)',
        backgroundSize: '30px 30px',
        animation: 'moveBackground 10s linear infinite',
        zIndex: 1
      }}></div>
      <style>
        {`
          @keyframes moveBackground {
            0% { background-position: 0 0; }
            100% { background-position: 30px 30px; }
          }
        `}
      </style>
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h1 style={{
          fontSize: '2.5em',
          color: '#333',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          Pokémon Type Quiz
        </h1>
        <p>Version 1.0.1</p>
        <div style={{ display: 'flex', width: '100%' }}>
          <div className="left-column" style={{ flex: 1, padding: '20px' }}>
            <div className="row">
              <p>Total Score: {score}</p>
            </div>
            <div className="attacking" style={{
              background: 'linear-gradient(to right, #ff000020 1px, transparent 1px), linear-gradient(to bottom, #ff000020 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <div className="row">
                <h1>Attacker</h1>
                <p>{attackingType}</p>
              </div>
              <div className="row">
                <div className="type-color" style={{
                  backgroundColor: typeColors[attackingType],
                  width: '100px',
                  height: '100px',
                  margin: '0 auto',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}></div>
              </div>
            </div>
            <div className="defending" style={{
              background: 'linear-gradient(to right, #0000ff20 1px, transparent 1px), linear-gradient(to bottom, #0000ff20 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              padding: '20px'
            }}>
              <div className="row">
                <h2>Defender</h2>
                <div>
                  {types.map((type) => (
                    <div key={type} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '10px',
                      backgroundColor: typeColors[type],
                      padding: '5px',
                      borderRadius: '5px'
                    }}>
                      <span style={{ flexBasis: '100px', color: '#fff', fontWeight: 'bold' }}>{type}</span>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
                        {[0, 0.5, 1, 2].map((value) => (
                          <label key={value} style={{ marginLeft: '10px' }}>
                            <input
                              type="radio"
                              name={`${type}-effectiveness`}
                              value={value}
                              defaultChecked={value === 1}
                            />
                            {value}x
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="row">
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
          <div className="right-column" style={{ flex: 1, padding: '20px', borderLeft: '1px solid #ccc' }}>
            <h2>Results</h2>
            {submitHistory.map((submission, index) => (
              <div key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                <h3>Submission {submitHistory.length - index}: {submission.attackingType}</h3>
                <p>Score: {submission.score} / {types.length}</p>
                {submission.results.map((result, resultIndex) => {
                  return (
                    <div key={resultIndex} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      backgroundColor: result.correctAnswer ? '#90EE90' : '#FFB6C1',
                      padding: '5px',
                      marginBottom: '5px',
                      borderRadius: '5px'
                    }}>
                      <span>{submission.attackingType} vs {result.type}</span>
                      <span>
                        {result.correctAnswer ? 'Correct' : 'Incorrect'} Your answer: {result.selected}x, Correct: {result.correct}x
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
