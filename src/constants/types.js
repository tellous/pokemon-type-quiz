export const TYPES = [
    'Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting',
    'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice',
    'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water'
];

export const TYPE_EMOJIS = {
    Normal: '🐾', Fire: '🔥', Water: '💧', Electric: '⚡', Grass: '🍃',
    Ice: '❄️', Fighting: '🥊', Poison: '☠️', Ground: '🌋', Flying: '🦅',
    Psychic: '🔮', Bug: '🐛', Rock: '🪨', Ghost: '👻', Dragon: '🐉',
    Dark: '🌑', Steel: '⚙️', Fairy: '🧚'
};

export const TYPE_COLORS = {
    Normal: '#A8A878', Fire: '#F08030', Water: '#6890F0', Electric: '#F8D030', Grass: '#78C850',
    Ice: '#98D8D8', Fighting: '#C03028', Poison: '#A040A0', Ground: '#E0C068', Flying: '#A890F0',
    Psychic: '#F85888', Bug: '#A8B820', Rock: '#B8A038', Ghost: '#705898', Dragon: '#7038F8',
    Dark: '#111111', Steel: '#B8B8D0', Fairy: '#EE99AC'
};

export const TYPE_CHART = {
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