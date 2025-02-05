import { TipType } from './types';

const TipsDescProject = {
    brandBio: `A snapshot of your brand! This\nincludes:\n   •   Product offering\n   •   Company Mission\n   •   Key Stats`,
    location: `We’re big believers in remote work - allowing access to great talent, anywhere.\n\nOf course, this is just one factor in curating agencies for you.`,
    goals: `Having a goal (or two!), will help agencies understand your objectives.\n\nKPIs (i.e. # of website visits, etc.) can be established later in the process to ensure targets are being hit.`,
    timeframe: `A timeframe will help us keep your project on track + manage expectations with agencies.\n\n(You can always update it!)`,
    overview: `Details! Make sure all the 'w's' are covered! (Who, What, When, Where, Why). This sets the scene for the agency.`,
    phaseOneDelivery: `Consider it a piece of work within a timeframe (or 'phase'). \n\nOutline everything you need. Be detailed. Deliverables are often tied to payments and the success of an agency.`,
    phaseOneBudget: `Budget ranges are key for fair pricing. They are a starting point and help guide agencies when pitching. Until you select a team, no pricing is set in stone.`,
    phaseTwo: `Consider this everything you need on an ongoing baisis - once your strategy has been established.`,
    logo: `Your logo will be used to help create a personalized experience as you move into agency discussions.`,
    additionalDoc: `If you have additional documents like an internal scope, brand guidelines or inspiration - include them here.`,
    importantQuality: `This helps agencies understand your priorities. What are the most important qualities for you in this project?`,
    inviteTeam: `Add colleagues to your project for pitch review + client introductions.`,
    notes: `Is there anything else you’d like us to know about your agency search?\n\nThis will not be shared with the agencies.`,
};

const TipsTitleProject = {
    default: 'Quick tip:',
    brandBio: 'What makes a good bio?',
    overview: `What makes a good overview? `,
    phaseOneDelivery: `What’s a deliverable?`,
    phaseOneBudget: `How To about budgets?`,
    phaseTwo: `What’s Included in phase 2?`,
    importantQuality: `Why is this important?`,
    inviteTeam: `Invite your team for review`,
    notes: `Notes for breef`,
};

const defaultTip = {
    title: '',
    description: '',
};

export const getTipProjectOverview = (step: number): TipType | TipType[] => {
    switch (step) {
        case 1:
            return {
                title: TipsTitleProject.brandBio,
                description: TipsDescProject.brandBio,
            };
        case 2:
            return {
                title: TipsTitleProject.default,
                description: TipsDescProject.location,
            };
        case 3:
            return {
                title: TipsTitleProject.default,
                description: TipsDescProject.goals,
            };
        case 4:
            return {
                title: TipsTitleProject.default,
                description: TipsDescProject.timeframe,
            };
        case 5:
            return {
                title: TipsTitleProject.overview,
                description: TipsDescProject.overview,
            };
        default:
            return defaultTip;
    }
};

export const getTipProjectPhase = (step: number): TipType | TipType[] => {
    switch (step) {
        case 1:
            return [
                {
                    title: TipsTitleProject.phaseOneDelivery,
                    description: TipsDescProject.phaseOneDelivery,
                },
                {
                    title: TipsTitleProject.phaseOneBudget,
                    description: TipsDescProject.phaseOneBudget,
                },
            ];
        case 2:
            return {
                title: TipsTitleProject.phaseTwo,
                description: TipsDescProject.phaseTwo,
            };
        default:
            return defaultTip;
    }
};

export const getTipProjectInfoNotes = (step: number): TipType | TipType[] => {
    switch (step) {
        case 1:
            return {
                title: TipsTitleProject.default,
                description: TipsDescProject.logo,
            };
        case 2:
            return {
                title: TipsTitleProject.default,
                description: TipsDescProject.additionalDoc,
            };
        case 3:
            return {
                title: TipsTitleProject.importantQuality,
                description: TipsDescProject.importantQuality,
            };
        case 4:
            return {
                title: TipsTitleProject.inviteTeam,
                description: TipsDescProject.inviteTeam,
            };
        case 5:
            return {
                title: TipsTitleProject.notes,
                description: TipsDescProject.notes,
            };
        default:
            return defaultTip;
    }
};
