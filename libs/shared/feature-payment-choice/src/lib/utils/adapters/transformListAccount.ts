import { PaymentStatusNames } from '@breef/shared/constants';
import {
    ListAccountsType,
    TransformBanksResponseType,
    TransformCardsResponseType,
} from '@breef/shared/types';

export const transformListAccount = (
    listAccount:
        | TransformCardsResponseType[]
        | TransformBanksResponseType[]
        | undefined,
): ListAccountsType[] => {
    if (!listAccount) return [];

    const iconType = (type: string) => {
        switch (type) {
            case PaymentStatusNames.BANK_ACCOUNT ||
                PaymentStatusNames.FINANCIAL_CONNECTION:
                return 'bank';
            case PaymentStatusNames.CARD_EXIST || PaymentStatusNames.CARD_NEW:
                return 'card';
            default:
                return '';
        }
    };

    return listAccount.map(item => ({
        id: `${item.id}`,
        type: item.type,
        name: item.institutionName,
        number: item.last4,
        typeIcon: iconType(item.type),
        displayName: item.displayName,
        token: item.token,
        brand: item.brand,
        default: item.default,
        expiredDate: item.expiredDate,
    }));
};

export const getDefaultBankData = (
    bankList: ListAccountsType[],
): {
    id: string;
    token: string;
    paymentStatus: PaymentStatusNames;
} | null => {
    if (!bankList) return null;
    if (!bankList.length) return null;
    const defaultBank = bankList.find(bank => bank.default);
    if (!defaultBank) return null;

    return {
        id: defaultBank.id,
        token: defaultBank.token || defaultBank.id,
        paymentStatus: defaultBank.type as PaymentStatusNames,
    };
};

export const getDefaultCardData = (
    cardList: ListAccountsType[],
): {
    token: string;
    paymentStatus: PaymentStatusNames;
} | null => {
    if (!cardList) return null;
    if (!cardList.length) return null;

    return {
        token: cardList[0].token || cardList[0].id,
        paymentStatus: cardList[0].type as PaymentStatusNames,
    };
};
