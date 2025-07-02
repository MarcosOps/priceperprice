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
  
  // Area
  'cm²': { base: 'cm²', factor: 1 },
  'in²': { base: 'cm²', factor: 6.4516 },
  'ft²': { base: 'cm²', factor: 929.03 },
  'yd²': { base: 'cm²', factor: 8361.27 },
  'm²': { base: 'cm²', factor: 10000 },
  'acre': { base: 'cm²', factor: 40468564.224 },
  'hectare': { base: 'cm²', factor: 100000000 },
};

export const unitCategories = {
  liquid: ["ml", "L", "oz", "gal"],
  weight: ["mg", "g", "kg", "lb", "oz (weight)"],
  quantity: ["unit"],
  area: ["cm²", "in²", "ft²", "yd²", "m²", "acre", "hectare"]
};

export const units = [
  ...unitCategories.liquid,
  ...unitCategories.weight,
  ...unitCategories.quantity,
  ...unitCategories.area
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
  
  if (baseQuantity === 0) {
    throw new Error('Quantity cannot be zero');
  }
  
  return price / baseQuantity;
};
