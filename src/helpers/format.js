export const formatCurrency = (value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const number = parseFloat(numericValue) / 100;
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };
  