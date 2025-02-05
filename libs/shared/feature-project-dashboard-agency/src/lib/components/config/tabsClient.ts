import {
    ProjectStatusesWeight,
    ProjectStatuses,
} from '@breef/shared/constants';
import { getProjectStatusWeight } from '@breef/shared/utils';

export const tabsClient = ({
    pitchCount = 0,
    projectStatus = ProjectStatuses.draft,
}: {
    pitchCount?: number;
    projectStatus?: ProjectStatuses;
}) => {
    const projectStatusWeight = getProjectStatusWeight(projectStatus);
    const isExistProjectStatus = projectStatusWeight !== undefined;

    return [
        {
            title: 'Project Scope',
            tab: 'project-scope',
            disabled:
                !isExistProjectStatus ||
                projectStatusWeight < ProjectStatusesWeight.paymentProcessed,
        },
        {
            title: `Pitches ${pitchCount}`,
            tab: 'pitches',
            disabled:
                !isExistProjectStatus ||
                projectStatusWeight < ProjectStatusesWeight.pitchesShared,
        },
        {
            title: 'Payments',
            tab: 'payments',
            disabled:
                !isExistProjectStatus ||
                projectStatusWeight < ProjectStatusesWeight.inProgress,
        },
    ];
};
