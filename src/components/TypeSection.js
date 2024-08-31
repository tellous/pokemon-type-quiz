import React from 'react';
import { getTypeColor, getTypeEmoji } from '../utils/typeUtils';
import './TypeSection.css';
import ErrorBoundary from './ErrorBoundary';
import useTypeTransition from '../hooks/useTypeTransition';

const TypeSectionContent = ({ type, role, onClick, isTopSection, isSwapping, isFocused }) => {
  const { isSliding, currentType, currentRole } = useTypeTransition(type, role, isFocused);

  return (
    <div className="type-section-container" onClick={onClick}>
      <div className={`type-section ${isSliding && !isFocused ? 'sliding-out' : ''} ${isFocused ? 'focused' : ''}`}>
        <div className="type-content">
          <div className="type-circle" style={{ backgroundColor: getTypeColor(currentType) }}>
            {getTypeEmoji(currentType) || ''}
          </div>
          <div className="type-text">
            <p className={`type-name ${isTopSection ? "underlined" : ""}`}>{currentType}</p>
            <span className="type-role">{currentRole === 'Attacker' ? '⚔️' : '🛡️'} {currentRole}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TypeSection = (props) => {
  return (
    <ErrorBoundary>
      <TypeSectionContent {...props} />
    </ErrorBoundary>
  );
};

export default TypeSection;
