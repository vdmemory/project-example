/* eslint-disable @typescript-eslint/ban-ts-comment */

import { getCardToken } from './useStripeElements';

jest.mock('@stripe/react-stripe-js', () => ({
    useStripe: jest.fn(),
    useElements: jest.fn(),
}));

jest.mock('../utils/adapters/transformAddressData', () => ({
    transformAddressData: jest.fn().mockReturnValue({}),
}));

describe('getCardToken', () => {
    it('should return token when createToken is successful', async () => {
        const stripeMock = {
            createToken: jest
                .fn()
                .mockResolvedValue({ token: { id: 'test_token' } }),
        };
        const cardNumberMock = {};
        const optionsMock = {};
        const token = await getCardToken(
            //@ts-ignore
            stripeMock,
            cardNumberMock,
            optionsMock,
        );
        expect(token).toEqual({ id: 'test_token' });
    });

    it('should throw error when createToken fails', async () => {
        const errorMock = new Error('Token creation failed');
        const stripeMock = {
            createToken: jest.fn().mockResolvedValue({ error: errorMock }),
        };
        const cardNumberMock = {};
        const optionsMock = {};
        await expect(
            //@ts-ignore
            getCardToken(stripeMock, cardNumberMock, optionsMock),
        ).rejects.toThrow(errorMock);
    });
});
