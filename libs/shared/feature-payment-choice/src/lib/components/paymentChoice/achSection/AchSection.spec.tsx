import {
    useDeleteFCAccountMutation,
    useLazyGetFCSessionSecretQuery,
    useSetBankMutation,
    useSetDefaultBankMutation,
    useSetPayPaymentMutation,
} from '@breef/shared/data-access-payments';
import { fireEvent, render } from '@testing-library/react';
import AchSection from './AchSection';

const props = {
    amount: 200,
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

const renderElement = () => {
    const methods = render(<AchSection {...props} />);
    return { ...methods };
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

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

jest.mock('@breef/shared/data-access-payments', () => ({
    __esModule: true,
    ...jest.requireActual('@breef/shared/data-access-payments'),
    useGetBanksQuery: () => ({
        data: null,
        isLoading: false,
    }),
    useSetBankMutation: jest.fn(),
    useSetPayPaymentMutation: jest.fn(),
    useLazyGetFCSessionSecretQuery: jest.fn(),
    useSetDefaultBankMutation: jest.fn(),
    useDeleteFCAccountMutation: jest.fn(),
}));

(useDeleteFCAccountMutation as jest.Mock).mockImplementation(() => [
    removeFCAccount,
    removeFCAccountRequest,
]);

const removeFCAccount = jest.fn();
const removeFCAccountRequest = jest.fn(() =>
    Promise.resolve({
        isLoading: false,
        isSuccess: true,
        isError: false,
    }),
);

(useSetDefaultBankMutation as jest.Mock).mockImplementation(() => [
    setDefaultBank,
    setDefaultBankRequest,
]);

const setDefaultBank = jest.fn();
const setDefaultBankRequest = jest.fn(() =>
    Promise.resolve({
        isLoading: false,
    }),
);

(useSetBankMutation as jest.Mock).mockImplementation(() => [
    setBank,
    setBankRequest,
]);

const setBank = jest.fn();
const setBankRequest = jest.fn(() =>
    Promise.resolve({
        isLoading: false,
    }),
);

(useSetPayPaymentMutation as jest.Mock).mockImplementation(() => [
    payPayment,
    payPaymentRequest,
]);

const payPayment = jest.fn();
const payPaymentRequest = jest.fn(() =>
    Promise.resolve({
        isLoading: false,
    }),
);

(useLazyGetFCSessionSecretQuery as jest.Mock).mockImplementation(() => [
    getFCSessionSecret,
    getFCSessionSecretRequest,
]);

const getFCSessionSecret = jest.fn();
const getFCSessionSecretRequest = jest.fn(() =>
    Promise.resolve({
        isLoading: false,
    }),
);

jest.mock('@stripe/react-stripe-js', () => ({
    useStripe: jest.fn(),
    useElements: jest.fn(),
}));

describe('AchSection', () => {
    it('should render successfully', () => {
        const { baseElement } = renderElement();
        expect(baseElement).toBeTruthy();
    });
    describe('AchSection section texts', () => {
        const testCases = [
            { expected: 'Make Payment' },
            { expected: 'select a payment method' },
            { expected: 'Tab Name' },
            { expected: 'saved account' },
            { expected: 'Save selection as default account' },
            { expected: 'PAY $200.00' },
        ];

        testCases.forEach((testCase, i) => {
            it(`should render successfully text ${i + 1}`, async () => {
                const { getByText } = renderElement();
                expect(getByText(testCase.expected)).toBeTruthy();
            });
        });
    });

    it('should render successfully isHideTabs props', () => {
        const { getByText } = render(
            <AchSection {...props} isHideTabs={true} />,
        );
        expect(getByText('Payment total')).toBeTruthy();
        expect(getByText('$200')).toBeTruthy();
    });
});
