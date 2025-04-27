export const unitConversionRates = {
  // Volume
  L: { base: 'ml', factor: 1000 },
  ml: { base: 'ml', factor: 1 },
  oz: { base: 'ml', factor: 29.5735 },
  gal: { base: 'ml', factor: 3785.41 },
  
  // Massa
  kg: { base: 'g', factor: 1000 },
  g: { base: 'g', factor: 1 },
  mg: { base: 'g', factor: 0.001 },
  lb: { base: 'g', factor: 453.592 },
  'oz (weight)': { base: 'g', factor: 28.3495 },

  // Quantidade
  unit: { base: 'unit', factor: 1 },
};

export const unitCategories = {
  liquid: ["ml", "L", "oz", "gal"],
  weight: ["mg", "g", "kg", "lb", "oz (weight)"],
  quantity: ["unit"]
};

export const units = [
  ...unitCategories.liquid,
  ...unitCategories.weight,
  ...unitCategories.quantity
];

export const areUnitsCompatible = (unit1, unit2) => {
  const category1 = Object.keys(unitCategories).find(category => 
    unitCategories[category].includes(unit1));
  const category2 = Object.keys(unitCategories).find(category => 
    unitCategories[category].includes(unit2));
  return category1 === category2;
};

export const convertToBaseUnit = (value, fromUnit) => {
  const conversion = unitConversionRates[fromUnit];
  if (!conversion) throw new Error(`Unidade desconhecida: ${fromUnit}`);
  return value * conversion.factor;
};

export const getBaseUnit = (unit) => {
  const conversion = unitConversionRates[unit];
  if (!conversion) throw new Error(`Unidade desconhecida: ${unit}`);
  return conversion.base;
};

export const calculateBasePrice = (price, quantity, unit) => {
  const baseQuantity = convertToBaseUnit(quantity, unit);
  return price / baseQuantity;
};

export const compareProducts = (product1, product2) => {
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
  
  return {
    status: 'DIFFERENT_PRICE',
    winner: basePrice1 < basePrice2 ? 'Product 1' : 'Product 2',
    baseUnit,
    cheaperPrice: Math.min(basePrice1, basePrice2),
    expensivePrice: Math.max(basePrice1, basePrice2),
    difference,
    differencePercentage: (difference / Math.max(basePrice1, basePrice2)) * 100
  };
};