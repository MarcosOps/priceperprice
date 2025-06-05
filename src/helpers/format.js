export const formatCurrency = (value) => {
    // Simple implementation that just removes non-numeric characters
    // and formats as currency
    const numericValue = value.replace(/[^0-9]/g, '');
    const number = parseFloat(numericValue) / 100;
    
    if (isNaN(number) || numericValue === '') {
      return '';
    }
    
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };
