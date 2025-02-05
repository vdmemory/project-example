import { useRouteControl, useSaveDocument } from '@breef/shared/hooks';
import WireSection from './WireSection';
import { fireEvent, render, screen } from '@testing-library/react';
import {
    useGetWirePaymentQuery,
    useSetWirePaymentPayMutation,
} from '@breef/shared/data-access-payments';

jest.mock('@breef/shared/hooks', () => ({
    __esModule: true,
    ...jest.requireActual('@breef/shared/hooks'),
    useRouteControl: jest.fn(),
    useSaveDocument: jest.fn(),
}));

jest.mock('@breef/shared/data-access-payments', () => ({
    __esModule: true,
    ...jest.requireActual('@breef/shared/data-access-payments'),
    useGetWirePaymentQuery: jest.fn(),
    useSetWirePaymentPayMutation: jest.fn(),
}));

const wireData = {
    account: '890195333',
    bankName: 'Chase Bank',
    routing: '022000021',
    swift_code: 'CODE33',
};

const setWirePayment = jest.fn();
const setWirePaymentRequest = jest.fn(() =>
    Promise.resolve({
        isLoading: false,
    }),
);

beforeAll(() => {
    (useGetWirePaymentQuery as jest.Mock).mockReturnValue(() => [
        {
            data: wireData,
            isLoading: false,
            isError: false,
        },
    ]);

    (useSetWirePaymentPayMutation as jest.Mock).mockImplementation(() => [
        setWirePayment,
        setWirePaymentRequest,
    ]);
});

const changePage = jest.fn();

(useRouteControl as jest.Mock).mockImplementation(() => [changePage]);

const uploadDocument = jest.fn();

(useSaveDocument as jest.Mock).mockImplementation(() => ({
    uploadDocument,
}));

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: { paymentId: 123 },
            asPath: '',
        };
    },
}));

afterEach(() => {
    jest.clearAllMocks();
});

const onClick = jest.fn();
const props = {
    onClick: onClick,
    tabs: [
        {
            label: 'Payment wire',
            key: 'breef-wire',
        },
        {
            label: 'Payment pay',
            key: 'breef-pay',
        },
    ],
    paymentMethod: 'breef-wire',
    amount: 1000,
    setIsSuccessTag: jest.fn(),
    setDocument: jest.fn(),
    document: [],
};

describe('WireSection', () => {
    it('WireSection should render successfully', async () => {
        const { baseElement } = render(<WireSection {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('Make Payment')).toBeInTheDocument();
    });

    it('WireSection should render successfully with action change tab', () => {
        render(<WireSection {...props} />);

        const tab = screen.getAllByRole('button')[1];
        fireEvent.click(tab);
        expect(onClick).toBeCalled();
    });
});
