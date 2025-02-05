import { render, screen } from '@testing-library/react';
import CreditCardForm from './CreditCardForm';
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

describe('CreditCardForm', () => {
    it('should render successfully', async () => {
        (useGetCardBillingDetailsQuery as jest.Mock).mockReturnValue({
            data,
            isFetching: false,
        });
        const { baseElement } = render(
            <StripeElements>
                <CreditCardForm {...props}>test children</CreditCardForm>
            </StripeElements>,
        );
        expect(baseElement).toBeTruthy();
    });

    describe('Elements render CreditCardForm', () => {
        const testCases = [
            { name: 'label', expected: 'Card Details' },
            { name: 'last4 card', expected: '4242' },
            { name: 'expired date card', expected: '12/2023' },
            { name: 'hide symbol cvc card', expected: '•••' },
            { name: 'children element', expected: 'test children' },
            { name: 'pay button', expected: 'Pay + Post' },
            { name: 'switcher', expected: 'Save for future payments' },
        ];

        testCases.forEach(testCase => {
            it(`should render successfully CreditCardForm with ${testCase.name}`, () => {
                (useGetCardBillingDetailsQuery as jest.Mock).mockReturnValue({
                    data,
                    isFetching: false,
                });
                render(
                    <StripeElements>
                        <CreditCardForm {...props}>
                            test children
                        </CreditCardForm>
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
                <CreditCardForm {...props}>test children</CreditCardForm>
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
                <CreditCardForm {...props}>test children</CreditCardForm>
            </StripeElements>,
        );
        const loader = baseElement.querySelectorAll('.loader');
        expect(loader).toHaveLength(3);
    });

    describe('Elements render CreditCardForm when card data empty', () => {
        const testCases = [
            { name: 'label', expected: 'Card Details' },
            { name: 'children element', expected: 'test children' },
            { name: 'pay button', expected: 'Pay + Post' },
            { name: 'switcher', expected: 'Save for future payments' },
        ];

        testCases.forEach(testCase => {
            it(`should render successfully CreditCardForm with ${testCase.name} when card data empty`, () => {
                (useGetCardBillingDetailsQuery as jest.Mock).mockReturnValue({
                    data: null,
                    isFetching: false,
                });
                render(
                    <StripeElements>
                        <CreditCardForm {...props}>
                            test children
                        </CreditCardForm>
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
                <CreditCardForm {...props}>test children</CreditCardForm>
            </StripeElements>,
        );
        const preloader = screen.getByTestId('preloader');
        const spinner = screen.getByTestId('spinner');
        expect(preloader).toBeInTheDocument();
        expect(spinner).toBeInTheDocument();
    });
});
