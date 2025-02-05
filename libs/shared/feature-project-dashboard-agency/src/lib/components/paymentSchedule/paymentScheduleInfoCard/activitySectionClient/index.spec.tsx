import { render } from '@testing-library/react';
import { PaymentStatusType } from '@breef/shared/types';
import { ActivitySectionClient } from './ActivitySectionClient';
import { PaymentScheduleTag } from '@breef/shared/constants';
import moment from 'moment';

const restPaymentProps = {
    scheduleType: 'milestone',
    deliverable: 'test deliverable',
    amount: 1000,
    teamTake: 750,
    id: 1,
    numberOfPayments: 1,
    invoiceCode: '111CP1',
};

const paymentDuePayment = {
    status: 'invoiceSent' as PaymentStatusType,
    tag: 'paymentDue' as PaymentScheduleTag,
    paymentDue: '04.04.2023',
    invoiceDate: '04.04.2023',
    ...restPaymentProps,
};

const invoiceSentPayment = {
    status: 'invoiceSent' as PaymentStatusType,
    tag: 'invoiceSent' as PaymentScheduleTag,
    paymentDue: moment().add(5, 'days').format(),
    invoiceDate: moment().add(-2, 'days').format(),
    ...restPaymentProps,
};

const awaitingPayment = {
    status: 'awaiting' as PaymentStatusType,
    tag: 'awaiting' as PaymentScheduleTag,
    paymentDue: moment().add(14, 'days').format(),
    invoiceDate: moment().add(7, 'days').format(),
    ...restPaymentProps,
};

const paidPayment = {
    status: 'paid' as PaymentStatusType,
    tag: 'paid' as PaymentScheduleTag,
    paymentDue: moment().add(-7, 'days').format(),
    invoiceDate: moment().add(-14, 'days').format(),
    ...restPaymentProps,
};

const props = {
    linkDownloadContract: 'https://example.com',
};
jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: {},
            asPath: '',
        };
    },
}));

describe('ActivitySectionClient', () => {
    it('should render with overdue payment successfully', () => {
        const { baseElement, getByText } = render(
            <ActivitySectionClient {...props} payments={[paymentDuePayment]} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('1 overdue payment')).toBeInTheDocument();
        expect(getByText('View overdue payments')).toBeInTheDocument();
    });
    it('should render with invoice sent payment successfully', () => {
        const { getByText } = render(
            <ActivitySectionClient
                {...props}
                payments={[invoiceSentPayment]}
            />,
        );
        expect(
            getByText(
                `Invoice is due on ${moment()
                    .add(5, 'days')
                    .format('MMM Do, YYYY')}`,
            ),
        ).toBeInTheDocument();
        expect(getByText('Make Payment')).toBeInTheDocument();
    });
    it('should render with awaiting payment successfully', () => {
        const { getByText, queryByTestId } = render(
            <ActivitySectionClient {...props} payments={[awaitingPayment]} />,
        );
        expect(
            getByText(
                `Invoice will be invoiced on ${moment()
                    .add(7, 'days')
                    .format('MMM Do, YYYY')}`,
            ),
        ).toBeInTheDocument();
        expect(queryByTestId('custom-button')).toBe(null);
    });
    it('should render with paid payment successfully', () => {
        const { getByText, queryByTestId } = render(
            <ActivitySectionClient {...props} payments={[paidPayment]} />,
        );
        expect(getByText('No future payments due')).toBeInTheDocument();
        expect(queryByTestId('custom-button')).toBe(null);
    });
});
