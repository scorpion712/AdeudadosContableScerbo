export const formatPrice = (price: number) => {
    if (isNaN(price)) return '0,00';
    
    return new Intl.NumberFormat('es-ES', {
        style: 'decimal',
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2,
        useGrouping: true
    }).format(price);
};
