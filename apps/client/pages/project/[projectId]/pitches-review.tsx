import { ReviewPitchesClient } from '@breef/shared/feature-project-dashboard-client';
import {
    useLazyGetPitchesListReviewQuery,
    useLazyGetProjectByIdQuery,
} from '@breef/shared/data-access-project';
import { useRouter } from 'next/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
    ExpandedNavigation,
    NavControl,
    PageLoader,
    ReviewProjectPopup,
    usePopup,
} from '@breef/shared/ui-components';
import {
    PROJECTS_ROUTE,
    DASHBOARD_PITCHES_ROUTE,
} from '@breef/shared/constants';
import { useLazyGetCompanyInfoQuery } from '@breef/shared/data-access-profile';
import { getProjectData, getStorageData } from '@breef/shared/utils';
import React, { Fragment, useEffect, useState } from 'react';
import { ProjectByIdType } from '@breef/shared/types';
import { css, Global } from '@emotion/react';
import { toast } from 'react-toastify';
import { mediaScreen } from '@breef/shared/assets/variables';
import { colors } from '@breef/ui-kit';
import { withDynamicPathIds } from '../../../hoc/withDynamicPathIds';
import Link from 'next/link';
import { BreefLogo } from '@breef/shared/assets';
import { useMediaContext } from '@breef/shared/hooks';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { sliceActions } from '@breef/shared/feature-project-dashboard-client';

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

function PitchesReviewPage() {
    const router = useRouter();
    const {
        query: { projectId },
    } = router;
    const projectPopup = usePopup();

    const { isMobile } = useMediaContext();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const activeIdInLocal = getStorageData('local', 'active');

    const [getProjectByIdQuery, { data: projectByIdQuery }] =
        useLazyGetProjectByIdQuery();
    const [getCompanyInfoData, { data: companyInfoData }] =
        useLazyGetCompanyInfoQuery();
    const [getPitchesList, { isFetching }] = useLazyGetPitchesListReviewQuery();

    const { pitchesListReview } = useAppSelector(state => state.dashboard);
    const dispatch = useAppDispatch();

    const clearLocalStorage = () => {
        localStorage.removeItem('active');
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const result = await getPitchesList(String(projectId)).unwrap();
            if (!result || !result.length) {
                router.push(
                    DASHBOARD_PITCHES_ROUTE.reverse({ projectId }) as string,
                );
                return;
            }
            await getProjectByIdQuery(Number(projectId)).unwrap();
            await getCompanyInfoData({
                companyType: 'client',
            }).unwrap();
            clearLocalStorage();
        } catch (error) {
            toast.error('A data retrieval error has occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!projectId) return;
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectId]);

    useEffect(() => {
        return () => {
            clearLocalStorage();
            dispatch(sliceActions.resetPitchesListReview());
        };
        //eslint-disable-next-line
    }, []);

    const handleBack = () =>
        router.push(DASHBOARD_PITCHES_ROUTE.reverse({ projectId }) as string);

    if (isLoading && isFetching) return <PageLoader />;

    const getClientBrandLead = () => {
        const firstName = companyInfoData?.brandLead.firstName || '';
        const lastName = companyInfoData?.brandLead.lastName || '';
        const logoUrl = companyInfoData?.brandLead.brandLead.logoUrl || '';
        return {
            name: `${firstName} ${lastName}`,
            logo: logoUrl,
        };
    };

    const renderLeftComponent = () => {
        if (!isMobile) return null;

        return (
            <Link className="link-logo" href={PROJECTS_ROUTE} shallow={true}>
                <BreefLogo />
            </Link>
        );
    };

    return (
        <Fragment>
            <Global styles={globalStyles} />
            <NavControl
                handleBack={!isMobile ? handleBack : undefined}
                leftComponent={renderLeftComponent()}
                isDisabledPrev={false}
                isSticky={true}
                isStatic={true}
            >
                <ExpandedNavigation
                    title={'Agency Pitch Review'}
                    isDisplayListIcon
                    customPopupControl={projectPopup}
                    customPopup={
                        <ReviewProjectPopup
                            projectData={getProjectData(
                                projectByIdQuery as ProjectByIdType,
                            )}
                            close={projectPopup.close}
                        />
                    }
                />
            </NavControl>
            {pitchesListReview && pitchesListReview.length ? (
                <ReviewPitchesClient
                    initAgencyId={activeIdInLocal}
                    projectName={projectByIdQuery?.name || ''}
                    projectId={Number(projectId)}
                    clientBrandLead={getClientBrandLead()}
                    agenciesList={pitchesListReview}
                />
            ) : null}
        </Fragment>
    );
}

export default withDynamicPathIds(PitchesReviewPage, ['projectId']);
