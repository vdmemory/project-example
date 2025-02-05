import { ReactNode } from 'react';

export type TipType = {
    title: string;
    description: string | ReactNode;
};

export enum TipsTypeKeys {
    projectOverview = 'projectOverview',
    projectPhase = 'projectPhase',
    projectInfoNotes = 'projectInfoNotes',
    pitchProfile = 'pitchProfile',
    pitchBudget = 'pitchBudget',
    pitchProject = 'pitchProject',
    agencySelection = 'agencySelection',
}
