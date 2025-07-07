import { unitConversionRates, unitCategories, units as originalUnits, areUnitsCompatible, convertToBaseUnit, getBaseUnit, calculateBasePrice } from './units';
import { getTranslation } from '../translations/translations';

// Function to get translated unit names
export const getTranslatedUnits = (languageCode) => {
  // For now, we'll keep the original unit symbols as they are universal
  // but in a real app, you might want to translate the full names
  return originalUnits;
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

  if (isNaN(basePrice1) || isNaN(basePrice2)) {
    return { error: 'INVALID_INPUT' };
  }

  const difference = Math.abs(basePrice1 - basePrice2);

  if (difference < 0.0001) {
    return {
      status: 'SAME_PRICE',
      baseUnit,
      pricePerUnit1: basePrice1,
      pricePerUnit2: basePrice2,
    };
  }

  const winner = basePrice1 < basePrice2 ? 'Product 1' : 'Product 2';
  const cheaperProduct = winner === 'Product 1' ? product1 : product2;
  const totalSaving = difference * convertToBaseUnit(cheaperProduct.quantity, cheaperProduct.unit);
  
  return {
    status: 'DIFFERENT_PRICE',
    winner,
    baseUnit,
    pricePerUnit1: basePrice1,
    pricePerUnit2: basePrice2,
    difference,
    differencePercentage: (difference / Math.max(basePrice1, basePrice2)) * 100,
    totalSaving,
  };
};
