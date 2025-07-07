import { StyleSheet, Platform } from 'react-native';

const colors = {
  background: '#F5F5F5', // Light gray background
  primary: '#4A90E2', // Soft blue for primary actions
  secondary: '#D8D8D8', // Light gray for secondary actions
  text: '#333333', // Dark gray for text
  white: '#FFFFFF',
  green: '#7ED321', // Vibrant green for success/winner
  red: '#D0021B', // Red for clear/delete
  lightBorder: '#E0E0E0',
};

export default StyleSheet.create({
  conversionContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20, // Reduced padding to move content up
    backgroundColor: colors.background,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
    width: '100%',
    marginTop: 20, // Added margin to push header down from status bar
  },
  conversionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  conversionLabel: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 15,
    marginBottom: 8,
    color: colors.text,
  },
  conversionInputGroup: {
    marginBottom: 20,
  },
  pickerContainer: {
    borderColor: colors.lightBorder,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: colors.white,
    overflow: 'hidden', // Ensures the picker respects the border radius
  },
  androidPicker: {
    height: 50,
    width: '100%',
    color: colors.text,
  },
  conversionInput: {
    height: 50,
    borderColor: colors.lightBorder,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: colors.white,
    color: colors.text,
    fontSize: 16,
  },
  conversionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  conversionCalculateButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 12,
    flex: 1,
    marginLeft: 10, // Swapped margin
    alignItems: 'center',
  },
  conversionClearButton: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 12,
    flex: 1,
    marginRight: 10, // Swapped margin
    alignItems: 'center',
  },
  conversionButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  conversionResultContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.lightBorder,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  conversionResultMessage: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    marginTop: 10,
  },
  conversionResultWinner: {
    fontSize: Platform.OS === 'ios' ? 26 : 32,
    fontWeight: 'bold',
    color: colors.green,
    marginTop: 10,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  conversionResultDifference: {
    fontSize: 16,
    color: colors.text,
    marginTop: 10,
  },
  priceDetailText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginVertical: 2,
  },
  priceDetailWinnerText: {
    fontWeight: 'bold',
    color: colors.green,
    fontSize: 18,
  },

  // iOS Picker styles
  iosPicker: {
    height: 50,
    width: '100%',
    borderColor: colors.lightBorder,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: colors.white,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  iosPickerText: {
    fontSize: 16,
    color: colors.text,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40, // Extra space for home indicator
    alignItems: 'center',
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.text,
  },
  modalItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBorder,
    width: '100%',
    alignItems: 'center',
  },
  modalItemSelected: {
    backgroundColor: colors.background,
  },
  modalItemText: {
    fontSize: 18,
    color: colors.text,
  },
  modalItemTextSelected: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  modalCloseButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
