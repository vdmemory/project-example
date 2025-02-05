import {
    PitchProjectStatusesWeight,
    PitchProjectStatuses,
} from '@breef/shared/constants';
import { getKeyByEnumValue } from '../enumFunctions';

export const getPitchProjectStatusWeight = (status: PitchProjectStatuses) => {
    return PitchProjectStatusesWeight[
        getKeyByEnumValue(PitchProjectStatuses, status)
    ];
};
