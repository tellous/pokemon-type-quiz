import React from 'react';
import { FaCog, FaInfoCircle } from 'react-icons/fa';
import { createButtonStyle } from '../utils/styleUtils';

const ControlButtons = ({
    handleShowModalClick,
    setShowSettingsModal,
    setShowInfoModal,
    handleButtonPress,
    handleButtonRelease,
    audioSettings
}) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        }}>
            <button
                onClick={() => handleShowModalClick(setShowSettingsModal,audioSettings)}
                style={createButtonStyle('#4CAF50', '#45a049')}
                onMouseDown={(e) => handleButtonPress(e, '#45a049')}
                onMouseUp={(e) => handleButtonRelease(e, '#45a049')}
                onMouseLeave={(e) => handleButtonRelease(e, '#45a049')}
                onTouchStart={(e) => handleButtonPress(e, '#45a049')}
                onTouchEnd={(e) => handleButtonRelease(e, '#45a049')}
            >
                <FaCog />
            </button>
            <button
                onClick={() => handleShowModalClick(setShowInfoModal,audioSettings)}
                style={createButtonStyle('#2196F3', '#1976D2')}
                onMouseDown={(e) => handleButtonPress(e, '#1976D2')}
                onMouseUp={(e) => handleButtonRelease(e, '#1976D2')}
                onMouseLeave={(e) => handleButtonRelease(e, '#1976D2')}
                onTouchStart={(e) => handleButtonPress(e, '#1976D2')}
                onTouchEnd={(e) => handleButtonRelease(e, '#1976D2')}
            >
                <FaInfoCircle />
            </button>
        </div>
    );
};

export default ControlButtons;