import {
    CompanyPosition,
    Restrictions,
    restrictionsAgencyMembers,
    restrictionsClientMembers,
    restrictionsClientFinance,
    restrictionsAgencyFinance,
} from '@breef/shared/constants';
import { useGetSelfQuery } from '@breef/shared/data-access-auth';

export const useGetRestrictions = () => {
    const { data } = useGetSelfQuery(undefined, { refetchOnReconnect: true });

    const checkIsHaveRestriction = ({
        restriction,
    }: {
        restriction: Restrictions;
    }) => {
        if (data && data?.companyPosition === CompanyPosition.member) {
            switch (data?.companyType) {
                case 'client':
                    return !restrictionsClientMembers.some(
                        el => el === restriction,
                    );
                case 'agency':
                    return !restrictionsAgencyMembers.some(
                        el => el === restriction,
                    );
                default:
                    return true;
            }
        } else if (data && data?.companyPosition === CompanyPosition.finance) {
            switch (data?.companyType) {
                case 'client':
                    return !restrictionsClientFinance.some(
                        el => el === restriction,
                    );
                case 'agency':
                    return !restrictionsAgencyFinance.some(
                        el => el === restriction,
                    );
                default:
                    return true;
            }
        }

        return;
    };

    return { checkIsHaveRestriction };
};
