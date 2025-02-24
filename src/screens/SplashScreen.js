import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const appName = "PricePerPrice"; // Nome do app
  const letterAnimations = useRef(appName.split('').map(() => new Animated.Value(0))).current; // Array de valores animados para cada letra

  useEffect(() => {
    // Animação sequencial para cada letra
    const animations = letterAnimations.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 70, // Duração da animação de cada letra
        delay: index * 10, // Atraso entre as letras
        useNativeDriver: true,
      })
    );

    // Iniciar todas as animações
    Animated.sequence(animations).start();

    // Redirecionar para a tela principal após a animação
    const timer = setTimeout(() => {
      navigation.replace('Conversion');
    }, appName.length * 150 + 1000); // Tempo total da animação + 1 segundo de espera

    return () => clearTimeout(timer); // Limpar o timer ao desmontar o componente
  }, [letterAnimations, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {appName.split('').map((letter, index) => (
          <Animated.Text
            key={index}
            style={[
              styles.text,
              {
                opacity: letterAnimations[index], // Animação de opacidade
                transform: [
                  {
                    translateY: letterAnimations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0], // Animação de deslocamento vertical
                    }),
                  },
                ],
              },
            ]}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF', // Cor de fundo da tela de apresentação
  },
  textContainer: {
    flexDirection: 'row', // Dispor as letras horizontalmente
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF', // Cor do texto
    marginHorizontal: 2, // Espaçamento entre as letras
  },
});

export default SplashScreen;