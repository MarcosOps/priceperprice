import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';


export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { ThemeProvider } from './src/screens/ThemeContext';
// import StackNavigator from './navigation/StackNavigator';

// export default function App() {
//   return (
//     <ThemeProvider>
//       <NavigationContainer>
//         <StackNavigator />
//       </NavigationContainer>
//     </ThemeProvider>
//   );
// }