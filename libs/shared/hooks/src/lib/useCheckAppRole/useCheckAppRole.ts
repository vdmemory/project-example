import { AppRoleType } from '@breef/shared/types';
import { useEffect, useState } from 'react';
import { redirectToAppByUserType } from '@breef/shared/utils';
import { useLazyGetSelfQuery } from '@breef/shared/data-access-auth';

interface UseCheckAppRoleProps {
    userType: AppRoleType;
}
export const useCheckAppRole = ({ userType }: UseCheckAppRoleProps) => {
    const [getSelf, { data, isError }] = useLazyGetSelfQuery();
    const isAnotherUserType = data && data.companyType !== userType;
    const [isLoading, setIsLoading] = useState(true);

    const getSelfData = async () => {
        try {
            setIsLoading(true);
            const data = await getSelf().unwrap();
            if (data.companyType !== userType) {
                redirectToAppByUserType(data.companyType);
            } else {
                setIsLoading(false);
            }
        } catch (e) {
            console.error(e);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getSelfData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        isLoading,
        isError,
        isAnotherUserType,
        userData: data,
    };
};
