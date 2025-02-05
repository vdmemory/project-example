import {
    PITCH_CREATE_ROUTER,
    PROJECTS_ROUTE,
    ProjectProgressBarStatuses,
    PitchProjectProgressBarStatuses,
    ProjectStatusesWeight,
} from '@breef/shared/constants';
import {
    useGetPitchesListByClientQuery,
    useLazyGetProjectByIdQuery,
} from '@breef/shared/data-access-project';
import { MultiProgressBar, PageLoader } from '@breef/shared/ui-components';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
    configProgressBarAgency,
    configProgressBarClient,
} from './config/progressBarClient';
import { tabsAgency } from './config/tabsAgency';
import { tabsClient } from './config/tabsClient';
import HeaderDashboard from './headerDashboard/HeaderDashboard';
import { StyledDashboard } from './ProjectDashboard.styled';
import ProjectScopeAgency from './agency/projectScope/ProjectScopeAgency';
import { useLazyGetPitchPreviewQuery } from '@breef/shared/data-access-pitch-create';
import MyPitchTab from './agency/myPitch/MyPitchTab';

import { useRouteControl } from '@breef/shared/hooks';
import { PitchPreviewResponse, ProjectByIdType } from '@breef/shared/types';
import {
    getPitchProjectProgressBarStep,
    getProjectProgressBarStep,
    getProjectStatusWeight,
} from '@breef/shared/utils';
import { useLazyGetCompanyInfoQuery } from '@breef/shared/data-access-profile';
import PaymentScheduleAgency from './agency/paymentSchedule/PaymentScheduleAgency';

type ProjectDashboardProps = {
    role: 'client' | 'agency';
    pitchesCount?: boolean;
};

type Error = {
    data: {
        detail: string;
    };
};

const ProjectDashboard: React.FC<ProjectDashboardProps> = ({
    role,
    pitchesCount = false,
}) => {
    const router = useRouter();
    const { changePage } = useRouteControl();
    const [isAccessiblePage, setIsAccessiblePage] = useState(false);
    const {
        query: { tab, projectId },
    } = router;
    const [getProjectById, projectByIdQuery] = useLazyGetProjectByIdQuery();
    const [getAgencyProjectById, projectByAgencyIdQuery] =
        useLazyGetPitchPreviewQuery();
    const requestOptions = {
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
    };
    const { data: dataPitchesListByClient } = useGetPitchesListByClientQuery(
        projectId as string,
        {
            skip: role !== 'client' || !projectId,
            ...requestOptions,
        },
    );
    const [fetchCompanyInfo, { data: companyInfoData }] =
        useLazyGetCompanyInfoQuery();

    const tabsForAgency = tabsAgency({
        isAcceptedTerms: projectByAgencyIdQuery.data?.isAcceptedTerms,
        pitchProjectStatus: projectByAgencyIdQuery.data?.projectAgencyStatus,
        isArchived: projectByAgencyIdQuery.data?.isArchived,
    });

    useEffect(() => {
        if (role === 'client') {
            Promise.all([
                getProjectById(Number(projectId)).unwrap(),
                fetchCompanyInfo({ companyType: role }).unwrap(),
            ]).then(res => {
                const [projectData] = res;
                if (projectData) {
                    const projectStatusWeight = getProjectStatusWeight(
                        projectData.status,
                    );
                    if (
                        projectStatusWeight === undefined ||
                        projectStatusWeight <
                            ProjectStatusesWeight.paymentProcessed
                    ) {
                        changePage(PROJECTS_ROUTE);
                    } else {
                        setIsAccessiblePage(true);
                    }
                }
            });
        }
        if (role === 'agency') {
            getAgencyProjectById(Number(projectId)).then(res => {
                if (res.data) {
                    if (!res.data.isAcceptedTerms && !res.data.isArchived) {
                        changePage(
                            PITCH_CREATE_ROUTER.reverse({
                                projectId: String(projectId),
                            }) || '',
                        );
                    } else if (!res.data.isPitchSubmitted) {
                        changePage(PROJECTS_ROUTE);
                    } else {
                        setIsAccessiblePage(true);
                    }
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const projectData = projectByIdQuery.data || projectByAgencyIdQuery.data;
    const pitchId = (projectData as PitchPreviewResponse)?.pitchId;
    const configProgressBar =
        role === 'client' ? configProgressBarClient : configProgressBarAgency;
    const progressBarStepData = (role === 'client'
        ? getProjectProgressBarStep(
              projectData?.progressBarStatus as ProjectProgressBarStatuses,
          )
        : getPitchProjectProgressBarStep(
              projectData?.progressBarStatus as PitchProjectProgressBarStatuses,
          )) || { step: 0, stepper: 1 };
    const numberStepperSteps =
        role === 'client' ? [1, 1, 1, 1, 1] : [1, 1, 1, 1];

    if (!isAccessiblePage) return <PageLoader />;

    const renderAgencyTab = () => {
        switch (tab) {
            case tabsForAgency[0].tab:
                return (
                    <ProjectScopeAgency
                        projectId={Number(projectId)}
                        projectData={
                            (projectData as PitchPreviewResponse) || null
                        }
                        userType={role}
                    />
                );
            case tabsForAgency[1].tab:
                return (
                    <MyPitchTab
                        skills={
                            (
                                projectByAgencyIdQuery.data as PitchPreviewResponse
                            )?.agencySkills || []
                        }
                        pitchId={pitchId}
                        userType={role}
                    />
                );
            case tabsForAgency[2].tab:
                return (
                    <PaymentScheduleAgency
                        projectId={projectId as string}
                        kickoffStatus={
                            (projectData as PitchPreviewResponse).kickOffStatus
                        }
                    />
                );
            default:
                return null;
        }
    };

    return (
        <StyledDashboard>
            <MultiProgressBar
                config={configProgressBar}
                step={progressBarStepData.step}
                stepper={progressBarStepData.stepper}
                numberSteppersSteps={numberStepperSteps}
                isScrollableBarOnMobile
            />
            <HeaderDashboard
                type={'agency'}
                projectId={String(projectId)}
                title={projectData?.name}
                paymentId={(projectData as ProjectByIdType)?.currentPaymentId}
                pitchId={
                    (projectData as PitchPreviewResponse)?.pitchId ?? undefined
                }
                kickoffId={(projectData as PitchPreviewResponse)?.kickoffId}
                actionValue={(projectData as PitchPreviewResponse).actionValue}
                config={tabsForAgency}
                calendlyLink={companyInfoData?.brandLead.brandLead.calendlyLink}
            />
            {renderAgencyTab()}
        </StyledDashboard>
    );
};
export default ProjectDashboard;
