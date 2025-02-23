import React from 'react';
import { View, Text } from 'react-native';

export default function ComparisonScreen({ route }) {
  const { unit } = route.params;
  return (
    <View>
      <Text>Comparação de Preço ({unit})</Text>
      <Text>Campos para inserir quantidade e preço</Text>
    </View>
  );
}