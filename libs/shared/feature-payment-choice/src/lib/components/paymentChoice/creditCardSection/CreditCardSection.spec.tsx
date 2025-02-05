import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import CreditCardSection from './CreditCardSection';
import { configureStore } from '@reduxjs/toolkit';
import { apiPayments } from '@breef/shared/data-access-payments';

const props = {
    amount: 200,
    fee: 50,
    onClick: jest.fn(),
    tabs: [
        {
            label: 'Tab Name',
            key: 'tabName',
        },
    ],
    setIsSuccessTag: jest.fn(),
    paymentMethod: 'tabName',
};

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: {},
            asPath: '',
            push: jest.fn(),
        };
    },
}));

jest.mock('@breef/shared/data-access-payments', () => ({
    __esModule: true,
    ...jest.requireActual('@breef/shared/data-access-payments'),
    useGetCardsQuery: () => ({
        data: null,
        isLoading: false,
    }),
}));

jest.mock('@stripe/react-stripe-js', () => ({
    useStripe: jest.fn(),
    useElements: jest.fn(),
}));

const mockConfiguredStore = configureStore({
    reducer: {
        [apiPayments.reducerPath]: apiPayments.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiPayments.middleware),
});

const renderElement = () => {
    const methods = render(
        <Provider store={mockConfiguredStore}>
            <CreditCardSection {...props} />,
        </Provider>,
    );
    return { ...methods };
};

describe('CreditCardSection', () => {
    it('should render successfully', () => {
        const { baseElement } = renderElement();
        expect(baseElement).toBeTruthy();
    });

    describe('CreditCardSection section texts', () => {
        const testCases = [
            { expected: 'Make Payment' },
            { expected: 'select a payment method' },
            { expected: 'Tab Name' },
            { expected: 'saved card' },
            { expected: 'PAY $250.00' },
        ];

        testCases.forEach((testCase, i) => {
            it(`should render successfully text ${i + 1}`, async () => {
                const { getByText } = renderElement();
                expect(getByText(testCase.expected)).toBeTruthy();
            });
        });

        it('should render successfully isHideTabs props', () => {
            const { getByText } = render(
                <Provider store={mockConfiguredStore}>
                    <CreditCardSection {...props} isHideTabs={true} />,
                </Provider>,
            );
            expect(getByText('Payment total')).toBeTruthy();
            expect(getByText('$200')).toBeTruthy();
        });
    });
});
