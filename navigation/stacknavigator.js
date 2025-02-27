import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../src/screens/SplashScreen';
import ConversionScreen from '../src/screens/ConversionScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }} // Oculta o cabeçalho na tela de apresentação
      />
      <Stack.Screen
        name="Conversion"
        component={ConversionScreen}
        options={{ headerShown: false }} // Oculta o cabeçalho na tela de conversão
        // component={ConversionScreen}
        // options={{
        //   title: 'Comparação de Preços', // Título do cabeçalho
        //   headerStyle: {
        //     backgroundColor: '#FFFF00', // Fundo amarelo
        //   },
        //   headerTintColor: '#000000', // Cor do texto preto
        //   headerTitleStyle: {
        //     fontWeight: 'bold', // Texto em negrito
        //   },
        // }}
      />
    </Stack.Navigator>
  );
}