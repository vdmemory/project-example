import { PaymentStatusNames } from '@breef/shared/constants';
import {
    TransformBanksResponseType,
    TransformCardsResponseType,
    CompanyInfoMergedResponseType,
} from '@breef/shared/types';

import { ListAccountsType, ValueSelectType } from '../types/profileFormTypes';

export const replacementAccountList = (
    payload: TransformCardsResponseType[] | TransformBanksResponseType[],
): ListAccountsType[] => {
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

    return payload.map(item => {
        return {
            id: `${item.id}`,
            type: item.type,
            name: item.institutionName,
            number: item.last4,
            typeIcon: iconType(item.type),
            displayName: item.displayName,
            token: item.token,
            brand: item.brand,
        };
    });
};

export const replacementProfile = (
    payload: CompanyInfoMergedResponseType,
): ValueSelectType[] => {
    if (payload.servicesAndSkills) return payload.servicesAndSkills;
    return [];
};
