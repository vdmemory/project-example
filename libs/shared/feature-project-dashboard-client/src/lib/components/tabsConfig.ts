import {
    DASHBOARD_MEET_ROUTE,
    DASHBOARD_PAYMENTS_ROUTE,
    DASHBOARD_PITCHES_ROUTE,
    DASHBOARD_PROJECT_ROUTE,
    ProjectStatuses,
    ProjectStatusesWeight,
    TabsDashboardClient,
} from '@breef/shared/constants';
import { TabDashboardType } from '@breef/shared/types';
import { getProjectStatusWeight } from '@breef/shared/utils';

export const getTabsConfig = ({
    projectId,
    pitchesLength,
    projectStatus = ProjectStatuses.draft,
    isSchedulingCreated = false,
}: {
    projectId: number;
    pitchesLength: number;
    projectStatus?: ProjectStatuses;
    isSchedulingCreated?: boolean;
}): TabDashboardType[] => {
    const projectStatusWeight = getProjectStatusWeight(projectStatus);
    const isExistProjectStatus = projectStatusWeight !== undefined;

    const array = [
        {
            title: 'Project Scope',
            mobileTitle: 'Project',
            tab: TabsDashboardClient.project,
            route: DASHBOARD_PROJECT_ROUTE.reverse({ projectId }) as string,
            disabled:
                !isExistProjectStatus ||
                projectStatusWeight < ProjectStatusesWeight.paymentProcessed,
        },
        {
            title: `Review Pitches (${pitchesLength})`,
            mobileTitle: 'Pitches',
            tab: TabsDashboardClient.pitches,
            route: DASHBOARD_PITCHES_ROUTE.reverse({ projectId }) as string,
            disabled:
                !isExistProjectStatus ||
                projectStatusWeight < ProjectStatusesWeight.pitchesShared,
        },
        {
            title: 'Meet Agencies',
            mobileTitle: 'Intros',
            tab: TabsDashboardClient.meet,
            route: DASHBOARD_MEET_ROUTE.reverse({ projectId }) as string,
            disabled:
                !isExistProjectStatus ||
                projectStatusWeight < ProjectStatusesWeight.shortlisted ||
                !isSchedulingCreated,
        },
        {
            title: 'Select Team',
            mobileTitle: 'Select Team',
            tab: TabsDashboardClient.payments,
            route: DASHBOARD_PAYMENTS_ROUTE.reverse({ projectId }) as string,
            disabled:
                !isExistProjectStatus ||
                projectStatusWeight < ProjectStatusesWeight.inProgress,
        },
    ];
    return array;
};
