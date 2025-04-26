export const calculatePricePerUnit = (quantity, price) => {
    if (!quantity || !price || parseFloat(quantity) === 0) {
      return parseFloat(price) / parseFloat(quantity);
    }
    return null;
  };
  