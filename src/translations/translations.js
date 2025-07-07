export const translations = {
  en: {
    product1: 'Product 1',
    product2: 'Product 2',
    clean: 'Clear',
    calculate: 'Calculate',
    selectLanguage: 'Select Language',
    quantity: 'Quantity',
    price: 'Price',
    unit: 'Unit',
    betterValue: 'Best Value',
    isCheaper: 'is cheaper!',
    pricePerUnit: 'Price per unit',
    youSave: 'You are Saving',
    samePrice: '⚖️ Both products have the same price.',
    invalidInput: '⚠️ Please enter valid quantities and prices.',
    incompatibleUnits: '❌ Units are not compatible. Please compare like with like.',
  },
  es: {
    product1: 'Producto 1',
    product2: 'Producto 2',
    clean: 'Limpiar',
    calculate: 'Calcular',
    selectLanguage: 'Seleccionar Idioma',
    quantity: 'Cantidad',
    price: 'Precio',
    unit: 'Unidad',
    betterValue: 'Mejor Valor',
    isCheaper: '¡es más barato!',
    pricePerUnit: 'Precio por unidad',
    youSave: 'Ahorras',
    samePrice: '⚖️ Ambos productos tienen el mismo precio.',
    invalidInput: '⚠️ Por favor, ingrese cantidades y precios válidos.',
    incompatibleUnits: '❌ Las unidades no son compatibles. Por favor, compare tipos de unidades similares.',
  },
  pt: {
    product1: 'Produto 1',
    product2: 'Produto 2',
    clean: 'Limpar',
    calculate: 'Calcular',
    selectLanguage: 'Selecionar Idioma',
    quantity: 'Quantidade',
    price: 'Preço',
    unit: 'Unidade',
    betterValue: 'Melhor Custo-Benefício',
    isCheaper: 'é mais barato!',
    pricePerUnit: 'Preço por unidade',
    youSave: 'Você economiza',
    samePrice: '⚖️ Ambos os produtos têm o mesmo preço.',
    invalidInput: '⚠️ Por favor, insira quantidades e preços válidos.',
    incompatibleUnits: '❌ As unidades não são compatíveis. Por favor, compare tipos de unidades semelhantes.',
  },
  fr: {
    product1: 'Produit 1',
    product2: 'Produit 2',
    clean: 'Effacer',
    calculate: 'Calculer',
    selectLanguage: 'Choisir la Langue',
    quantity: 'Quantité',
    price: 'Prix',
    unit: 'Unité',
    betterValue: 'Meilleure Valeur',
    isCheaper: 'est moins cher !',
    pricePerUnit: 'Prix par unité',
    youSave: 'Vous économisez',
    samePrice: '⚖️ Les deux produits ont le même prix.',
    invalidInput: '⚠️ Veuillez entrer des quantités et des prix valides.',
    incompatibleUnits: "❌ Unités incompatibles. Comparez des types similaires.",
  },
};

// Function to get translations based on language code
export const getTranslation = (languageCode, key) => {
  if (translations[languageCode] && translations[languageCode][key]) {
    return translations[languageCode][key];
  }
  // Fallback to English if translation is missing
  return translations.en[key] || key;
};
