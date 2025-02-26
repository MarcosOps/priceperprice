import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Estilos para a SplashScreen
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFF00', // Fundo amarelo
  },
  splashTextContainer: {
    flexDirection: 'row', // Dispor as letras horizontalmente
  },
  splashText: {
    fontSize: 32,
    fontWeight: 'bold', // Texto em negrito
    marginHorizontal: 2, // Espaçamento entre as letras
  },

  // Estilos para a ConversionScreen
  conversionContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFF00', // Fundo amarelo
  },
  conversionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000000', // Cor do texto preto
  },
  conversionLabel: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
    color: '#000000', // Cor do texto preto
  },
  conversionInputGroup: {
    marginBottom: 20,
  },
  conversionPicker: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#FFFFFF', // Fundo branco para o Picker
  },
  conversionInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF', // Fundo branco para os campos de entrada
    color: '#000000', // Cor do texto preto
  },
  conversionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
  },
  conversionCalculateButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  conversionClearButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  conversionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  conversionResultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFFFFF', // Fundo branco para o resultado
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  conversionResultMessage: {
    fontSize: 18,
    color: '#000000', // Cor do texto preto
    textAlign: 'center',
  },
  conversionResultWinner: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745', // Verde para o vencedor
    marginTop: 10,
  },
  conversionResultDifference: {
    fontSize: 16,
    color: '#000000', // Cor do texto preto
    marginTop: 5,
  },
});