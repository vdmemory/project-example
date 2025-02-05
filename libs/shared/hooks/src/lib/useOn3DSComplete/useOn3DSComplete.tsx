import { useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useRouteControl } from '../useRouteControl/useRouteControl';

export const useOn3DSComplete = (
    clientSecret: string,
    successAction: () => void,
    failureAction: () => void,
) => {
    const stripe = useStripe();
    const [isLoading3DSComplete, setIsLoading3DSComplete] = useState(false);
    const [success, setSuccess] = useState<{
        amount: string;
        transaction: string;
    } | null>(null);
    const { clearHistoryQueryParams } = useRouteControl();

    useEffect(() => {
        if (!clientSecret) return;
        if (!stripe) return;
        on3DSComplete();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientSecret, stripe]);

    const on3DSComplete = async () => {
        if (!stripe) return;

        setIsLoading3DSComplete(true);

        // Check the PaymentIntent
        const { error, paymentIntent } = await stripe.retrievePaymentIntent(
            clientSecret,
        );

        clearHistoryQueryParams();

        if (error) {
            // PaymentIntent client secret was invalid
            console.log('error - ', error);
            setIsLoading3DSComplete(false);
        } else {
            // Actions handled, show success message
            setIsLoading3DSComplete(false);
            if (paymentIntent.status === 'succeeded') {
                // Show your customer that the payment has succeeded
                setSuccess({
                    amount: paymentIntent.amount / 100 + '',
                    transaction: paymentIntent.id,
                });
                return successAction();
            } else if (paymentIntent.status === 'requires_payment_method') {
                return failureAction();
            }
        }
    };

    return { on3DSComplete, isLoading3DSComplete, successData: success };
};
