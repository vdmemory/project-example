import { fireEvent, render } from '@testing-library/react';
import PaymentScheduleHeader from './PaymentScheduleHeader';

const handleAddOrEditPayments = jest.fn();
const props = {
    title: 'test title',
    linkDownloadContract: 'https://example.com',
    paymentTerms: 7,
    handleAddOrEditPayments,
};
afterAll(() => {
    jest.clearAllMocks();
});
describe('PaymentScheduleHeader', () => {
    it('should render successfully with default props', () => {
        const { baseElement, getByText } = render(
            <PaymentScheduleHeader {...props} role="agency" />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('test title')).toBeInTheDocument();
        const btnAddNewPayments = getByText('+ Add New Payments');
        expect(btnAddNewPayments).toBeInTheDocument();
        fireEvent.click(btnAddNewPayments);
        expect(handleAddOrEditPayments).toBeCalledWith(false);
    });
    it('should render successfully with true isRetainerPayments property', () => {
        const { getByText } = render(
            <PaymentScheduleHeader {...props} role="agency" />,
        );
        const btnAddNewPayments = getByText('+ Add New Payments');
        fireEvent.click(btnAddNewPayments);
        expect(handleAddOrEditPayments).toBeCalledWith(false);
    });
    it('should render successfully with add action', () => {
        const { getByText } = render(
            <PaymentScheduleHeader
                {...props}
                role="agency"
                actionType="add"
                isKickoffView
            />,
        );
        const btnAdd = getByText('+ ADD Payment');
        expect(btnAdd).toBeInTheDocument();
        fireEvent.click(btnAdd);
        expect(handleAddOrEditPayments).toBeCalledWith(false);
    });
    it('should render successfully with addOrEdit actions', () => {
        const { getByText } = render(
            <PaymentScheduleHeader
                {...props}
                role="agency"
                actionType="addOrEdit"
                isKickoffView
            />,
        );
        const btnAdd = getByText('+ ADD Payment');
        const btnEdit = getByText('Edit retainer');
        expect(btnAdd).toBeInTheDocument();
        expect(btnEdit).toBeInTheDocument();
        fireEvent.click(btnAdd);
        expect(handleAddOrEditPayments).toBeCalledWith(false);
        fireEvent.click(btnEdit);
        expect(handleAddOrEditPayments).toBeCalledWith(true);
    });
    it('should render successfully with addWithOngoing action', () => {
        const { getByText } = render(
            <PaymentScheduleHeader
                {...props}
                role="agency"
                actionType="addWithOngoing"
                isKickoffView
            />,
        );
        const btnAdd = getByText('+ ADD Payment');
        expect(btnAdd).toBeInTheDocument();
        fireEvent.click(btnAdd);
        expect(handleAddOrEditPayments).toBeCalledWith(false);
    });
    it('should render successfully with onlyEditOngoing action', () => {
        const { getByText } = render(
            <PaymentScheduleHeader
                {...props}
                role="agency"
                actionType="onlyEditOngoing"
                isKickoffView
            />,
        );
        const btnEdit = getByText('Edit retainer');
        expect(btnEdit).toBeInTheDocument();
        fireEvent.click(btnEdit);
        expect(handleAddOrEditPayments).toBeCalledWith(true);
    });
    it('should render with client role successfully', () => {
        const { getByText } = render(
            <PaymentScheduleHeader {...props} role="client" />,
        );
        expect(getByText('Download Contracts')).toBeInTheDocument();
        expect(getByText('Payment Terms: NET 7')).toBeInTheDocument();
    });
});
