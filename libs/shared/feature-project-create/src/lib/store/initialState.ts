import { StateProjectCreateSliceType } from '../types/projectCreateTypes';

export const initialStateProjectCreateSlice: StateProjectCreateSliceType = {
    step: 1,
    profile: {
        companyName: null,
        brandLead: null,
    },
    user: {
        needsPassword: false,
    },
    isSubmitting: false,
    isSubmittingSaveExit: false,
    isPenMode: false,
    targetElementId: null,
    isTooltipProjectOverview: true,
};
