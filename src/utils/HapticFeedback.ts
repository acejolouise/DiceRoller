import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// Haptic feedback options
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

/**
 * Haptic feedback utilities for providing tactile feedback on user interactions
 */
class HapticFeedback {
  private static isEnabled: boolean = true;

  /**
   * Enable or disable haptic feedback
   */
  static setEnabled(enabled: boolean) {
    HapticFeedback.isEnabled = enabled;
  }

  /**
   * Get current haptic feedback state
   */
  static isHapticEnabled(): boolean {
    return HapticFeedback.isEnabled;
  }

  /**
   * Trigger light impact haptic feedback
   * Use for light interactions like selecting an item
   */
  static lightImpact() {
    if (!HapticFeedback.isEnabled) return;
    
    ReactNativeHapticFeedback.trigger('impactLight', options);
  }

  /**
   * Trigger medium impact haptic feedback
   * Use for medium interactions like confirming an action
   */
  static mediumImpact() {
    if (!HapticFeedback.isEnabled) return;
    
    ReactNativeHapticFeedback.trigger('impactMedium', options);
  }

  /**
   * Trigger heavy impact haptic feedback
   * Use for significant interactions like completing a major action
   */
  static heavyImpact() {
    if (!HapticFeedback.isEnabled) return;
    
    ReactNativeHapticFeedback.trigger('impactHeavy', options);
  }

  /**
   * Trigger success haptic feedback
   * Use when an operation completes successfully
   */
  static success() {
    if (!HapticFeedback.isEnabled) return;
    
    ReactNativeHapticFeedback.trigger('notificationSuccess', options);
  }

  /**
   * Trigger warning haptic feedback
   * Use when showing a warning to the user
   */
  static warning() {
    if (!HapticFeedback.isEnabled) return;
    
    ReactNativeHapticFeedback.trigger('notificationWarning', options);
  }

  /**
   * Trigger error haptic feedback
   * Use when an error occurs
   */
  static error() {
    if (!HapticFeedback.isEnabled) return;
    
    ReactNativeHapticFeedback.trigger('notificationError', options);
  }

  /**
   * Dice roll starting feedback
   */
  static diceRollStart() {
    if (!HapticFeedback.isEnabled) return;
    
    ReactNativeHapticFeedback.trigger('impactMedium', options);
  }

  /**
   * Dice roll result feedback
   */
  static diceRollResult() {
    if (!HapticFeedback.isEnabled) return;
    
    ReactNativeHapticFeedback.trigger('impactHeavy', options);
  }
}

export default HapticFeedback;
