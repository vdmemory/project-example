/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    getCountryLongName,
    getStateShortName,
    filteredAddress,
    getFormatValue,
    transformAddress,
} from './transformGoogleResult';

describe('transformGoogleResult functions', () => {
    describe('getCountryLongName', () => {
        it('returns the long name of the country', () => {
            const addresses = [
                {
                    long_name: 'United States',
                    short_name: 'US',
                    types: ['country'],
                },
            ];
            expect(getCountryLongName(addresses)).toBe('United States');
        });

        it('returns empty string if country is not found', () => {
            const addresses: {
                long_name: string;
                short_name: string;
                types: string[];
            }[] = [];
            expect(getCountryLongName(addresses)).toBe('');
        });
    });

    describe('getStateShortName', () => {
        it('returns the short name of the state', () => {
            const addresses = [
                {
                    long_name: 'California',
                    short_name: 'CA',
                    types: ['administrative_area_level_1'],
                },
            ];
            expect(getStateShortName(addresses)).toBe('CA');
        });

        it('returns empty string if state is not found', () => {
            const addresses: {
                long_name: string;
                short_name: string;
                types: string[];
            }[] = [];
            expect(getStateShortName(addresses)).toBe('');
        });
    });

    describe('filteredAddress', () => {
        it('filters and returns the relevant address component based on type', () => {
            const address = {
                long_name: 'New York',
                short_name: 'NY',
                types: ['locality'],
            };
            expect(filteredAddress(address)).toEqual({ city: 'New York' });
        });

        it('returns the correct mapping for country', () => {
            const address = {
                long_name: 'United States',
                short_name: 'US',
                types: ['country'],
            };
            const result = filteredAddress(address);
            expect(result).toEqual({ country: 'US' });
        });

        it('returns the correct mapping for state with both long and short names', () => {
            const address = {
                long_name: 'California',
                short_name: 'CA',
                types: ['administrative_area_level_1'],
            };
            const result = filteredAddress(address);
            expect(result).toEqual({ state: 'California', stateShort: 'CA' });
        });

        it('returns null for unrecognized types', () => {
            const address = {
                long_name: '1234',
                short_name: '1234',
                types: ['street_number'],
            };
            const result = filteredAddress(address);
            expect(result).toBeNull();
        });

        it('handles addresses with multiple types, choosing the first recognized type', () => {
            const address = {
                long_name: 'Los Angeles',
                short_name: 'LA',
                types: ['locality', 'administrative_area_level_1'],
            };
            const result = filteredAddress(address);
            expect(result).toEqual({ city: 'Los Angeles' });
        });

        it('returns the correct mapping for sublocality', () => {
            const address = {
                long_name: 'United State',
                short_name: 'US',
                types: ['sublocality'],
            };
            const result = filteredAddress(address);
            expect(result).toEqual({ sublocality: 'United State' });
        });

        it('returns the correct mapping for sublocality1', () => {
            const address = {
                long_name: 'United State',
                short_name: 'US',
                types: ['sublocality_level_1'],
            };
            const result = filteredAddress(address);
            expect(result).toEqual({ sublocality1: 'United State' });
        });

        it('returns the correct mapping for postalTown', () => {
            const address = {
                long_name: 'United State',
                short_name: 'US',
                types: ['postal_town'],
            };
            const result = filteredAddress(address);
            expect(result).toEqual({ postalTown: 'United State' });
        });

        it('returns the correct mapping for establishment', () => {
            const address = {
                long_name: 'United State',
                short_name: 'US',
                types: ['establishment'],
            };
            const result = filteredAddress(address);
            expect(result).toEqual({ establishment: 'United State' });
        });

        it('returns the correct mapping for naturalFeature', () => {
            const address = {
                long_name: 'United State',
                short_name: 'US',
                types: ['natural_feature'],
            };
            const result = filteredAddress(address);
            expect(result).toEqual({ naturalFeature: 'United State' });
        });

        it('returns the correct mapping for administrativeAreaLevel2', () => {
            const address = {
                long_name: 'United State',
                short_name: 'US',
                types: ['administrative_area_level_2'],
            };
            const result = filteredAddress(address);
            expect(result).toEqual({
                administrativeAreaLevel2: 'United State',
            });
        });

        it('returns the correct mapping for administrativeAreaLevel4', () => {
            const address = {
                long_name: 'United State',
                short_name: 'US',
                types: ['administrative_area_level_4'],
            };
            const result = filteredAddress(address);
            expect(result).toEqual({
                administrativeAreaLevel4: 'United State',
            });
        });

        it('returns null if type does not match', () => {
            const address = {
                long_name: 'Main Street',
                short_name: 'MS',
                types: ['route'],
            };
            expect(filteredAddress(address)).toBeNull();
        });
    });

    describe('transformAddress', () => {
        it('combines current address part into the accumulator', () => {
            const accumulator = { city: 'New York' };
            const current = { country: 'US' };
            expect(transformAddress(accumulator, current)).toEqual({
                city: 'New York',
                country: 'US',
            });
        });
    });

    describe('getFormatValue', () => {
        const address = {
            city: 'New York',
            country: 'NY',
            stateShort: 'NY',
            countryLongName: 'United States',
        };

        it('formats the address as city-country', () => {
            expect(getFormatValue(address, 'city-country')).toBe(
                'New York, NY',
            );
        });

        it('formats the address as just country', () => {
            expect(getFormatValue(address, 'country')).toBe('NY');
        });

        it('formats the address as country-long', () => {
            expect(getFormatValue(address, 'country-long')).toBe(
                'United States',
            );
        });

        it('formats the address as country-long', () => {
            // @ts-ignore
            expect(getFormatValue(address, 'any')).toBe('');
        });
    });
});
