import { CreditCardView } from '../../../types/paymentDataTypes';
import { CustomStripeErrorType, stripeErrorHandler } from '@breef/shared/utils';
import {
    useDeleteCardsMutation,
    useGetCardsQuery,
    useSetCardsMutation,
    useSetPayPaymentMutation,
} from '@breef/shared/data-access-payments';
import { useContext, useEffect, useState } from 'react';
import {
    getDefaultCardData,
    transformListAccount,
} from '../../../utils/adapters/transformListAccount';
import { toast } from 'react-toastify';
import { PaymentStatusNames } from '@breef/shared/constants';
import {
    useMediaContext,
    useRequiresActionStripe,
    useRouteControl,
    useUpdateCardControl,
} from '@breef/shared/hooks';

interface UseCreditCardControlProps {
    setScreen: (screen: CreditCardView) => void;
    setSelectedCard: ({
        token,
        paymentStatus,
    }: {
        token: string;
        paymentStatus: PaymentStatusNames;
    }) => void;
    isSelectedCard: boolean;
}

enum CardError {
    GET_BANKS = 'Something went wrong when getting cards',
    PAY = 'Something went wrong when paying',
}

export const removeMessages = {
    loading: 'Removing...',
    success: 'Credit Card has been removed successfully',
    error: 'An error happened when trying to remove the Credit Card',
};

export const useCreditCardAsyncMethods = ({
    setScreen,
    setSelectedCard,
    isSelectedCard,
}: UseCreditCardControlProps) => {
    const { queryParams } = useRouteControl();
    const paymentId = (queryParams as { paymentId?: number }).paymentId || -1;
    const projectId = (queryParams as { projectId?: number }).projectId || -1;

    const { isMaxMobile } = useMediaContext();
    const { handleAction, isLoadingAction } = useRequiresActionStripe();

    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<{
        amount: string;
        transaction: string;
        name?: string;
        last4?: string;
    } | null>(null);

    const [setCard, { isLoading: isLoadingSetCard }] = useSetCardsMutation();
    const [payPayment, { isLoading: isLoadingPay }] =
        useSetPayPaymentMutation();

    const [
        removeCard,
        {
            isLoading: isLoadingRemoveCard,
            isSuccess: isSuccessRemoveCard,
            isError: isErrorRemoveCard,
        },
    ] = useDeleteCardsMutation();

    const {
        data: listCards,
        isLoading: isLoadingGetCards,
        isFetching: isFetchingGetCards,
        isSuccess: isSuccessGetCards,
        isError: isErrorGetCards,
    } = useGetCardsQuery();

    useEffect(() => {
        if (isErrorGetCards) {
            toast.error(CardError.GET_BANKS);
        }
    }, [isErrorGetCards]);

    useEffect(() => {
        if (isSuccessGetCards && !listCards?.length && isMaxMobile) {
            return setScreen(CreditCardView.FORM);
        }

        if (isSuccessGetCards && !listCards?.length) {
            return setScreen(CreditCardView.PLACEHOLDER);
        }

        const defaultBankData = getDefaultCardData(
            transformListAccount(listCards),
        );
        if (!isSelectedCard && defaultBankData) {
            setSelectedCard(defaultBankData);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccessGetCards, listCards?.length, isMaxMobile]);

    const handlePay = async (
        token: string,
        paymentStatus: string,
        cardHolder: string,
        saveCard?: boolean,
    ) => {
        try {
            let result;
            if (saveCard) {
                const payload = await setCard({
                    projectId,
                    token,
                    cardHolder,
                }).unwrap();

                result = await payPayment({
                    token: payload.pm,
                    paymentId,
                    paymentStatus,
                }).unwrap();
            } else {
                result = await payPayment({
                    token,
                    paymentId,
                    paymentStatus,
                }).unwrap();
            }
            setSuccess(result);
            return setScreen(CreditCardView.SUCCESS);
        } catch (err) {
            const error = err as CustomStripeErrorType;

            if (
                error?.data?.status === 'requires_action' &&
                error.data.client_secret
            ) {
                return handleAction(error.data.client_secret);
            }

            stripeErrorHandler({
                error: error as CustomStripeErrorType,
                defaultErrorMessage: CardError.PAY,
                callbackFn: setError,
            });

            return setScreen(CreditCardView.FAILURE);
        }
    };

    const { isLoadingUpdateCard, handleUpdateCard } = useUpdateCardControl({
        callback: () => setScreen(CreditCardView.LIST),
    });

    const listTransformedCards = transformListAccount(listCards);

    return {
        handlePay,
        handleUpdateCard,
        isLoadingSetCard,
        isLoadingPay: isLoadingPay || isLoadingAction,
        isLoadingUpdateCard,
        listCards: listTransformedCards,
        isLoadingGetCards,
        isFetchingGetCards,
        isSuccessGetCards,
        successScreenData: success,
        errorScreenData: error,
        removeActions: {
            removeCard,
            isLoading: isLoadingRemoveCard,
            isSuccess: isSuccessRemoveCard,
            isError: isErrorRemoveCard,
        },
    };
};
