import { render } from '@testing-library/react';
import { PaymentsWrapper } from './PaymentsWrapper';

import {
    PaymentScheduleTag,
    PaymentScheduleTagRequest,
} from '@breef/shared/constants';
import { mockPaymentAccordionMobileButtons } from './paymentAccordion/PaymentAccordion.spec';
import { configTablePaymentsClientMobile } from '../../configTablePaymentsClient';

const props = {
    columns: configTablePaymentsClientMobile,
    rows: [
        {
            id: 1,
            invoiceCode: 'CP1',
            description: 'test description',
            status: PaymentScheduleTag[PaymentScheduleTagRequest.paymentDue],
            type: 'Retainer',
        },
    ],
    mobileViewButtons: [mockPaymentAccordionMobileButtons],
    isLoading: false,
    editableRow: null,
};

describe('PaymentsWrapper', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <PaymentsWrapper {...props} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('CP1')).toBeInTheDocument();
        expect(getByText('test description')).toBeInTheDocument();
    });

    it('should render loader if isLoading prop is ture', () => {
        const { getByText } = render(
            <PaymentsWrapper {...props} isLoading={true} />,
        );
        expect(getByText('Loading...')).toBeInTheDocument();
    });
});
