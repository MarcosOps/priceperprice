import { DefaultTheme, DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007BFF', // Cor primária (azul)
    background: '#FFFFFF', // Fundo claro
    surface: '#F9F9F9', // Superfície clara
    text: '#000000', // Texto escuro
    placeholder: '#666666', // Texto de placeholder
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#BB86FC', // Cor primária (roxo)
    background: '#121212', // Fundo escuro
    surface: '#1E1E1E', // Superfície escura
    text: '#FFFFFF', // Texto claro
    placeholder: '#AAAAAA', // Texto de placeholder
  },
};