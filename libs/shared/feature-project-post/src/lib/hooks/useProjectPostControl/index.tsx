import { PaymentStatusNames } from '@breef/shared/constants';
import { CustomStripeErrorType, stripeErrorHandler } from '@breef/shared/utils';
import {
    useDeleteCardsMutation,
    useGetCardsQuery,
    usePostProjectMutation,
    useSetCardsMutation,
} from '@breef/shared/data-access-payments';
import { useProjectPostSelector } from '../../store/hooks';
import {
    getDefaultCardData,
    transformListAccount,
} from '../../adapters/transformListAccount';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CardScreen } from '../../types/projectInfoTypes';
import { useRouter } from 'next/router';
import {
    useMediaContext,
    useRequiresActionStripe,
    useUpdateCardControl,
} from '@breef/shared/hooks';

interface UseProjectPostControlProps {
    setScreen: (screen: CardScreen | null) => void;
    handleBack: () => void;
    setSelectedCard: ({
        token,
        paymentStatus,
    }: {
        token: string;
        paymentStatus: PaymentStatusNames;
    }) => void;
    isSelectedCard: boolean;
    terms?: boolean;
}

enum CardError {
    GET_CARDS = 'Something went wrong when getting cards',
    PAY = 'It looks like there was an issue with the payment information provided. Please double check and try again.',
}

export const removeMessages = {
    loading: 'Removing...',
    success: 'Credit Card has been removed successfully',
    error: 'An error happened when trying to remove the Credit Card',
};

export const useProjectPostControl = ({
    setScreen,
    handleBack,
    setSelectedCard,
    isSelectedCard,
    terms,
}: UseProjectPostControlProps) => {
    const router = useRouter();
    const projectId = (router.query as { projectId?: number }).projectId || -1;

    const { isMaxMobile } = useMediaContext();
    const { handleAction, isLoadingAction } = useRequiresActionStripe();

    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<{
        amount: string;
        transaction: string;
        name?: string;
        last4?: string;
    } | null>(null);

    const [postProject, { isLoading: isLoadingPost }] =
        usePostProjectMutation();
    const [setCard, { isLoading: isLoadingSetCard }] = useSetCardsMutation();

    const [
        removeCard,
        {
            isLoading: isLoadingRemoveCard,
            isSuccess: isSuccessRemoveCard,
            isError: isErrorRemoveCard,
        },
    ] = useDeleteCardsMutation();

    const { projectPost } = useProjectPostSelector(state => state);
    const {
        couponInfo: { code },
    } = projectPost;

    const {
        data: listCards,
        isLoading: isLoadingGetCards,
        isFetching: isFetchingGetCards,
        isSuccess: isSuccessGetCards,
        isError: isErrorGetCards,
    } = useGetCardsQuery();

    useEffect(() => {
        if (isErrorGetCards) {
            toast.error(CardError.GET_CARDS);
        }
    }, [isErrorGetCards]);

    useEffect(() => {
        const defaultCardData = getDefaultCardData(
            transformListAccount(listCards),
        );

        if (!isSelectedCard && defaultCardData) {
            setSelectedCard(defaultCardData);
        }

        if (isSuccessGetCards && !listCards?.length && !isMaxMobile) {
            return setScreen(CardScreen.FORM);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccessGetCards, listCards?.length, isMaxMobile]);

    const handlePostProject = async (
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

                result = await postProject({
                    token: payload.pm,
                    projectId,
                    paymentStatus,
                    code: code || '',
                    acceptedTerms: terms,
                }).unwrap();
            } else {
                result = await postProject({
                    token,
                    projectId,
                    paymentStatus,
                    code: code || '',
                    acceptedTerms: terms,
                }).unwrap();
            }

            setSuccess(result);
            return setScreen(CardScreen.SUCCESS);
        } catch (err) {
            const error = err as CustomStripeErrorType;

            if (
                error?.data?.status === 'requires_action' &&
                error.data.client_secret
            ) {
                return handleAction(error.data.client_secret);
            }

            stripeErrorHandler({
                error,
                defaultErrorMessage: CardError.PAY,
                callbackFn: setError,
            });

            return setScreen(CardScreen.FAILURE);
        }
    };

    const { isLoadingUpdateCard, handleUpdateCard } = useUpdateCardControl({
        callback: handleBack,
    });

    const listTransformedCards = transformListAccount(listCards);

    return {
        handlePostProject,
        isLoadingPost: isLoadingPost || isLoadingAction,
        handleUpdateCard,
        isLoadingUpdateCard,
        isLoadingSetCard,
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
