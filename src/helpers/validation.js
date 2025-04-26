export const calculatePricePerUnit = (quantity, price) => {
  const qty = parseFloat(quantity);
  const prc = parseFloat(price);

  if (isNaN(qty) || isNaN(prc) || qty === 0) {
    return null;
  }

  return prc / qty;
};
