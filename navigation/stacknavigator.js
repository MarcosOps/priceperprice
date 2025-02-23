import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../src/screens/HomeScreen';
import CategoryScreen from '../src/screens/CategoryScreen';
import ComparisonScreen from '../src/screens/ComparisonScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="Comparison" component={ComparisonScreen} />
    </Stack.Navigator>
  );
}
