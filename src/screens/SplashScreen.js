import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const appName = "PricePerPrice"; // App name
  const highlightText = "Per"; // Highlighted text
  const letterAnimations = useRef(appName.split('').map(() => new Animated.Value(0))).current; // Array of animated values for each letter

  useEffect(() => {
    // Sequential animation for each letter
    const animations = letterAnimations.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 5, // Duration of each letter's animation
        delay: index * 5, // Delay between letters
        useNativeDriver: true,
      })
    );

    // Start all animations
    Animated.sequence(animations).start();

    // Redirect to the main screen after the animation
    const timer = setTimeout(() => {
      navigation.replace('Conversion');
    }, appName.length * 150 + 1000); // Total animation time + 1 second wait

    return () => clearTimeout(timer); // Clear the timer when the component unmounts
  }, [letterAnimations, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {appName.split('').map((letter, index) => {
          // Check if the current letter is part of the highlighted text
          const isHighlighted =
            index >= appName.indexOf(highlightText) &&
            index < appName.indexOf(highlightText) + highlightText.length;

          return (
            <Animated.Text
              key={index}
              style={[
                styles.text,
                {
                  opacity: letterAnimations[index], // Opacity animation
                  transform: [
                    {
                      translateY: letterAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0], // Vertical displacement animation
                      }),
                    },
                  ],
                  color: isHighlighted ? '#FF0000' : '#000000', // Text color (red for "Per", black for the rest)
                  fontWeight: 'bold', // Bold text
                },
              ]}
            >
              {letter}
            </Animated.Text>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFF00', // Yellow background
  },
  textContainer: {
    flexDirection: 'row', // Arrange letters horizontally
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold', // Bold text
    marginHorizontal: 2, // Spacing between letters
  },
});

export default SplashScreen;