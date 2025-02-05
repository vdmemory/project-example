import { getDiscountPrice, getPercentPrice } from './getCurrentPrice';

describe('getPercentPrice', () => {
    it('should return correct price', () => {
        const result = getPercentPrice(100, 30);
        expect(result).toEqual(70);
    });
});

describe('getDiscountPrice', () => {
    it('should return correct price', () => {
        const result = getDiscountPrice(100, 20);
        expect(result).toEqual(80);
    });
});
