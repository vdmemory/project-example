import { useStripe } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { FinancialConnectionsSession } from '@stripe/stripe-js/types/api/financial-connections';
import { useEffect, useState } from 'react';
import { useLazyGetFCSessionSecretQuery } from '@breef/shared/data-access-payments';
import { CustomStripeErrorType, stripeErrorHandler } from '@breef/shared/utils';

export type AccountsType = {
    FCAToken: string;
    displayName: string;
    institutionName: string;
    last4: string | null;
    status?: 'active' | 'inactive' | 'disconnected';
};

export const useCollectStripeFCA = (
    callback?: (accounts: AccountsType[]) => void,
) => {
    const stripe = useStripe();
    const [accounts, setAccounts] = useState<AccountsType[]>([]);
    const [isLoadingFCSession, setIsLoadingFCSession] = useState(false);

    const transformAccounts = (
        accounts: FinancialConnectionsSession.Account[],
    ) => {
        const results = accounts.map(account => {
            if (!account.last4) {
                toast.error(
                    `There was an error getting the last 4 digits of the account (
                        ${account.display_name} - ${account.institution_name}
                    )`,
                );
                return null;
            }

            return {
                FCAToken: account.id,
                displayName: account.display_name,
                institutionName: account.institution_name,
                last4: account.last4,
                status: account.status,
            };
        });

        return results.filter(Boolean) as AccountsType[];
    };

    const ERROR_MESSAGE_FC_SESSION =
        'There was an error getting a Financial Connections Session Secret';

    const [getFCSession] = useLazyGetFCSessionSecretQuery();

    const collect = async () => {
        if (!stripe) return;
        setIsLoadingFCSession(true);

        try {
            const session = await getFCSession().unwrap();
            const result = await stripe.collectFinancialConnectionsAccounts({
                clientSecret: session.FCSessionSecret,
            });

            if (result?.error) {
                toast.error(result?.error?.message?.toString() || '');
            }
            if (result?.financialConnectionsSession?.accounts.length === 0) {
                return;
            }

            const accounts = transformAccounts(
                result?.financialConnectionsSession?.accounts || [],
            );
            setAccounts(accounts);
        } catch (error) {
            stripeErrorHandler({
                error: error as CustomStripeErrorType,
                defaultErrorMessage: ERROR_MESSAGE_FC_SESSION,
            });
        } finally {
            setIsLoadingFCSession(false);
        }
    };

    useEffect(() => {
        if (!accounts.length) return;
        if (!callback) return;
        callback(accounts);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accounts]);

    return {
        collect,
        isLoadingFCSession,
        accounts,
    };
};
