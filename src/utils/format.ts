export const formatPrice = (price: number) => {
    if (price >= 1000000000) return `${(price / 1000000000).toFixed(2)}b`;
    if (price >= 1000000) return `${(price / 1000000).toFixed(2)}m`;
    if (price >= 1000) return `${(price / 1000).toFixed(2)}k`;
    return price.toFixed(2);
};
