import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Image,
} from 'react-native';
import { AppSettings } from '../config/AppSettings';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const scaleAnim = new Animated.Value(0.3);
  const rotateAnim = new Animated.Value(0);
  
  useEffect(() => {
    // Animation sequence
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start(() => {
      // When animation completes, call the onFinish callback
      setTimeout(onFinish, 500);
    });
  }, []);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [
              { scale: scaleAnim },
              { rotate: rotation }
            ],
          },
        ]}
      >
        {/* Simple dice logo */}
        <View style={styles.dice}>
          <Text style={styles.diceText}>D20</Text>
        </View>
      </Animated.View>
      
      <Text style={styles.title}>Dice Roller</Text>
      <Text style={styles.subtitle}>Roll any dice, anytime</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppSettings.theme.backgroundColor,
  },
  logoContainer: {
    marginBottom: 30,
  },
  dice: {
    width: 120,
    height: 120,
    backgroundColor: AppSettings.theme.primaryColor,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  diceText: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: AppSettings.theme.textColor,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
});

export default SplashScreen;
