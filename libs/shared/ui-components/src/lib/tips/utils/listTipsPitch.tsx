import { TipType } from './types';

/* {mailto:example@breef.com} - parse and add a link to the mail (<a class="accent" href="mailto:example@breef.com">example@breef.com</a>)
 */

const TipsDescPitch = {
    aboutCompany: `Once uploaded, your logo will be saved to your profile.\n\nIt will also be your icon in message chats!`,
    basicLinks: `No portfolio ? Consider linking to:\n\n   •   Social Media\n   •   Dropbox / Drive Folder\n   •   YouTube / Vimeo Page`,
    brandBio: `Consider this an intro to your agency!\n\nBe sure to include:\n   •   Founding story\n   •   Key services\n   •   About the team\n   •   Clients / past-projects`,
    phaseBudget: `Budgets are finalized with clients if you are shortlisted. Put your best foot forward and we can hammer out any details when you’re shortlisted!`,
    winPitch: `A few FYIS:\n\n   •   Make it personal\n   •   Share why you like the brand\n   •   Name relevant examples / clients`,
    anyLinks: (
        <>
            If you have a pitch deck or agency portfolio - share it.
            <br />
            <br />
            Can’t attach? Please send docs to{' '}
            <a href="mailto:teams@breef.com">teams@breef.com</a> - we’ll include
            it!
        </>
    ),
    importantQuality: `This helps clients understand your priorities. \n\nWhat are the most important qualities in a partnership? `,
    inviteTeam: `Better together. Don’t forget to invite your colleagues to the project!`,
    notes: `Anything else you’d like to share? \n\nLet us know, and we’ll work with you to set you up for success.`,
};

const TipsTitlePitch = {
    default: 'Quick tip:',
    proTip: 'Pro Tip:',
    persuasive: 'Quick tip:',
    importantQuality: 'Why is this important?',
    inviteTeam: 'What’s a deliverable?',
};

const defaultTip = {
    title: '',
    description: '',
};

export const getTipPitchProfile = (step: number): TipType | TipType[] => {
    switch (step) {
        case 1:
            return {
                title: TipsTitlePitch.default,
                description: TipsDescPitch.aboutCompany,
            };
        case 2:
            return {
                title: TipsTitlePitch.default,
                description: TipsDescPitch.basicLinks,
            };
        case 3:
            return {
                title: TipsTitlePitch.default,
                description: TipsDescPitch.brandBio,
            };

        default:
            return defaultTip;
    }
};

export const getTipPitchBudget = (step: number): TipType | TipType[] => {
    switch (step) {
        case 1:
            return {
                title: TipsTitlePitch.proTip,
                description: TipsDescPitch.phaseBudget,
            };

        default:
            return defaultTip;
    }
};

export const getTipPitchProject = (step: number): TipType | TipType[] => {
    switch (step) {
        case 1:
            return {
                title: TipsTitlePitch.persuasive,
                description: TipsDescPitch.winPitch,
            };
        case 2:
            return {
                title: TipsTitlePitch.persuasive,
                description: TipsDescPitch.anyLinks,
            };
        case 3:
            return {
                title: TipsTitlePitch.importantQuality,
                description: TipsDescPitch.importantQuality,
            };
        case 4:
            return {
                title: TipsTitlePitch.inviteTeam,
                description: TipsDescPitch.inviteTeam,
            };
        case 5:
            return {
                title: TipsTitlePitch.persuasive,
                description: TipsDescPitch.notes,
            };

        default:
            return defaultTip;
    }
};
