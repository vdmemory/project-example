import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PitchesMakeIntroClient } from '@breef/shared/feature-project-dashboard-client';
import {
    useLazyGetAgenciesSchedulesListQuery,
    useLazyGetProjectByIdQuery,
} from '@breef/shared/data-access-project';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
    ExpandedNavigation,
    NavControl,
    PageLoader,
} from '@breef/shared/ui-components';
import {
    CLIENT_PITCHES_REVIEW_ROUTER,
    PROJECTS_ROUTE,
} from '@breef/shared/constants';
import { useGetCompanyInfoQuery } from '@breef/shared/data-access-profile';
import { css, Global } from '@emotion/react';
import { mediaScreen } from '@breef/shared/assets/variables';
import { colors } from '@breef/ui-kit';
import { withDynamicPathIds } from '../../../../hoc/withDynamicPathIds';
import Link from 'next/link';
import { BreefLogo } from '@breef/shared/assets';
import { useMediaContext } from '@breef/shared/hooks';

const globalStyles = css`
    .nav-control {
        .expanded-navigation-title h1 {
            font-size: 24px !important;
        }

        @media (${mediaScreen.tablet}) {
            background-color: ${colors.beige} !important;
            height: 74px !important;
            border-bottom: none !important;
        }
    }
`;

function PitchesMakeIntroPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchDataPitchesMakeIntro, { data: agencies }] =
        useLazyGetAgenciesSchedulesListQuery();

    const router = useRouter();
    const {
        query: { projectId },
    } = router;
    const { isMobile } = useMediaContext();

    const [getProjectById, { data: projectData }] =
        useLazyGetProjectByIdQuery();
    const companyInfoData = useGetCompanyInfoQuery({ companyType: 'client' });

    const fetchData = async (id: string | string[]) => {
        try {
            setIsLoading(true);
            const [resultPitches] = await Promise.all([
                fetchDataPitchesMakeIntro(id as string).unwrap(),
                getProjectById(Number(projectId)).unwrap(),
            ]);

            if (!resultPitches || resultPitches.length === 0) {
                await router.push(PROJECTS_ROUTE);
            }
        } catch (error) {
            await router.push(PROJECTS_ROUTE);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(projectId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectId]);

    const handleBack = () => {
        router.push(
            `${CLIENT_PITCHES_REVIEW_ROUTER.reverse({
                projectId: String(projectId),
            })}`,
        );
    };

    if (
        isLoading ||
        companyInfoData.isLoading ||
        !projectData ||
        !agencies ||
        agencies.length === 0
    ) {
        return <PageLoader />;
    }

    const isAvailabilityCreated = projectData.isAvailabilityCreated;

    const renderLeftComponent = () => {
        if (!isMobile) return null;

        return (
            <Link className="link-logo" href={PROJECTS_ROUTE} shallow={true}>
                <BreefLogo />
            </Link>
        );
    };

    const getClientBrandLead = () => {
        const firstName = companyInfoData.data?.brandLead.firstName || '';
        const lastName = companyInfoData.data?.brandLead.lastName || '';
        const logoUrl = companyInfoData.data?.brandLead.brandLead.logoUrl || '';
        return {
            name: `${firstName} ${lastName}`,
            logo: logoUrl,
        };
    };

    return (
        <Fragment>
            <Global styles={globalStyles} />
            <NavControl
                handleBack={!isMobile ? handleBack : undefined}
                leftComponent={renderLeftComponent()}
                isDisabledPrev={false}
                isStatic
                isSticky
            >
                <ExpandedNavigation title={'Schedule Intros'} />
            </NavControl>
            <PitchesMakeIntroClient
                clientBrandLead={getClientBrandLead()}
                isUpdateAvailability={isAvailabilityCreated}
                agencies={agencies}
                projectId={String(projectId)}
                projectData={projectData}
                companyName={companyInfoData.data.companyName}
            />
        </Fragment>
    );
}

export default withDynamicPathIds(PitchesMakeIntroPage, ['projectId']);
