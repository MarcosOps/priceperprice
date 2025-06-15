import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    // Estilos para a SplashScreen
    // splashContainer: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: '#FFFF00', // Fundo amarelo
    // },
    // splashTextContainer: {
    //   flexDirection: 'row', // Dispor as letras horizontalmente
    // },
    // splashText: {
    //   fontSize: 32,
    //   fontWeight: 'bold', // Texto em negrito
    //   marginHorizontal: 2, // Espaçamento entre as letras
    // },
  
    // Estilos para a ConversionScreen
  conversionContainer: {
    flex: 1,
    padding: 40,
    backgroundColor: '#FFFF00', // Fundo amarelo
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    width: '100%',
  },
  conversionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000', // Cor do texto preto
    textAlign: 'center',
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
    height: Platform.OS === 'ios' ? 100 : 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#FFFFFF', // Fundo branco para o Picker
    ...(Platform.OS === 'ios' && {
      marginTop: 10,
      paddingHorizontal: 10,
    }),
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
    ...(Platform.OS === 'ios' ? { marginTop: -10 } : {}),
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
    marginTop: 10,
  },
  conversionResultWinner: {
    fontSize: Platform.OS === 'ios' ? 24 : 30,
    fontWeight: 'bold',
    color: '#28a745', // Verde para o vencedor
    marginTop: 10,
    flexWrap: 'wrap',
  },
  conversionResultDifference: {
    fontSize: 16,
    color: '#000000', // Cor do texto preto
    marginTop: 10,
  },
  
  // iOS Picker styles
  iosPicker: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  iosPickerText: {
    fontSize: 16,
    color: '#000000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '70%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000000',
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    width: '100%',
  },
  modalItemSelected: {
    backgroundColor: '#f0f0f0',
  },
  modalItemText: {
    fontSize: 16,
    color: '#000000',
  },
  modalItemTextSelected: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
