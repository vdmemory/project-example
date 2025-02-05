import { CreateTokenCardData } from '@stripe/stripe-js/types/stripe-js';
import { toast } from 'react-toastify';
import { CustomStripeErrorType, stripeErrorHandler } from '@breef/shared/utils';
import { useUpdateCardBillingDetailsMutation } from '@breef/shared/data-access-payments';

interface UseUpdateCardControlProps {
    callback: () => void;
}
export const useUpdateCardControl = ({
    callback,
}: UseUpdateCardControlProps) => {
    const [updateCard, { isLoading: isLoadingUpdateCard }] =
        useUpdateCardBillingDetailsMutation();

    const handleUpdateCard = async (
        token: string,
        options: CreateTokenCardData,
    ) => {
        try {
            await updateCard({ cardToken: token, options }).unwrap();
            const message = 'Card updated successfully.';
            toast.success(message, { toastId: message });
            callback();
        } catch (error) {
            stripeErrorHandler({
                error: error as CustomStripeErrorType,
                defaultErrorMessage:
                    'Something went wrong when updating card billing details',
            });
        }
    };

    return {
        isLoadingUpdateCard,
        handleUpdateCard,
    };
};
