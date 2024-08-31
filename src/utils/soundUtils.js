import correctSound from '../sounds/correct-sound.mp3';
import incorrectSound from '../sounds/incorrect-sound.mp3';
import clickSound from '../sounds/click-sound.mp3';

export const playSound = (soundType, isMuted, volume) => {
  if (!isMuted) {
    let audio;
    switch (soundType) {
      case 'correct':
        audio = new Audio(correctSound);
        break;
      case 'incorrect':
        audio = new Audio(incorrectSound);
        break;
      case 'click':
        audio = new Audio(clickSound);
        break;
      default:
        console.error('Unknown sound type');
        return;
    }
    audio.volume = Math.max(0, Math.min(1, volume)); // Ensure volume is between 0 and 1
    audio.play()
      .then(() => console.log("Sound played successfully"))
      .catch(error => console.error("Error playing sound:", error));
  }
};