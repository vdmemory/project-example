import { transformAddressData } from './transformAddressData';

describe('transformAddressData', () => {
    it('transforms Stripe address data to CreateTokenCardData format', () => {
        const addressData = {
            name: 'John Doe',
            address: {
                line1: '123 test street',
                line2: 'Apt 101',
                city: 'Test City',
                state: 'Test State',
                postal_code: '12345',
                country: 'US',
            },
        };

        const transformedData = transformAddressData(addressData);

        expect(transformedData).toEqual({
            name: 'John Doe',
            address_line1: '123 test street',
            address_line2: 'Apt 101',
            address_city: 'Test City',
            address_zip: '12345',
            address_country: 'US',
            address_state: 'Test State',
        });
    });

    it('does not include line2 and state if they are not provided', () => {
        const addressData = {
            name: 'Jane Smith',
            address: {
                line1: '456 example street',
                city: 'Example City',
                postal_code: '54321',
                country: 'CA',
                line2: '',
                state: '',
            },
        };

        const transformedData = transformAddressData(addressData);

        expect(transformedData).toEqual({
            name: 'Jane Smith',
            address_line1: '456 example street',
            address_city: 'Example City',
            address_zip: '54321',
            address_country: 'CA',
        });
    });
});
