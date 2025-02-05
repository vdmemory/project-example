import { fireEvent, render } from '@testing-library/react';
import PaymentsMilestone from './PaymentsMilestone';
import { KickoffRequestType, PaymentActionType } from '@breef/shared/types';
import moment from 'moment';

const handleEditInvoice = jest.fn();
const props = {
    handleAddOrEditPayments: jest.fn(),
    handleEditInvoice,
    link: 'example.com',
    kickoffStatus: 'approved_by_breef' as KickoffRequestType['status'],
    paymentsMilestone: [
        {
            id: 1,
            type: 'milestone',
            invoiceDate: moment().format(),
            payBy: moment().format(),
            deliverable: 'Test Deliverable',
            amount: '1000',
            teamTake: '750',
        },
    ],
    actionType: 'add' as PaymentActionType,
    isAction: true,
};
describe('PaymentsMilestone', () => {
    it('should render successfully', () => {
        const { baseElement, getByText, queryByTestId } = render(
            <PaymentsMilestone {...props} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('+ ADD Payment')).toBeInTheDocument();
        expect(getByText('Test Deliverable')).toBeInTheDocument();
        expect(getByText('1000')).toBeInTheDocument();
        expect(getByText('750')).toBeInTheDocument();
        expect(getByText('milestone')).toBeInTheDocument();
        expect(queryByTestId('edit-cell-btn')).toBe(null);
    });
    it('should render without add payment if isAction prop is false successfully', () => {
        const { queryByText } = render(
            <PaymentsMilestone {...props} isAction={false} />,
        );
        expect(queryByText('+ ADD Payment')).toBe(null);
    });
    it('should render with action buttons in table rows if kickoffStatus prop not equal approved_by_breef', () => {
        const { getByTestId } = render(
            <PaymentsMilestone {...props} kickoffStatus="approved_by_client" />,
        );
        expect(getByTestId('edit-cell-btn')).toBeInTheDocument();
    });
    it('should call handleEditInvoice on button edit payment click', () => {
        const { getByTestId } = render(
            <PaymentsMilestone {...props} kickoffStatus="approved_by_client" />,
        );
        const buttonEdit = getByTestId('edit-cell-btn');
        fireEvent.click(buttonEdit);
        expect(handleEditInvoice).toBeCalled();
    });
});
