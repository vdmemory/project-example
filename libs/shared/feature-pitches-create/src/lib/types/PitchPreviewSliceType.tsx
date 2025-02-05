import { PitchPreviewResponse } from '@breef/shared/types';

export type PitchPreviewSliceType = {
    shortProjectInfo: {
        clientName: string;
        name: string;
        budgetRange: string;
        budgetType: string;
        kickoff: string;
        requiredSkills: number[];
        agencyPreferences: {
            location: string;
            preferences: string[];
            advantages: string[];
        };
    };
    pitchPreview: PitchPreviewResponse;
};
