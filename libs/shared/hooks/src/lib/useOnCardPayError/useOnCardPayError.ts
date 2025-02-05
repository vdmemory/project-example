import { useElements, useStripe } from '@stripe/react-stripe-js';

interface UseOnPayErrorProps {
    onPayError: (message: string) => void;
    onSuccessCallbackFn: () => void;
}

// TODO: remove this hook
export const useOnCardPayError = ({
    onPayError,
    onSuccessCallbackFn,
}: UseOnPayErrorProps) => {
    const stripe = useStripe();
    const elements = useElements();

    const onCardPayErrorRequiresAction = async (
        secureKey: string,
        defaultErrorMessage: string,
    ) => {
        if (!stripe || !elements) {
            return;
        }
        const data = await stripe.confirmCardPayment(secureKey);
        if (data.error) {
            return onPayError(data.error.message || defaultErrorMessage);
        }
        onSuccessCallbackFn();
    };

    return { onCardPayErrorRequiresAction };
};
