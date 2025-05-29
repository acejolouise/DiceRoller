import { Platform } from 'react-native';
import Sound from 'react-native-sound';

// Enable playback in silent mode
Sound.setCategory('Playback');

/**
 * Play sound effects for dice rolls
 * Uses react-native-sound for audio playback
 */
class SoundEffects {
  private static rollSound: Sound | null = null;
  private static landSound: Sound | null = null;
  private static isSoundEnabled: boolean = true;

  /**
   * Initialize sound effects
   */
  static initialize() {    // Load roll sound - using require for assets
    SoundEffects.rollSound = new Sound(
      require('../assets/audio/dice_roll.mp3'),
      (error) => {
        if (error) {
          console.log('Failed to load roll sound', error);
          return;
        }
        // Sound loaded successfully
        console.log('Roll sound loaded successfully');
      }
    );

    // Load land sound - using require for assets
    SoundEffects.landSound = new Sound(
      require('../assets/audio/dice_land.mp3'),
      (error) => {
        if (error) {
          console.log('Failed to load land sound', error);
          return;
        }
        // Sound loaded successfully
        console.log('Land sound loaded successfully');
      }
    );
  }

  /**
   * Enable or disable sound effects
   */
  static setSoundEnabled(isEnabled: boolean) {
    SoundEffects.isSoundEnabled = isEnabled;
  }

  /**
   * Play dice roll sound
   */
  static playRollSound() {
    if (!SoundEffects.isSoundEnabled || !SoundEffects.rollSound) {
      return;
    }

    // Reset to the beginning if already playing
    SoundEffects.rollSound.stop();
    SoundEffects.rollSound.play((success) => {
      if (!success) {
        console.log('Playback failed due to audio decoding errors');
      }
    });
  }

  /**
   * Play dice landing sound
   */
  static playLandSound() {
    if (!SoundEffects.isSoundEnabled || !SoundEffects.landSound) {
      return;
    }

    // Reset to the beginning if already playing
    SoundEffects.landSound.stop();
    SoundEffects.landSound.play((success) => {
      if (!success) {
        console.log('Playback failed due to audio decoding errors');
      }
    });
  }

  /**
   * Release sound resources
   */
  static release() {
    if (SoundEffects.rollSound) {
      SoundEffects.rollSound.release();
    }
    if (SoundEffects.landSound) {
      SoundEffects.landSound.release();
    }
  }
}

export default SoundEffects;
