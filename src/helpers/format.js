export const formatCurrency = (value, lang) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const number = parseFloat(numericValue) / 100;

    if (isNaN(number) || numericValue === '') {
        return '';
    }

    const options = {
        style: 'currency',
        currency: 'USD', // Default currency
    };

    // Adjust currency based on language
    if (lang === 'pt') {
        options.currency = 'BRL';
    } else if (lang === 'es') {
        options.currency = 'EUR';
    } else if (lang === 'fr') {
        options.currency = 'EUR';
    }

    return number.toLocaleString(lang, options);
};
