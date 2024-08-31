import React, { useRef, useEffect } from 'react';

const CustomSlider = ({ value, onChange, disabled }) => {
    const sliderRef = useRef(null);
    const isDraggingRef = useRef(false);

    const handleMove = (clientX) => {
        if (disabled || !isDraggingRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const newValue = Math.max(0, Math.min(1, x / rect.width));
        onChange(newValue);
    };

    const handleMouseDown = () => {
        if (!disabled) isDraggingRef.current = true;
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
    };

    useEffect(() => {
        const handleMouseMove = (e) => handleMove(e.clientX);
        const handleTouchMove = (e) => handleMove(e.touches[0].clientX);

        if (!disabled) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchend', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchend', handleMouseUp);
        };
    }, [disabled, onChange]);

    return (
        <div 
            ref={sliderRef}
            className="custom-slider"
            style={{ opacity: disabled ? 0.5 : 1 }}
        >
            <div className="slider-bars">
                {[...Array(10)].map((_, i) => (
                    <div 
                        key={i} 
                        className="slider-bar"
                        style={{ 
                            height: `${10 + i * 3}px`,
                            opacity: value > i / 9 ? 1 : 0.3
                        }}
                    />
                ))}
            </div>
            <div 
                className="slider-handle"
                style={{ 
                    left: `${value * 100}%`,
                    transform: 'translateX(-50%)',
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
            />
        </div>
    );
};

export default CustomSlider;