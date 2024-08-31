import { useState } from 'react';
import { playSound } from '../utils/soundUtils';

export const useModalState = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const handleCloseSettingsModal = (audioSettings) => {
    setShowSettingsModal(false);
    playSound('click', audioSettings.isMuted, audioSettings.volume);
  };

  const handleShowModalClick = (setShowModal, audioSettings) => {
    setShowModal(true);
    playSound('click', audioSettings.isMuted, audioSettings.volume);
  };

  const handleCloseInfoModal = (audioSettings) => {
    setShowInfoModal(false);
    playSound('click', audioSettings.isMuted, audioSettings.volume);
  };

  return {
    showInfoModal,
    setShowInfoModal,
    showSettingsModal,
    setShowSettingsModal,
    handleCloseSettingsModal,
    handleShowModalClick,
    handleCloseInfoModal
  };
};