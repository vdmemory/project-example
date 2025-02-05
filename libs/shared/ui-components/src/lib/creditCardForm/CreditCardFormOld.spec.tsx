import { render, screen } from '@testing-library/react';
import CreditCardFormOld from './CreditCardFormOld';
import { StripeElements } from '../stripe/StripeElementsLayout';
import { useGetCardBillingDetailsQuery } from '@breef/shared/data-access-payments';

const props = {
    onClick: jest.fn(),
    isSubmitted: false,
    isDisabledBtn: false,
    nameSubmitBtn: 'Pay + Post',
    isShowSwitcher: true,
    setCardToken: jest.fn(),
    cardToken: 'test-token',
};

jest.mock('@breef/shared/data-access-payments');

const data = {
    token: 'test-token',
    last4: '4242',
    brand: 'Visa',
    type: 'payment_method',
    expiredDate: '12/2023',
    billingDetails: {
        address: {
            country: 'US',
            line1: 'line1',
            postalCode: '12345',
            city: 'city',
            state: 'state',
        },
        name: 'name',
    },
};

describe('CreditCardFormOld', () => {
    it('should render successfully', async () => {
        (useGetCardBillingDetailsQuery as jest.Mock).mockReturnValue({
            data,
            isFetching: false,
        });
        const { baseElement } = render(
            <StripeElements>
                <CreditCardFormOld {...props}>test children</CreditCardFormOld>
            </StripeElements>,
        );
        expect(baseElement).toBeTruthy();
    });

    describe('Elements render CreditCardFormOld', () => {
        const testCases = [
            { name: 'label', expected: 'card details' },
            { name: 'last4 card', expected: '4242' },
            { name: 'expired date card', expected: '12/2023' },
            { name: 'hide symbol cvc card', expected: '•••' },
            { name: 'children element', expected: 'test children' },
            { name: 'pay button', expected: 'Pay + Post' },
            { name: 'switcher', expected: 'Save for future payments' },
        ];

        testCases.forEach(testCase => {
            it(`should render successfully CreditCardFormOld with ${testCase.name}`, () => {
                (useGetCardBillingDetailsQuery as jest.Mock).mockReturnValue({
                    data,
                    isFetching: false,
                });
                render(
                    <StripeElements>
                        <CreditCardFormOld {...props}>
                            test children
                        </CreditCardFormOld>
                    </StripeElements>,
                );
                const element = screen.getByText(testCase.expected);
                expect(element).toBeInTheDocument();
            });
        });
    });

    it('should render loader', async () => {
        (useGetCardBillingDetailsQuery as jest.Mock).mockReturnValue({
            data: null,
            isFetching: true,
        });
        render(
            <StripeElements>
                <CreditCardFormOld {...props}>test children</CreditCardFormOld>
            </StripeElements>,
        );
        const preloader = screen.getByTestId('preloader');
        const spinner = screen.getByTestId('spinner');
        expect(preloader).toBeInTheDocument();
        expect(spinner).toBeInTheDocument();
    });

    it('should render successfully when card data empty', async () => {
        (useGetCardBillingDetailsQuery as jest.Mock).mockReturnValue({
            data: null,
            isFetching: false,
        });
        const { baseElement } = render(
            <StripeElements>
                <CreditCardFormOld {...props}>test children</CreditCardFormOld>
            </StripeElements>,
        );
        const loader = baseElement.querySelectorAll('.loader');
        expect(loader).toHaveLength(3);
    });

    describe('Elements render CreditCardFormOld when card data empty', () => {
        const testCases = [
            { name: 'label details', expected: 'card details' },
            { name: 'label number', expected: 'Card number' },
            { name: 'label expiry', expected: 'Expiry (MM/YY)' },
            { name: 'label CVC', expected: 'CVC' },
            { name: 'label billing details', expected: 'billing details' },
            { name: 'children', expected: 'test children' },
            { name: 'pay button', expected: 'Pay + Post' },
            { name: 'switcher', expected: 'Save for future payments' },
        ];

        testCases.forEach(testCase => {
            it(`should render successfully CreditCardFormOld with ${testCase.name} when card data empty`, () => {
                (useGetCardBillingDetailsQuery as jest.Mock).mockReturnValue({
                    data: null,
                    isFetching: false,
                });
                render(
                    <StripeElements>
                        <CreditCardFormOld {...props}>
                            test children
                        </CreditCardFormOld>
                    </StripeElements>,
                );
                const element = screen.getByText(testCase.expected);
                expect(element).toBeInTheDocument();
            });
        });
    });

    it('should render successfully when card data empty', async () => {
        (useGetCardBillingDetailsQuery as jest.Mock).mockReturnValue({
            data: null,
            isFetching: false,
            isError: true,
        });
        render(
            <StripeElements>
                <CreditCardFormOld {...props}>test children</CreditCardFormOld>
            </StripeElements>,
        );
        const preloader = screen.getByTestId('preloader');
        const spinner = screen.getByTestId('spinner');
        expect(preloader).toBeInTheDocument();
        expect(spinner).toBeInTheDocument();
    });
});
