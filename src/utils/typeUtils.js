import { TYPES, TYPE_EMOJIS, TYPE_COLORS, TYPE_CHART } from '../constants/types';

// Any additional type-related utility functions can be defined here
// For example:
export const getTypeEmoji = (type) => TYPE_EMOJIS[type] || '';
export const getTypeColor = (type) => TYPE_COLORS[type] || '#000000';
export const getTypes = () => TYPES;

export const getRandomType = (currentType = null) => {
    const availableTypes = currentType ? TYPES.filter(type => type !== currentType) : TYPES;
    return availableTypes[Math.floor(Math.random() * availableTypes.length)];
};

export const getType = (index) => {
    return TYPES[index];
};

export const getTypesChart = () => TYPE_CHART;