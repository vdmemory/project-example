import { render } from '@testing-library/react';
import { PaymentStatusType } from '@breef/shared/types';
import PaymentScheduleInfoCard from './PaymentScheduleInfoCard';
import moment from 'moment';
import { PaymentScheduleTag } from '@breef/shared/constants';

const props = {
    payments: [
        {
            status: 'awaiting' as PaymentStatusType,
            tag: 'awaiting' as PaymentScheduleTag,
            scheduleType: 'milestone',
            deliverable: 'test deliverable',
            paymentDue: moment().add(1, 'month').add(5, 'days').format(),
            invoiceDate: moment().add(1, 'month').format(),
            amount: 1000,
            teamTake: 750,
            id: 2,
            numberOfPayments: 1,
            invoiceCode: '222CP2',
        },
        {
            status: 'invoiceSent' as PaymentStatusType,
            tag: 'paymentDue' as PaymentScheduleTag,
            scheduleType: 'milestone',
            deliverable: 'test deliverable',
            paymentDue: moment().add(-1, 'week').add(-5, 'days').format(),
            invoiceDate: moment().add(-1, 'week').format(),
            amount: 1000,
            teamTake: 750,
            id: 3,
            numberOfPayments: 1,
            invoiceCode: '333CP3',
        },
        {
            status: 'paid' as PaymentStatusType,
            tag: 'paid' as PaymentScheduleTag,
            scheduleType: 'milestone',
            deliverable: 'test deliverable',
            paymentDue: '04.06.2023',
            invoiceDate: '04.06.2023',
            amount: 1000,
            teamTake: 750,
            id: 1,
            numberOfPayments: 1,
            invoiceCode: '111CP1',
        },
    ],
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
describe('PaymentScheduleInfoCard', () => {
    it('should render successfully for agency', () => {
        const { baseElement, getByText } = render(
            <PaymentScheduleInfoCard {...props} userType="agency" />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('222CP2')).toBeInTheDocument();
        expect(getByText('$1,000.00')).toBeInTheDocument();
        expect(getByText('$3,000.00')).toBeInTheDocument();
        expect(getByText('$750.00')).toBeInTheDocument();
    });
    it('should render successfully for client userType', () => {
        const { queryByText, getByText } = render(
            <PaymentScheduleInfoCard {...props} userType="client" />,
        );
        expect(getByText('$1,000.00')).toBeInTheDocument();
        expect(getByText('$3,000.00')).toBeInTheDocument();
        expect(getByText('1 overdue payment'));
        expect(queryByText('$750.00')).toBe(null);
    });
});
