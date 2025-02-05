import { fireEvent, render } from '@testing-library/react';
import PaymentChoice from './PaymentChoice';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import {
    apiPayments,
    useLazyDownloadInvoiceDocumentQuery,
    useSetBankMutation,
    useSetCardsMutation,
    useSetPayPaymentMutation,
    useSetWirePaymentPayMutation,
} from '@breef/shared/data-access-payments';

const mockConfiguredStore = configureStore({
    reducer: {
        [apiPayments.reducerPath]: apiPayments.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiPayments.middleware),
});

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

jest.mock('@breef/shared/data-access-payments', () => ({
    __esModule: true,
    ...jest.requireActual('@breef/shared/data-access-payments'),
    useGetSelfQuery: () => ({
        data: {
            id: 1,
            email: 'email@gmail.com',
            firstName: 'first',
            lastName: 'last',
            companyType: 'client',
            isOnboardingComplete: true,
            companyPosition: 'owner',
            timeZone: 'Kiev',
            hasSocialAccount: false,
            dateJoined: '13.12.23',
            companyName: 'Company Name',
        },
        isLoading: false,
        isSuccess: true,
    }),
    useGetPaymentInfoQuery: () => ({
        data: {
            id: '1',
            invoiceCode: 'invoice_code',
            deliverable: 'deliverable',
            amount: '200',
            teamTake: '50',
            invoiceDate: '13/12/23',
            scheduleType: 'card',
            paymentDue: 'payment_due',
            status: 'status',
            tag: { title: 'tag', sentiment: 'primary' },
            projectName: 'project name',
            agencyCompanyName: 'agency company name',
            agencyLogoUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG23nGg2_a8b1c-DejPxyjL65FsmBcfjabMg&usqp=CAU',
        },
        isLoading: false,
        isFetching: false,
        isSuccess: true,
        isError: false,
    }),
    useGetBanksQuery: () => ({
        data: null,
        isLoading: false,
    }),
    useGetCardsQuery: () => ({
        data: null,
        isLoading: false,
    }),
    useGetWirePaymentQuery: () => ({
        data: null,
        isLoading: false,
    }),

    useSetBankMutation: jest.fn(),
    useSetCardsMutation: jest.fn(),
    useSetPayPaymentMutation: jest.fn(),
    useSetWirePaymentPayMutation: jest.fn(),
    useLazyDownloadInvoiceDocumentQuery: jest.fn(),
}));

(useLazyDownloadInvoiceDocumentQuery as jest.Mock).mockImplementation(() => [
    download,
    downloadRequest,
]);

const download = jest.fn();
const downloadRequest = jest.fn(() =>
    Promise.resolve({
        isLoading: false,
        isFetching: false,
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

(useSetCardsMutation as jest.Mock).mockImplementation(() => [
    setCards,
    setCardsRequest,
]);

const setCards = jest.fn();
const setCardsRequest = jest.fn(() =>
    Promise.resolve({
        isLoading: false,
    }),
);

(useSetWirePaymentPayMutation as jest.Mock).mockImplementation(() => [
    setWirePayment,
    setWirePaymentRequest,
]);

const setWirePayment = jest.fn();
const setWirePaymentRequest = jest.fn(() =>
    Promise.resolve({
        isLoading: false,
    }),
);

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
jest.mock('react-use-intercom');
jest.mock('@stripe/react-stripe-js', () => ({
    useStripe: jest.fn(),
    useElements: jest.fn(),
}));

const renderElement = () => {
    const methods = render(
        <Provider store={mockConfiguredStore}>
            <PaymentChoice />
        </Provider>,
    );
    return { ...methods };
};
describe('PaymentChoice Component', () => {
    it('should render successfully', () => {
        const { baseElement, getByTestId } = renderElement();
        expect(baseElement).toBeTruthy();
    });
});
