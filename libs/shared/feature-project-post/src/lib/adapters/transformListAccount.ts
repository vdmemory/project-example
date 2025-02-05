import { PaymentStatusNames } from '@breef/shared/constants';
import {
    ListAccountsType,
    ShortBillingAddress,
    TransformCardsResponseType,
} from '@breef/shared/types';

export const transformListAccount = (
    listAccount: TransformCardsResponseType[] | undefined,
): (ListAccountsType & { address: ShortBillingAddress })[] => {
    if (!listAccount) return [];

    return listAccount.map(item => ({
        id: `${item.id}`,
        type: item.type,
        name: item.institutionName,
        number: item.last4,
        typeIcon: 'card',
        displayName: item.displayName,
        token: item.token,
        brand: item.brand,
        default: item.default,
        expiredDate: item.expiredDate,
        address: item.address,
    }));
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
