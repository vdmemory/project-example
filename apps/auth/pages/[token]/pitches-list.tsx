import {
    useLazyGetPublicPitchesListQuery,
    useLazyGetSharedProjectQuery,
} from '@breef/shared/data-access-project';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PageLoader, ReviewPitchesPublic } from '@breef/shared/ui-components';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useGetSelfQuery } from '@breef/shared/data-access-auth';
import { AppRoleType } from '@breef/shared/types';

const PublicPitchesList = () => {
    const router = useRouter();
    const {
        query: { token },
    } = router;
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [isClosingSharing, setIsClosingShared] = useState(false);
    const [fetchPublicPitchesList, { data: publicPitchesList }] =
        useLazyGetPublicPitchesListQuery();
    const [fetchSharedProject, { data: sharedProjectData }] =
        useLazyGetSharedProjectQuery();
    const { data: selfData, isLoading: isLoadingSelf } = useGetSelfQuery();

    const errorMessage = 'Company has closed access to the pitch information.';

    const fetchData = async () => {
        setIsLoadingPage(true);
        try {
            await Promise.all([
                fetchPublicPitchesList(token as string).unwrap(),
                fetchSharedProject({ token: token as string }).unwrap(),
            ]);
        } catch (err) {
            setIsClosingShared(true);
        } finally {
            setIsLoadingPage(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    if (isClosingSharing) {
        return <PageLoader errorMessage={errorMessage} />;
    }

    if (isLoadingPage || isLoadingSelf) {
        return <PageLoader />;
    }

    const agenciesList = publicPitchesList.map(item => ({
        token: item.token,
        name: item.companyName,
        logo: item.companyLogoUrl,
    }));

    return (
        <ReviewPitchesPublic
            agenciesList={agenciesList}
            projectData={sharedProjectData}
            companyType={selfData?.companyType as 'client' | 'agency'}
            companyId={selfData?.companyId}
        />
    );
};

export default PublicPitchesList;
