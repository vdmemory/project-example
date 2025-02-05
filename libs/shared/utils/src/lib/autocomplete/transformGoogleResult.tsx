const COUNTRY = 'country';
const CITY = 'locality';
const SUBLOCALITY = 'sublocality';
const SUBLOCALITY1 = 'sublocality_level_1';
const POSTAL_TOWN = 'postal_town';
const ESTABLISHMENT = 'establishment';
const NATURAL_FEATURE = 'natural_feature';
const ADMINISTRATIVE_AREA_LEVEL_2 = 'administrative_area_level_2';
const ADMINISTRATIVE_AREA_LEVEL_4 = 'administrative_area_level_4';
const STATE = 'administrative_area_level_1';

type Address = {
    long_name: string;
    short_name: string;
    types: string[];
};

export type TransformAddressType = {
    country?: string;
    city?: string;
    sublocality?: string;
    sublocality1?: string;
    postalTown?: string;
    establishment?: string;
    naturalFeature?: string;
    administrativeAreaLevel2?: string;
    administrativeAreaLevel4?: string;
    state?: string;
    stateShort?: string;
    countryLongName?: string;
    formattedAddress?: string;
};

export const getCountryLongName = (addr: Address[]): string => {
    const country = addr.find(a => a.types.includes(COUNTRY));
    return country ? country.long_name : '';
};

export const getStateShortName = (addr: Address[]): string => {
    const state = addr.find(a => a.types.includes(STATE));
    return state ? state.short_name : '';
};

export const filteredAddress = (addr: Address) => {
    switch (true) {
        case addr.types.includes(COUNTRY):
            return { country: addr.short_name };
        case addr.types.includes(CITY):
            return { city: addr.long_name };
        case addr.types.includes(SUBLOCALITY):
            return { sublocality: addr.long_name };
        case addr.types.includes(SUBLOCALITY1):
            return { sublocality1: addr.long_name };
        case addr.types.includes(POSTAL_TOWN):
            return { postalTown: addr.long_name };
        case addr.types.includes(ESTABLISHMENT):
            return { establishment: addr.long_name };
        case addr.types.includes(NATURAL_FEATURE):
            return { naturalFeature: addr.long_name };
        case addr.types.includes(ADMINISTRATIVE_AREA_LEVEL_2):
            return { administrativeAreaLevel2: addr.long_name };
        case addr.types.includes(ADMINISTRATIVE_AREA_LEVEL_4):
            return { administrativeAreaLevel4: addr.long_name };
        case addr.types.includes(STATE):
            return { state: addr.long_name, stateShort: addr.short_name };
        default:
            return null;
    }
};

export type FilteredAddress = typeof filteredAddress;

export const transformAddress = (
    accumulator: { [x: string]: string },
    current: { [x: string]: string },
) => {
    return { ...accumulator, ...current };
};

export type ReturnFormatType = 'city-country' | 'country' | 'country-long';

export const getFormatValue = (
    {
        city,
        sublocality,
        sublocality1,
        postalTown,
        establishment,
        naturalFeature,
        administrativeAreaLevel2,
        administrativeAreaLevel4,
        state,
        stateShort,
        countryLongName,
        country,
    }: TransformAddressType,
    returnedFormat: ReturnFormatType,
) => {
    const countryValue = country === US ? stateShort ?? US : country;
    if (returnedFormat === 'city-country') {
        const cityValue =
            city ||
            sublocality ||
            sublocality1 ||
            postalTown ||
            establishment ||
            naturalFeature ||
            administrativeAreaLevel2 ||
            administrativeAreaLevel4 ||
            state ||
            countryLongName;
        return `${cityValue}, ${countryValue}`;
    }

    if (returnedFormat === 'country') return `${countryValue}`;
    if (returnedFormat === 'country-long') return `${countryLongName}`;

    return '';
};

export const ERROR_MESSAGE_DUPLICATE = 'This location already exists';
const US = 'US';
