import { toast } from 'react-toastify';
import {
    useDeleteCardsMutation,
    useDeleteFCAccountMutation,
    useLazyGetBanksQuery,
    useLazyGetCardsQuery,
    useSetBankMutation,
    useSetCardsMutation,
} from '@breef/shared/data-access-payments';
import { CustomStripeErrorType, stripeErrorHandler } from '@breef/shared/utils';
import { PaymentsView } from '../../types/profileFormTypes';
import { AccountsType, useUpdateCardControl } from '@breef/shared/hooks';
import { PaymentStatusNames } from '@breef/shared/constants';

interface UsePaymentsMethodsControlProps {
    setView: (view: PaymentsView) => void;
    projectId: number;
}

enum Error {
    GET_LISTS = 'When loading a list of credit cards and bank accounts something went wrong',
    ADD_BANK = 'Something went wrong when adding bank account',
    ADD_CARD = 'Something went wrong when adding a card',
}

enum Success {
    ADD_BANK = 'Bank account added successfully',
    ADD_CARD = 'Card added successfully',
}

export const usePaymentsMethodsControl = ({
    setView,
    projectId,
}: UsePaymentsMethodsControlProps) => {
    const [getCardsList, { isFetching: isLoadingCards }] =
        useLazyGetCardsQuery();
    const [getBanksList, { isFetching: isLoadingBankAccounts }] =
        useLazyGetBanksQuery();
    const [setCard, { isLoading: isLoadingSetCard }] = useSetCardsMutation();
    const [setBank, { isLoading: isLoadingSetBank }] = useSetBankMutation();

    const [
        removeFCAccount,
        {
            isLoading: isLoadingRemoveFCAccount,
            isSuccess: isSuccessRemoveFCAccount,
            isError: isErrorRemoveFCAccount,
        },
    ] = useDeleteFCAccountMutation();

    const [
        removeCard,
        {
            isLoading: isLoadingRemoveCard,
            isSuccess: isSuccessRemoveCard,
            isError: isErrorRemoveCard,
        },
    ] = useDeleteCardsMutation();

    const getListAccounts = async () => {
        try {
            const cardsPayload = await getCardsList(undefined, true).unwrap();
            const banksPayload = await getBanksList(undefined, true).unwrap();
            if (cardsPayload.length || banksPayload.length) {
                return setView(PaymentsView.LIST);
            }
            return setView(PaymentsView.CHOICE);
        } catch (error) {
            stripeErrorHandler({
                error: error as CustomStripeErrorType,
                defaultErrorMessage: Error.GET_LISTS,
            });
        }
    };

    const handleAddCard = async (token: string, cardHolder: string) => {
        try {
            await setCard({ projectId, token, cardHolder }).unwrap();
            toast.success(Success.ADD_CARD);
            return setView(PaymentsView.LIST);
        } catch (error) {
            stripeErrorHandler({
                error: error as CustomStripeErrorType,
                defaultErrorMessage: Error.ADD_CARD,
            });
        }
    };

    const handleAddBank = async (accounts: AccountsType[]) => {
        try {
            await setBank({ accounts }).unwrap();
            toast.success(Success.ADD_BANK);
            return setView(PaymentsView.LIST);
        } catch (errorBankAccount) {
            stripeErrorHandler({
                error: errorBankAccount as CustomStripeErrorType,
                defaultErrorMessage: Error.ADD_BANK,
            });
        }
    };

    const handleRemoveAccount = async (type: string, id: string) => {
        if (
            type === PaymentStatusNames.FINANCIAL_CONNECTION ||
            type === PaymentStatusNames.BANK_ACCOUNT
        )
            return removeFCAccount(id);
        if (
            type === PaymentStatusNames.CARD_EXIST ||
            PaymentStatusNames.CARD_NEW
        )
            return removeCard(id);
        return;
    };

    const { isLoadingUpdateCard, handleUpdateCard } = useUpdateCardControl({
        callback: () => setView(PaymentsView.LIST),
    });

    return {
        handleAddCard,
        handleUpdateCard,
        handleAddBank,
        handleRemoveAccount,
        getListAccounts,
        isLoadingGet: isLoadingCards || isLoadingBankAccounts,
        isLoadingSet: isLoadingSetBank || isLoadingSetCard,
        isLoadingUpdate: isLoadingUpdateCard,
        removeActions: {
            isLoading: isLoadingRemoveCard || isLoadingRemoveFCAccount,
            isSuccess: isSuccessRemoveCard || isSuccessRemoveFCAccount,
            isError: isErrorRemoveCard || isErrorRemoveFCAccount,
        },
    };
};
