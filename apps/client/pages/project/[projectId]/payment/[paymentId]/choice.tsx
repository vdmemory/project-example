import { AnimateLayoutPage, StripeElements } from '@breef/shared/ui-components';
import { PaymentChoice } from '@breef/shared/feature-payment-choice';
import { useEffect } from 'react';
import { withDynamicPathIds } from '../../../../../hoc/withDynamicPathIds';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/store';
import { useRouteControl } from '@breef/shared/hooks';
import { PROJECTS_ROUTE } from '@breef/shared/constants';

export function PaymentChoicePage() {
    const dispatch = useAppDispatch();
    const { isDisabledPayments } = useAppSelector(
        state => state.projectDetails,
    );
    const { changePage } = useRouteControl();

    useEffect(() => {
        if (!isDisabledPayments) return;
        changePage(PROJECTS_ROUTE);
    }, [isDisabledPayments]);

    useEffect(() => {
        const footer = document.querySelector('footer');
        if (footer) footer.style.display = 'none';
        return () => {
            if (footer) footer.style.display = 'flex';
        };
    }, [dispatch]);

    if (isDisabledPayments) return null;

    return (
        <AnimateLayoutPage headTitle="Payment Choice">
            <StripeElements>
                <PaymentChoice />
            </StripeElements>
        </AnimateLayoutPage>
    );
}

export default withDynamicPathIds(PaymentChoicePage, [
    'projectId',
    'paymentId',
]);
