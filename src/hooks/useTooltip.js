import { useState, useCallback, useRef } from 'react';
import { calculateEffectiveness, generateTooltipContent } from '../utils/effectivenessUtils';
import { playSound } from '../utils/soundUtils';
export const useTooltip = (topType, bottomType, isAttackerMode) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const targetRef = useRef(null);

    const handleTopSectionClick = useCallback((event, audioSettings) => {
        //play click sound 
        playSound('click', audioSettings.isMuted, audioSettings.volume);

        if (event && event.currentTarget) {
            const typeNameElement = event.currentTarget.querySelector('.type-name');
            if (typeNameElement) {
                targetRef.current = typeNameElement;
                setShowTooltip(!showTooltip);
            }
        }
    }, [showTooltip]);

    const tooltipContent = useCallback(() => {
        const attackerType = isAttackerMode ? bottomType : topType;
        const defenderType = isAttackerMode ? topType : bottomType;
        const effectiveness = calculateEffectiveness(attackerType, defenderType);
        return generateTooltipContent(attackerType, defenderType, effectiveness);
    }, [isAttackerMode, topType, bottomType]);

    return {
        showTooltip,
        setShowTooltip,
        handleTopSectionClick,
        tooltipContent,
        targetRef
    };
};