// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from '../src/screens/HomeScreen';
// import CategoryScreen from '../src/screens/CategoryScreen';
// import ComparisonScreen from '../src/screens/ComparisonScreen';

// const Stack = createStackNavigator();

// export default function StackNavigator() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Category" component={CategoryScreen} />
//       <Stack.Screen name="Comparison" component={ComparisonScreen} />
//     </Stack.Navigator>
//   );
// }

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ConversionScreen from '../src/screens/ConversionScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Conversion"
        component={ConversionScreen}
        options={{ title: 'Comparação de Preços' }}
      />
    </Stack.Navigator>
  );
}