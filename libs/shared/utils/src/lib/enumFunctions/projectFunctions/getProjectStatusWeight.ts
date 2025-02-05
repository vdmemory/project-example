import {
    ProjectStatuses,
    ProjectStatusesWeight,
} from '@breef/shared/constants';
import { getKeyByEnumValue } from '../enumFunctions';

export const getProjectStatusWeight = (status: ProjectStatuses) => {
    return ProjectStatusesWeight[getKeyByEnumValue(ProjectStatuses, status)];
};
