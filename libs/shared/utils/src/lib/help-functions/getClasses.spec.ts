import { getClasses } from './getClasses';

describe('getClasses', () => {
    it('returns base class when className is undefined', () => {
        const base = 'base-class';
        const result = getClasses(base);

        expect(result).toBe('base-class');
    });

    it('returns concatenated classes when className is a string', () => {
        const base = 'base-class';
        const className = 'extra-class';
        const result = getClasses(base, className);

        expect(result).toBe('base-class extra-class');
    });

    it('returns concatenated classes when className is an array of strings', () => {
        const base = 'base-class';
        const className = ['extra-class', 'another-class'];
        const result = getClasses(base, className);

        expect(result).toBe('base-class extra-class another-class');
    });

    it('returns base class when className is an empty array', () => {
        const base = 'base-class';
        const className: string[] = [];
        const result = getClasses(base, className);

        expect(result).toBe('base-class');
    });

    it('handles multiple whitespace in className array', () => {
        const base = 'base-class';
        const className = ['extra-class', '', 'another-class', ''];
        const result = getClasses(base, className);

        expect(result).toBe('base-class extra-class another-class');
    });

    it('handles undefined className', () => {
        const base = 'base-class';
        const className = undefined;
        const result = getClasses(base, className);

        expect(result).toBe('base-class');
    });
});
