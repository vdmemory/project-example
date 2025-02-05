import {
    getDefaultCardData,
    transformListAccount,
} from './transformListAccount';

describe('transformListAccount', () => {
    it('getDefaultCardData function - values exist', () => {
        const values = [
            {
                id: 'tk_1234',
                type: 'card_type',
                name: 'Visa',
                number: '1234',
                typeIcon: 'card',
                brand: 'Visa',
            },
        ];
        const expectedData = {
            token: 'tk_1234',
            paymentStatus: 'card_type',
        };

        expect(getDefaultCardData(values)).toEqual(expectedData);
    });

    it('getDefaultCardData function - values not exist', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const values: any[] = [];
        const expectedData = null;

        expect(getDefaultCardData(values)).toEqual(expectedData);
    });

    it('transformListAccount function - values exist', () => {
        const values = [
            {
                id: 123456,
                token: 'tk_1234',
                last4: '1234',
                institutionName: 'Visa',
                type: 'card_type',
                brand: 'Visa',
                default: true,
                displayName: 'Visa',
                expiredDate: '12/12',
                address: {
                    line1: 'line1',
                    city: 'city',
                    country: 'country',
                },
            },
        ];
        const expectedData = [
            {
                id: '123456',
                type: 'card_type',
                name: 'Visa',
                number: '1234',
                token: 'tk_1234',
                brand: 'Visa',
                typeIcon: 'card',
                default: true,
                displayName: 'Visa',
                expiredDate: '12/12',
                address: {
                    line1: 'line1',
                    city: 'city',
                    country: 'country',
                },
            },
        ];

        expect(transformListAccount(values)).toEqual(expectedData);
    });

    it('transformListAccount function - values not exist', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const values: any = null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const expectedData: any[] = [];

        expect(transformListAccount(values)).toEqual(expectedData);
    });
});
