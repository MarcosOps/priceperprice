import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const appName = "PricePerPrice";
  const highlightText = "Per";
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Conversion');
    }, 2000); // Wait for 2 seconds before navigating

    return () => clearTimeout(timer);
  }, [navigation, scaleAnim, opacityAnim]);

  const renderAppName = () => {
    const parts = appName.split(new RegExp(`(${highlightText})`, 'gi'));
    return (
      <Text style={styles.text}>
        {parts.map((part, index) => (
          <Text
            key={index}
            style={{
              color: part.toLowerCase() === highlightText.toLowerCase() ? '#4A90E2' : '#333333',
            }}
          >
            {part}
          </Text>
        ))}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim }}>
        {renderAppName()}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  text: {
    fontSize: 42,
    fontWeight: 'bold',
  },
});

export default SplashScreen;