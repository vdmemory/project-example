export enum PitchProjectProgressBarStatuses {
    reviewAndPitch = 'review_and_pitch',
    clientReview = 'client_review',
    clientIntroduction = 'client_introduction',
    projectKickoff = 'project_kickoff',
    kickoffCompleted = 'kickoff_completed',
}

export const pitchProjectProgressBarStepsConfig = {
    reviewAndPitch: {
        step: 0,
        stepper: 1,
    },
    clientReview: {
        step: 1,
        stepper: 1,
    },
    clientIntroduction: {
        step: 1,
        stepper: 2,
    },
    projectKickoff: {
        step: 1,
        stepper: 3,
    },
    kickoffCompleted: {
        step: 1,
        stepper: 4,
    },
};
