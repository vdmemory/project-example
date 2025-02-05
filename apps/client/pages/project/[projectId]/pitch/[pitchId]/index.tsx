import { useEffect } from 'react';
import {
    useGetProjectByIdQuery,
    useLazyGetAgencyPitchQuery,
} from '@breef/shared/data-access-project';
import { useRouter } from 'next/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
    AgencyPitch,
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
import { toast } from 'react-toastify';
import { getProjectData } from '@breef/shared/utils';
import { useGetCompanyInfoQuery } from '@breef/shared/data-access-profile';
import { ProjectByIdType } from '@breef/shared/types';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';

import { Button } from '@breef/ui-kit';
import { withDynamicPathIds } from '../../../../../hoc/withDynamicPathIds';

const globalStyles = css`
    footer {
        display: none !important;
    }
`;

const StyledSinglePitchViewPage = styled.div`
    position: relative;

    .agency-pitch {
        margin: auto;
        padding: 40px 75px;
        max-width: 925px;

        @media (${mediaScreen.maxMobile}) {
            padding: 40px 20px;
            flex-direction: column;
            max-width: 540px;
        }
    }

    .button-dashboard {
        height: 100%;
        border: 0;
        border-left: 1px solid;

        .label {
            font-size: 12px;
        }
    }
`;

function SinglePitchViewPage() {
    const router = useRouter();
    const projectPopup = usePopup();
    const {
        query: { projectId, pitchId },
    } = router;

    const [
        getAgencyPitch,
        {
            data: agencyPitch,
            isSuccess: isSuccessPitch,
            isError: isErrorPitch,
            isFetching: isFetchingPitch,
        },
    ] = useLazyGetAgencyPitchQuery();

    useEffect(() => {
        getAgencyPitch({
            projectId: Number(projectId),
            pitchId: Number(pitchId),
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectId, pitchId]);

    useEffect(() => {
        if (!isErrorPitch) return;
        toast.error('A data retrieval error has occurred.');
    }, [isErrorPitch]);

    const projectByIdQuery = useGetProjectByIdQuery(Number(projectId));
    const companyInfoData = useGetCompanyInfoQuery({ companyType: 'client' });

    const handleBack = () =>
        router.push(DASHBOARD_PITCHES_ROUTE.reverse({ projectId }) as string);

    const handleBackToDashboard = () => router.push(`${PROJECTS_ROUTE}`);

    if (
        projectByIdQuery.isLoading ||
        companyInfoData.isLoading ||
        isFetchingPitch
    ) {
        return <PageLoader />;
    }

    return (
        <StyledSinglePitchViewPage>
            <Global styles={globalStyles} />
            <NavControl
                handleBack={handleBack}
                isDisabledPrev={false}
                isStatic
                isSticky
            >
                <ExpandedNavigation
                    title={projectByIdQuery.data?.name || 'Brand refresh'}
                    isDisplayListIcon
                    customPopupControl={projectPopup}
                    customPopup={
                        <ReviewProjectPopup
                            projectData={getProjectData(
                                projectByIdQuery.data as ProjectByIdType,
                            )}
                            close={projectPopup.close}
                        />
                    }
                >
                    <Button
                        label="Dashboard"
                        onClick={handleBackToDashboard}
                        isUppercase
                        variant="secondary"
                        className="button-dashboard"
                    />
                </ExpandedNavigation>
            </NavControl>
            {isSuccessPitch && agencyPitch ? (
                <AgencyPitch className="agency-pitch" pitchData={agencyPitch} />
            ) : null}
        </StyledSinglePitchViewPage>
    );
}

export default withDynamicPathIds(SinglePitchViewPage, [
    'projectId',
    'pitchId',
]);
