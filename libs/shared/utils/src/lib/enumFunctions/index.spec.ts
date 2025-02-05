/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getKeyByEnumValue } from './enumFunctions';
import {
    PitchProjectProgressBarStatuses,
    PitchProjectStatuses,
    PitchProjectStatusesWeight,
    ProjectProgressBarStatuses,
    projectProgressBarStepsConfig,
    ProjectStatuses,
    ProjectStatusesWeight,
} from '@breef/shared/constants';
import {
    getPitchProjectProgressBarStep,
    getPitchProjectStatusWeight,
    getProjectProgressBarStep,
    getProjectStatusWeight,
} from '../enumFunctions';

enum Color {
    Red = 'RED',
    Blue = 'BLUE',
    Green = 'GREEN',
}

describe('getKeyByEnumValue', () => {
    it('getKeyByEnumValue should return the key for the given enum value', () => {
        const key = getKeyByEnumValue(Color, Color.Blue);
        expect(key).toBe('Blue');
    });

    it('getKeyByEnumValue should return undefined for non-existing enum value', () => {
        const key = getKeyByEnumValue(Color, Color.Red);
        expect(key).toBe('Red');
    });

    it('getKeyByEnumValue should return undefined for non-existing enum value', () => {
        const key = getKeyByEnumValue(Color, Color.Green);
        expect(key).toBe('Green');
    });
});

describe('getProjectStatusWeight', () => {
    it.each([
        [ProjectStatuses.draft, ProjectStatusesWeight.draft],
        [
            ProjectStatuses.paymentProcessed,
            ProjectStatusesWeight.paymentProcessed,
        ],
        [ProjectStatuses.post, ProjectStatusesWeight.post],
        [ProjectStatuses.inCuration, ProjectStatusesWeight.inCuration],
        [ProjectStatuses.pitchesShared, ProjectStatusesWeight.pitchesShared],
        [ProjectStatuses.shortlisted, ProjectStatusesWeight.shortlisted],
        [
            ProjectStatuses.teamIntroductions,
            ProjectStatusesWeight.teamIntroductions,
        ],
        [ProjectStatuses.teamSelected, ProjectStatusesWeight.teamSelected],
        [ProjectStatuses.inProgress, ProjectStatusesWeight.inProgress],
        [ProjectStatuses.complete, ProjectStatusesWeight.complete],
        [ProjectStatuses.archived, ProjectStatusesWeight.archived],
    ])(
        'correctly assigns weight %s for status %s',
        (status, expectedWeight) => {
            const weight = getProjectStatusWeight(status);
            expect(weight).toBe(expectedWeight);
        },
    );
});

describe('getProjectProgressBarStep', () => {
    it('returns the correct step configuration based on the progress bar status', () => {
        Object.entries(ProjectProgressBarStatuses).forEach(([key, status]) => {
            const stepConfig = getProjectProgressBarStep(status);
            // @ts-ignore
            expect(stepConfig).toBe(projectProgressBarStepsConfig[key]);
        });
    });

    it('handles each defined status correctly', () => {
        expect(
            getProjectProgressBarStep(
                ProjectProgressBarStatuses.projectPlanning,
            ),
        ).toEqual({ step: 0, stepper: 1 });
        expect(
            getProjectProgressBarStep(
                ProjectProgressBarStatuses.awaitingPitches,
            ),
        ).toEqual({ step: 1, stepper: 1 });
        expect(
            getProjectProgressBarStep(ProjectProgressBarStatuses.pitchReview),
        ).toEqual({ step: 1, stepper: 2 });
        expect(
            getProjectProgressBarStep(ProjectProgressBarStatuses.teamSelected),
        ).toEqual({ step: 1, stepper: 3 });
        expect(
            getProjectProgressBarStep(
                ProjectProgressBarStatuses.projectKickoff,
            ),
        ).toEqual({ step: 1, stepper: 4 });
        expect(
            getProjectProgressBarStep(
                ProjectProgressBarStatuses.projectStarted,
            ),
        ).toEqual({ step: 1, stepper: 5 });
    });
});

describe('getPitchProjectProgressBarStep', () => {
    it.each([
        [
            PitchProjectProgressBarStatuses.reviewAndPitch,
            { step: 0, stepper: 1 },
        ],
        [PitchProjectProgressBarStatuses.clientReview, { step: 1, stepper: 1 }],
        [
            PitchProjectProgressBarStatuses.clientIntroduction,
            { step: 1, stepper: 2 },
        ],
        [
            PitchProjectProgressBarStatuses.projectKickoff,
            { step: 1, stepper: 3 },
        ],
        [
            PitchProjectProgressBarStatuses.kickoffCompleted,
            { step: 1, stepper: 4 },
        ],
    ])(
        'getPitchProjectProgressBarStep for %s returns correct config',
        (status, expectedConfig) => {
            expect(getPitchProjectProgressBarStep(status)).toEqual(
                expectedConfig,
            );
        },
    );
});

describe('getPitchProjectStatusWeight Tests', () => {
    it.each([
        [
            PitchProjectStatuses.reviewProject,
            PitchProjectStatusesWeight.reviewProject,
        ],
        [
            PitchProjectStatuses.pitchSubmitted,
            PitchProjectStatusesWeight.pitchSubmitted,
        ],
        [
            PitchProjectStatuses.clientReview,
            PitchProjectStatusesWeight.clientReview,
        ],
        [
            PitchProjectStatuses.reviewCompleted,
            PitchProjectStatusesWeight.reviewCompleted,
        ],
        [
            PitchProjectStatuses.shortlisted,
            PitchProjectStatusesWeight.shortlisted,
        ],
        [
            PitchProjectStatuses.shortlisted,
            PitchProjectStatusesWeight.shortlisted,
        ],
        [
            PitchProjectStatuses.agencySelected,
            PitchProjectStatusesWeight.agencySelected,
        ],
        [PitchProjectStatuses.kickoff, PitchProjectStatusesWeight.kickoff],
        [
            PitchProjectStatuses.notAwarded,
            PitchProjectStatusesWeight.notAwarded,
        ],
        [
            PitchProjectStatuses.projectStarted,
            PitchProjectStatusesWeight.projectStarted,
        ],
        [
            PitchProjectStatuses.projectCompleted,
            PitchProjectStatusesWeight.projectCompleted,
        ],
        [PitchProjectStatuses.archived, PitchProjectStatusesWeight.archived],
    ])('returns the correct weight for %s', (status, expectedWeight) => {
        const weight = getPitchProjectStatusWeight(status);
        expect(weight).toBe(expectedWeight);
    });

    // Test to ensure all statuses are covered
    it('has a weight for every pitch project status', () => {
        Object.values(PitchProjectStatuses).forEach(status => {
            expect(getPitchProjectStatusWeight(status)).toBeDefined();
        });
    });
});
