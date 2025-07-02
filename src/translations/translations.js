export const translations = {
  en: {
    // ConversionScreen
    product1: 'Product 1',
    product2: 'Product 2',
    clean: 'Clean',
    calculate: 'Calculate',
    selectLanguage: 'Select Language',
    
    // ProductInputGroup
    quantity: 'Quantity',
    price: 'Price',
    
    // Units
    unit: 'Unit',
    gram: 'Gram',
    kilogram: 'Kilogram',
    liter: 'Liter',
    milliliter: 'Milliliter',
    unit_singular: 'Unit',
    unit_plural: 'Units',
    
    // ResultDisplay
    betterValue: 'Better Value',
    moreExpensive: 'is more expensive than',
    cheaper: 'is cheaper than',
    by: 'improve',
    samePrice: 'Both products have the same price per unit',
    invalidInput: 'Please enter valid quantities and prices',
    incompatibleUnits: 'Units are not compatible. Please compare liquid with liquid, weight with weight, or quantity with quantity.',
    pricePerUnit: 'Price per unit',
  },
  es: {
    // ConversionScreen
    product1: 'Producto 1',
    product2: 'Producto 2',
    clean: 'Limpiar',
    calculate: 'Calcular',
    selectLanguage: 'Seleccionar Idioma',
    
    // ProductInputGroup
    quantity: 'Cantidad',
    price: 'Precio',
    
    // Units
    unit: 'Unidad',
    gram: 'Gramo',
    kilogram: 'Kilogramo',
    liter: 'Litro',
    milliliter: 'Mililitro',
    unit_singular: 'Unidad',
    unit_plural: 'Unidades',
    
    // ResultDisplay
    betterValue: 'Mejor Valor',
    moreExpensive: 'es más caro que',
    cheaper: 'es más barato que',
    by: 'mejora',
    samePrice: 'Ambos productos tienen el mismo precio por unidad',
    invalidInput: 'Por favor, ingrese cantidades y precios válidos',
    incompatibleUnits: 'Las unidades no son compatibles. Por favor, compare líquidos con líquidos, peso con peso o cantidad con cantidad.',
    pricePerUnit: 'Precio por unidad',
  },
  pt: {
    // ConversionScreen
    product1: 'Produto 1',
    product2: 'Produto 2',
    clean: 'Limpar',
    calculate: 'Calcular',
    selectLanguage: 'Selecionar Idioma',
    
    // ProductInputGroup
    quantity: 'Quantidade',
    price: 'Preço',
    
    // Units
    unit: 'Unidade',
    gram: 'Grama',
    kilogram: 'Quilograma',
    liter: 'Litro',
    milliliter: 'Mililitro',
    unit_singular: 'Unidade',
    unit_plural: 'Unidades',
    
    // ResultDisplay
    betterValue: 'Melhor Valor',
    moreExpensive: 'é mais caro que',
    cheaper: 'é mais barato que',
    by: 'melhoria',
    samePrice: 'Ambos os produtos têm o mesmo preço por unidade',
    invalidInput: 'Por favor, insira quantidades e preços válidos',
    incompatibleUnits: 'As unidades não são compatíveis. Por favor, compare líquido com líquido, peso com peso ou quantidade com quantidade.',
    pricePerUnit: 'Preço por unidade',
  },
  fr: {
    // ConversionScreen
    product1: 'Produit 1',
    product2: 'Produit 2',
    clean: 'Effacer',
    calculate: 'Calculer',
    selectLanguage: 'Choisir la Langue',
    
    // ProductInputGroup
    quantity: 'Quantité',
    price: 'Prix',
    
    // Units
    unit: 'Unité',
    gram: 'Gramme',
    kilogram: 'Kilogramme',
    liter: 'Litre',
    milliliter: 'Millilitre',
    unit_singular: 'Unité',
    unit_plural: 'Unités',
    
    // ResultDisplay
    betterValue: 'Meilleure Valeur',
    moreExpensive: 'est plus cher que',
    cheaper: 'est moins cher que',
    by: 'amélioration',
    samePrice: 'Les deux produits ont le même prix par unité',
    invalidInput: 'Veuillez entrer des quantités et des prix valides',
    incompatibleUnits: 'Les unités ne sont pas compatibles. Veuillez comparer les liquides avec les liquides, le poids avec le poids ou la quantité avec la quantité.',
    pricePerUnit: 'Prix par unité',
  }
};

// Function to get translations based on language code
export const getTranslation = (languageCode, key) => {
  if (translations[languageCode] && translations[languageCode][key]) {
    return translations[languageCode][key];
  }
  // Fallback to English if translation is missing
  return translations.en[key] || key;
};
