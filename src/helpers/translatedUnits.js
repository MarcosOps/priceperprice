import { unitConversionRates, unitCategories, units as originalUnits, areUnitsCompatible, convertToBaseUnit, getBaseUnit, calculateBasePrice, compareProducts as originalCompareProducts } from './units';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations/translations';

// Function to get translated unit names
export const getTranslatedUnits = (languageCode) => {
  // For now, we'll keep the original unit symbols as they are universal
  // but in a real app, you might want to translate the full names
  return originalUnits;
};

// Function to get the translated winner product name
export const getTranslatedProductName = (productKey, languageCode) => {
  if (productKey === 'Product 1') {
    return getTranslation(languageCode, 'product1');
  } else if (productKey === 'Product 2') {
    return getTranslation(languageCode, 'product2');
  }
  return productKey;
};

// Re-export the original functions from units.js
export { unitConversionRates, unitCategories, areUnitsCompatible, convertToBaseUnit, getBaseUnit, calculateBasePrice };

// Modified compareProducts function to use translated product names
export const compareProducts = (product1, product2, languageCode = 'en') => {
  const { price: price1, quantity: quantity1, unit: unit1 } = product1;
  const { price: price2, quantity: quantity2, unit: unit2 } = product2;

  if (!areUnitsCompatible(unit1, unit2)) {
    return { error: 'INCOMPATIBLE_UNITS' };
  }

  const baseUnit = getBaseUnit(unit1);
  const basePrice1 = calculateBasePrice(price1, quantity1, unit1);
  const basePrice2 = calculateBasePrice(price2, quantity2, unit2);
  const difference = Math.abs(basePrice1 - basePrice2);

  if (difference < 0.0001) {
    return {
      status: 'SAME_PRICE',
      baseUnit,
      basePrice1,
      basePrice2
    };
  }

  const winner = basePrice1 < basePrice2 ? 'Product 1' : 'Product 2';
  
  return {
    status: 'DIFFERENT_PRICE',
    winner,
    translatedWinner: getTranslatedProductName(winner, languageCode),
    baseUnit,
    cheaperPrice: Math.min(basePrice1, basePrice2),
    expensivePrice: Math.max(basePrice1, basePrice2),
    difference,
    differencePercentage: (difference / Math.max(basePrice1, basePrice2)) * 100
  };
};
