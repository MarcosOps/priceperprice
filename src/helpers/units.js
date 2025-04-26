export const unitCategories = {
    liquid: ["ml", "L", "oz", "gal"],
    weight: ["mg", "g", "kg", "lb", "oz"],
    quantity: ["unit"]
  };
  
  export const units = [
    ...unitCategories.liquid,
    ...unitCategories.weight,
    ...unitCategories.quantity
  ];
  
  export const areUnitsCompatible = (unit1, unit2) => {
    const category1 = Object.keys(unitCategories).find(category => unitCategories[category].includes(unit1));
    const category2 = Object.keys(unitCategories).find(category => unitCategories[category].includes(unit2));
    return category1 === category2;
  };
  