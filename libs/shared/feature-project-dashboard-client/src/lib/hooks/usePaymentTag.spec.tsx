import { renderHook } from '@testing-library/react';
import { usePaymentTag } from './usePaymentTag';
import { PaymentScheduleTag } from '@breef/shared/constants';
import { ColoredTag } from '@breef/shared/ui-components';

describe('usePaymentTag', () => {
    it('usePaymentTag should return correct tag', () => {
        const { result } = renderHook(() => usePaymentTag());
        expect(
            result.current.getPaymentTagComponent(PaymentScheduleTag.awaiting),
        ).toEqual(<ColoredTag tag="Awaiting" color="purple" />);
        expect(
            result.current.getPaymentTagComponent(
                PaymentScheduleTag.processing,
            ),
        ).toEqual(<ColoredTag tag="Processing" color="blue" />);
        expect(
            result.current.getPaymentTagComponent(PaymentScheduleTag.cancelled),
        ).toEqual(<ColoredTag tag="Cancelled" />);
        expect(
            result.current.getPaymentTagComponent(
                PaymentScheduleTag.invoice_sent,
            ),
        ).toEqual(<ColoredTag tag="Invoice Sent" color="orange" />);
        expect(
            result.current.getPaymentTagComponent(PaymentScheduleTag.paid),
        ).toEqual(<ColoredTag tag="Paid" color="green" />);
    });
});
