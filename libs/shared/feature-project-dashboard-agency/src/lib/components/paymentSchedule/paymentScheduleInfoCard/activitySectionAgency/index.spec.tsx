import { render } from '@testing-library/react';
import { ActivitySectionAgency } from './ActivitySectionAgency';
import { PaymentStatusType } from '@breef/shared/types';
import { PaymentScheduleTag } from '@breef/shared/constants';
import moment from 'moment';

const props = {
    payments: [
        {
            status: 'awaiting' as PaymentStatusType,
            tag: 'awaiting' as PaymentScheduleTag,
            scheduleType: 'milestone',
            deliverable: 'test deliverable',
            paymentDue: moment().add(6, 'days').format(),
            invoiceDate: moment().add(6, 'days').format(),
            amount: 1000,
            teamTake: 750,
            id: 1,
            numberOfPayments: 1,
            invoiceCode: '111CP1',
        },
    ],
    linkDownloadContract: 'https://example.com',
};
describe('ActivitySectionAgency', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <ActivitySectionAgency {...props} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('Payment Terms: NET 0')).toBeInTheDocument();
        expect(getByText('111CP1')).toBeInTheDocument();
    });
    it('should render successfully with diff in 5 days between paymentDue and invoiceDate', () => {
        const { getByText } = render(
            <ActivitySectionAgency
                {...{
                    ...props,
                    payments: [
                        {
                            ...props.payments[0],
                            paymentDue: moment().add(12, 'days').format(),
                        },
                    ],
                }}
            />,
        );
        expect(getByText('Payment Terms: NET 6')).toBeInTheDocument();
    });
});
