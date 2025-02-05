import { ProjectCreationStepsEnum } from '@breef/shared/constants';
import {
    StreamlinedProjectResponseType,
    StreamlinedProjectTransformResponseType,
} from '@breef/shared/types';

export const transformStreamlinedProjectData = (
    response: StreamlinedProjectResponseType | undefined,
): StreamlinedProjectTransformResponseType | null => {
    if (!response) return null;

    return {
        projectId: response.id,
        unfilledStep: response.unfilled_step,
    };
};
