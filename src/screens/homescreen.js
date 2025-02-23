import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Escolha uma Categoria</Text>
      <Button title="Volume" onPress={() => navigation.navigate('Category', { category: 'Volume' })} />
      <Button title="Length" onPress={() => navigation.navigate('Category', { category: 'Length' })} />
      <Button title="Mass" onPress={() => navigation.navigate('Category', { category: 'Mass' })} />
    </View>
  );
}