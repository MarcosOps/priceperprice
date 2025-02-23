import React from 'react';
import { View, Text, Button } from 'react-native';

const subcategories = {
  Volume: ["ml", "L", "oz", "gal"],
  Length: ["cm", "m", "inch", "ft"],
  Mass: ["mg", "g", "kg", "lb", "oz"],
};

export default function CategoryScreen({ route, navigation }) {
  const { category } = route.params;
  return (
    <View>
      <Text>Escolha uma Unidade ({category})</Text>
      {subcategories[category].map((unit) => (
        <Button key={unit} title={unit} onPress={() => navigation.navigate('Comparison', { unit })} />
      ))}
    </View>
  );
}