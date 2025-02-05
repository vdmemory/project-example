export enum ProjectProgressBarStatuses {
    projectPlanning = 'project_planning',
    awaitingPitches = 'awaiting_pitches',
    pitchReview = 'pitch_review',
    teamSelected = 'team_selected',
    projectKickoff = 'project_kickoff',
    projectStarted = 'project_started',
}

export const projectProgressBarStepsConfig = {
    projectPlanning: {
        step: 0,
        stepper: 1,
    },
    awaitingPitches: {
        step: 1,
        stepper: 1,
    },
    pitchReview: {
        step: 1,
        stepper: 2,
    },
    teamSelected: {
        step: 1,
        stepper: 3,
    },
    projectKickoff: {
        step: 1,
        stepper: 4,
    },
    projectStarted: {
        step: 1,
        stepper: 5,
    },
};
