import { render } from '@testing-library/react';
import { PaymentsActivity } from './PaymentsActivity';

describe('PaymentsActivity', () => {
    it('should render successfully with 1 payment code', () => {
        const { baseElement, getByText } = render(
            <PaymentsActivity date="today" paymentCodes={['111CP1']} />,
        );
        expect(baseElement).toBeTruthy();
        expect(
            getByText('Payment will be invoiced on today'),
        ).toBeInTheDocument();
        expect(getByText('111CP1')).toBeInTheDocument();
    });
    it('should render successfully with 2 payment codes', () => {
        const { getByText } = render(
            <PaymentsActivity
                date="today"
                paymentCodes={['111CP1', '222CP2']}
            />,
        );
        expect(
            getByText('Payments and will be invoiced on today'),
        ).toBeInTheDocument();
        expect(getByText('111CP1')).toBeInTheDocument();
        expect(getByText('222CP2')).toBeInTheDocument();
    });
    it('should render successfully with 3 and more payment codes', () => {
        const { getByText } = render(
            <PaymentsActivity
                date="today"
                paymentCodes={['111CP1', '222CP2', '333CP3']}
            />,
        );
        expect(
            getByText('Payments , and will be invoiced on today'),
        ).toBeInTheDocument();
        expect(getByText('111CP1')).toBeInTheDocument();
        expect(getByText('222CP2')).toBeInTheDocument();
        expect(getByText('333CP3')).toBeInTheDocument();
    });
    it('should render plug if no payment codes successfully', () => {
        const { getByText } = render(
            <PaymentsActivity date="today" paymentCodes={[]} />,
        );
        expect(getByText('No Activity')).toBeInTheDocument();
    });
});
