import {
    currentCountry,
    examplePhoneNumber,
    listCountries,
} from './maskForPhoneNumber';
import examples from 'libphonenumber-js/mobile/examples';

describe('listCountries', () => {
    it('should return an array of countries with expected properties', () => {
        const expectedProperties = ['country', 'name', 'phone'];
        const firstCountry = listCountries[0];
        expect(Object.keys(firstCountry)).toEqual(
            expect.arrayContaining(expectedProperties),
        );
    });

    it('should sort countries alphabetically by name', () => {
        const countries = listCountries.map(item => item.name);
        const sortedCountries = countries.sort();
        expect(countries).toEqual(sortedCountries);
    });
});

describe('currentCountry', () => {
    it('should return the correct country for the given country code', () => {
        expect(currentCountry('+1')).toEqual({
            country: 'AS',
            name: 'American Samoa',
            phone: '1',
        });
        expect(currentCountry('+380')).toEqual({
            country: 'UA',
            name: 'Ukraine',
            phone: '380',
        });
        expect(currentCountry('+33')).toEqual({
            country: 'FR',
            name: 'France',
            phone: '33',
        });
    });

    it('should return undefined for an invalid country code', () => {
        expect(currentCountry('invalid')).toBeUndefined();
        expect(currentCountry('')).toBeUndefined();
    });
});

describe('examplePhoneNumber', () => {
    it('should return an example phone number for the specified country', () => {
        expect(examplePhoneNumber('FR')?.nationalNumber).toEqual(
            examples['FR'],
        );
        expect(examplePhoneNumber('GB')?.nationalNumber).toEqual(
            examples['GB'],
        );
    });
});
