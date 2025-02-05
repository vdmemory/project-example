import {
    CountryCode,
    getCountryCallingCode,
    getExampleNumber,
    getCountries,
} from 'libphonenumber-js';
import examples from 'libphonenumber-js/mobile/examples';

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

export const listCountries = getCountries()
    .map(item => ({
        country: item,
        name: regionNames.of(item) || '',
        phone: getCountryCallingCode(item),
    }))
    .sort((a, b) => (a.name > b.name ? 1 : -1));

export const currentCountry = (countryCode: string) =>
    listCountries.find(item => '+' + item.phone === countryCode);

export const examplePhoneNumber = (country: CountryCode) =>
    getExampleNumber((country || 'US') as CountryCode, examples);
