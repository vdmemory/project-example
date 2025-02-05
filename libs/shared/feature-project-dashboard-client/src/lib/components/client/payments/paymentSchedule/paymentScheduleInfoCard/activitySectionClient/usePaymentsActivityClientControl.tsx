import { Button, Tooltip } from '@breef/shared/ui-components';
import { WarningTipIcon } from '@breef/shared/assets';
import { FullPaymentScheduleAgency } from '@breef/shared/types';
import { useConcatPaymentCodes } from '../../../../../../hooks/useConcatPaymentCodes';
import moment from 'moment';
import { useRouter } from 'next/router';
import { PROJECT_PAYMENT_CHOICE_ROUTE } from '@breef/shared/constants';
import { useNearestAwaitingPaymentsInSameDay } from '../../../../../../hooks/useNearestAwaitingPaymentsInSameDay';
import { useOverduePayments } from '../../../../../../hooks/useOverduePayments';
import { useNearestDuePaymentsInSameDay } from '../../../../../../hooks/useNearestDuePaymentsInSameDay';

interface UsePaymentsActivityClientControlProps {
    payments: FullPaymentScheduleAgency[];
}

export const usePaymentsActivityClientControl = ({
    payments,
}: UsePaymentsActivityClientControlProps) => {
    const router = useRouter();
    const { projectId } = router.query as { projectId?: string };
    const concatPaymentCodes = useConcatPaymentCodes();

    const { overduePayments } = useOverduePayments(payments);
    const { nearestDuePayment, nearestDuePaymentsInSameDayCodes } =
        useNearestDuePaymentsInSameDay(payments);
    const { nearestAwaitingPayment, nearestAwaitingPaymentsInSameDayCodes } =
        useNearestAwaitingPaymentsInSameDay(payments);

    const onClickViewOverduePayments = () => {
        const firstOverduePaymentRef = document.getElementById(
            `table-row-${overduePayments[0]?.id || 0}`,
        );
        if (firstOverduePaymentRef) {
            window.scrollTo(
                0,
                (firstOverduePaymentRef?.getBoundingClientRect().top || 0) -
                    document.body.getBoundingClientRect().top -
                    90,
            );
        }
    };
    const onClickMakePayment = (paymentId: number | string) => {
        router.push(
            PROJECT_PAYMENT_CHOICE_ROUTE.reverse({
                projectId: projectId,
                paymentId: paymentId,
            }) || '',
            undefined,
            { shallow: true },
        );
    };

    if (overduePayments.length > 0) {
        const isMoreThenOnPayments = overduePayments.length > 1;
        return {
            activity: (
                <>
                    You have&nbsp;
                    <span className="accent-color">
                        {overduePayments.length} overdue payment
                        {isMoreThenOnPayments && 's'}
                    </span>
                    <Tooltip
                        placement="top"
                        className="tooltip"
                        label={`Please complete payment${
                            isMoreThenOnPayments ? 's' : ''
                        }`}
                    >
                        <WarningTipIcon />
                    </Tooltip>
                </>
            ),
            button: (
                <Button
                    title="View overdue payments"
                    onClick={onClickViewOverduePayments}
                    className="small"
                    arrowRight
                />
            ),
        };
    }
    if (nearestDuePaymentsInSameDayCodes.length > 0) {
        const isMoreThenOnPayments =
            nearestDuePaymentsInSameDayCodes.length > 1;
        return {
            activity: (
                <>
                    Invoice{isMoreThenOnPayments ? 's' : ''}&nbsp;
                    {concatPaymentCodes(nearestDuePaymentsInSameDayCodes)}&nbsp;
                    {isMoreThenOnPayments ? 'are' : 'is'} due on{' '}
                    {moment(nearestDuePayment?.paymentDue).format(
                        'MMM Do, YYYY',
                    )}
                </>
            ),
            button: (
                <Button
                    title="Make Payment"
                    onClick={() =>
                        onClickMakePayment(nearestDuePayment?.id || 0)
                    }
                    className="small"
                    arrowRight
                />
            ),
        };
    }
    if (nearestAwaitingPaymentsInSameDayCodes.length > 0) {
        const isMoreThenOnPayments =
            nearestAwaitingPaymentsInSameDayCodes.length > 1;
        return {
            activity: (
                <>
                    Invoice{isMoreThenOnPayments ? 's' : ''}&nbsp;
                    {concatPaymentCodes(
                        nearestAwaitingPaymentsInSameDayCodes,
                    )}{' '}
                    will be invoiced on{' '}
                    {moment(nearestAwaitingPayment?.invoiceDate).format(
                        'MMM Do, YYYY',
                    )}
                </>
            ),
        };
    }
    return {
        activity: 'No future payments due',
    };
};
