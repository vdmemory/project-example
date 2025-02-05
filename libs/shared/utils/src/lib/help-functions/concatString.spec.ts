import { concatStrings } from './concatStrings';

describe('concatStrings', () => {
    it('concatenates strings with the specified separator and last separator', () => {
        const values = ['apple', 'banana', 'cherry'];
        const separator = ', ';
        const separatorLast = ' and ';

        const result = concatStrings(values, separator, separatorLast);

        expect(result).toBe('apple, banana and cherry');
    });

    it('handles empty values array', () => {
        const values: string[] = [];
        const separator = ', ';
        const separatorLast = ' and ';

        const result = concatStrings(values, separator, separatorLast);

        expect(result).toBe('');
    });

    it('handles single-value array', () => {
        const values = ['apple'];
        const separator = ', ';
        const separatorLast = ' and ';

        const result = concatStrings(values, separator, separatorLast);

        expect(result).toBe('apple');
    });

    it('handles custom separator and last separator', () => {
        const values = ['one', 'two', 'three'];
        const separator = ' - ';
        const separatorLast = ' or ';

        const result = concatStrings(values, separator, separatorLast);

        expect(result).toBe('one - two or three');
    });

    it('handles empty separator and last separator', () => {
        const values = ['a', 'b', 'c'];
        const separator = '';
        const separatorLast = '';

        const result = concatStrings(values, separator, separatorLast);

        expect(result).toBe('abc');
    });
});
