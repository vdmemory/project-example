import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
    ACCESS_TOKEN,
    BREEF_AGENCY_ONBOARDING_ROUTE,
    PROJECTS_ROUTE,
} from '@breef/shared/constants';
import { useSendClientOnboardingMutation } from '@breef/shared/data-access-onboarding';
import { useLazyGetSelfQuery } from '@breef/shared/data-access-auth';
import { getStorageData } from '@breef/shared/utils';

export const useGetStarted = (userType: string) => {
    const router = useRouter();
    const [getSelf] = useLazyGetSelfQuery();
    const [sendClientOnboarding, sendClientOnboardingRequest] =
        useSendClientOnboardingMutation();

    useEffect(() => {
        if (sendClientOnboardingRequest.isSuccess) {
            getSelf(undefined).then(res => {
                if (res.isSuccess) {
                    router.push(PROJECTS_ROUTE, undefined, {
                        shallow: true,
                    });
                }
            });
        }
        //eslint-disable-next-line
    }, [sendClientOnboardingRequest.isSuccess]);

    const handleGetStarted = () => {
        if (userType === 'client') {
            return sendClientOnboarding({});
        }
        return window.location.replace(
            BREEF_AGENCY_ONBOARDING_ROUTE.reverse({
                token: getStorageData('cookie', ACCESS_TOKEN),
            }) || '',
        );
    };

    return {
        isSubmittingGetStarted: sendClientOnboardingRequest.isLoading,
        handleGetStarted,
    };
};
