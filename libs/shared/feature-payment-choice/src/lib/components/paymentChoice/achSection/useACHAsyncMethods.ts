import { AchView } from '../../../types/paymentDataTypes';
import { CustomStripeErrorType, stripeErrorHandler } from '@breef/shared/utils';
import { PaymentStatusNames } from '@breef/shared/constants';
import {
    useDeleteFCAccountMutation,
    useGetBanksQuery,
    useSetBankMutation,
    useSetDefaultBankMutation,
    useSetPayPaymentMutation,
} from '@breef/shared/data-access-payments';
import { AccountsType, useRouteControl } from '@breef/shared/hooks';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import {
    getDefaultBankData,
    transformListAccount,
} from '../../../utils/adapters/transformListAccount';

interface UseAchControlProps {
    setScreen: (screen: AchView) => void;
    setSelectedBank: ({
        token,
        paymentStatus,
    }: {
        id: string;
        token: string;
        paymentStatus: PaymentStatusNames;
    }) => void;
    isSelectedBank: boolean;
}

enum AchError {
    GET_BANKS = 'Something went wrong when getting banks',
    ADD_BANK = 'Something went wrong when adding bank account',
    PAY = 'Something went wrong when paying',
}

enum AchSuccess {
    ADD_BANK = 'Account added successfully',
}

export const removeMessages = {
    loading: 'Removing...',
    success: 'Bank Account has been removed successfully',
    error: 'An error happened when trying to remove the Bank Account',
};

export const useACHAsyncMethods = ({
    setScreen,
    setSelectedBank,
    isSelectedBank,
}: UseAchControlProps) => {
    const { router } = useRouteControl();
    const paymentId = (router.query as { paymentId?: number }).paymentId ?? -1;

    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<{
        amount: string;
        transaction: string;
        name?: string;
        last4: string;
    } | null>(null);

    const [setBank, { isLoading: isLoadingSetBank }] = useSetBankMutation();
    const [payPayment, { isLoading: isLoadingPay }] =
        useSetPayPaymentMutation();
    const [setDefaultBank, { isLoading: isLoadingSetDefaultBank }] =
        useSetDefaultBankMutation();

    const [
        removeFCAccount,
        {
            isLoading: isLoadingRemoveFCAccount,
            isSuccess: isSuccessRemoveFCAccount,
            isError: isErrorRemoveFCAccount,
        },
    ] = useDeleteFCAccountMutation();

    const {
        data: listBanks,
        isLoading: isLoadingGetBanks,
        isFetching: isFetchingGetBanks,
        isSuccess: isSuccessGetBanks,
        isError: isErrorGetBanks,
    } = useGetBanksQuery();

    useEffect(() => {
        if (isErrorGetBanks) {
            toast.error(AchError.GET_BANKS);
        }
    }, [isErrorGetBanks]);

    useEffect(() => {
        if (isSuccessGetBanks && !listBanks?.length) {
            return setScreen(AchView.PREVIEW);
        }

        const defaultBankData = getDefaultBankData(
            transformListAccount(listBanks),
        );
        if (!isSelectedBank && defaultBankData) {
            setSelectedBank(defaultBankData);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccessGetBanks, listBanks?.length]);

    const handleAddBank = async (accounts: AccountsType[]) => {
        try {
            await setBank({ accounts }).unwrap();
            toast.success(AchSuccess.ADD_BANK);
            return setScreen(AchView.LIST);
        } catch (errorBankAccount) {
            const errorBankAccountToken = errorBankAccount as {
                data: { token?: string[] }[];
            };
            if (errorBankAccountToken.data.some(bank => bank.token)) {
                return errorBankAccountToken.data.forEach((bank, key) => {
                    if (bank.token) {
                        const bankInfo = accounts[key];
                        const errorMessage = `${bankInfo.institutionName} •••• ${bankInfo.last4}: ${bank.token[0]}`;
                        toast.error(errorMessage, { toastId: errorMessage });
                    }
                });
            }
            stripeErrorHandler({
                error: errorBankAccount as CustomStripeErrorType,
                defaultErrorMessage: AchError.ADD_BANK,
            });
        }
    };

    const handlePay = async (bankData: {
        token: string;
        paymentStatus: PaymentStatusNames;
        defaultBank?: boolean;
    }) => {
        const { token, paymentStatus, defaultBank } = bankData;
        if (defaultBank) {
            try {
                await setDefaultBank({ token, paymentStatus }).unwrap();
            } catch (e) {
                const message = 'Setting a default bank account was failed.';
                toast.error(message, { toastId: message });
            }
        }
        try {
            const result = await payPayment({
                paymentId,
                token,
                paymentStatus,
            }).unwrap();
            setSuccess(result);
            return setScreen(AchView.SUCCESS);
        } catch (error) {
            stripeErrorHandler({
                error: error as CustomStripeErrorType,
                defaultErrorMessage: AchError.PAY,
                callbackFn: setError,
            });
            return setScreen(AchView.FAILURE);
        }
    };

    const listTransformedBanks = transformListAccount(listBanks);

    return {
        handlePay,
        handleAddBank,
        isLoadingSetBank,
        isLoadingPay: isLoadingPay || isLoadingSetDefaultBank,
        isLoadingGetBanks,
        isFetchingGetBanks,
        listBanks: listTransformedBanks,
        successScreenData: success,
        errorScreenData: error,
        removeActions: {
            removeFCAccount,
            isLoading: isLoadingRemoveFCAccount,
            isSuccess: isSuccessRemoveFCAccount,
            isError: isErrorRemoveFCAccount,
        },
    };
};
