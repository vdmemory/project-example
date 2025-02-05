import {
    pitchProjectProgressBarStepsConfig,
    PitchProjectProgressBarStatuses,
} from '@breef/shared/constants';
import { getKeyByEnumValue } from '../enumFunctions';

export const getPitchProjectProgressBarStep = (
    status: PitchProjectProgressBarStatuses,
) => {
    return pitchProjectProgressBarStepsConfig[
        getKeyByEnumValue(PitchProjectProgressBarStatuses, status)
    ];
};
