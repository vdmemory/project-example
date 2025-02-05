export const getPercentPrice = (price: number, percent: number) =>
    price - (price * percent) / 100;

export const getDiscountPrice = (price: number, discount: number) =>
    price - discount;
