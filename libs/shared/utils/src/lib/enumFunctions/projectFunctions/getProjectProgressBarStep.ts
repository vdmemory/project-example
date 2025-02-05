import {
    projectProgressBarStepsConfig,
    ProjectProgressBarStatuses,
} from '@breef/shared/constants';
import { getKeyByEnumValue } from '../enumFunctions';

export const getProjectProgressBarStep = (
    status: ProjectProgressBarStatuses,
) => {
    return projectProgressBarStepsConfig[
        getKeyByEnumValue(ProjectProgressBarStatuses, status)
    ];
};
