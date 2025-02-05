import {
    getTipPitchBudget,
    getTipPitchProfile,
    getTipPitchProject,
} from './listTipsPitch';

describe('listTipsPitch', () => {
    it('getTipPitchProfile should return correct value step=1', () => {
        expect(getTipPitchProfile(1)).toEqual({
            title: 'Quick tip:',
            description: `Once uploaded, your logo will be saved to your profile.\n\nIt will also be your icon in message chats!`,
        });
    });
    it('getTipPitchProfile should return correct value step=2', () => {
        expect(getTipPitchProfile(2)).toEqual({
            title: 'Quick tip:',
            description: `No portfolio ? Consider linking to:\n\n   •   Social Media\n   •   Dropbox / Drive Folder\n   •   YouTube / Vimeo Page`,
        });
    });
    it('getTipPitchProfile should return correct value step=3', () => {
        expect(getTipPitchProfile(3)).toEqual({
            title: 'Quick tip:',
            description: `Consider this an intro to your agency!\n\nBe sure to include:\n   •   Founding story\n   •   Key services\n   •   About the team\n   •   Clients / past-projects`,
        });
    });
    it('getTipPitchProfile should return correct default value', () => {
        expect(getTipPitchProfile(4)).toEqual({
            title: '',
            description: '',
        });
    });
});

describe('getTipPitchBudget', () => {
    it('getTipPitchBudget should return correct value step=1', () => {
        expect(getTipPitchBudget(1)).toEqual({
            title: 'Pro Tip:',
            description: `Budgets are finalized with clients if you are shortlisted. Put your best foot forward and we can hammer out any details when you’re shortlisted!`,
        });
    });
    it('getTipPitchBudget should return correct default value', () => {
        expect(getTipPitchBudget(2)).toEqual({
            title: '',
            description: '',
        });
    });
});

describe('getTipPitchProject', () => {
    it('getTipPitchProject should return correct value step=1', () => {
        expect(getTipPitchProject(1)).toEqual({
            title: 'Quick tip:',
            description: `A few FYIS:\n\n   •   Make it personal\n   •   Share why you like the brand\n   •   Name relevant examples / clients`,
        });
    });
    it('getTipPitchProject should return correct default value', () => {
        expect(getTipPitchProject(2)).toEqual({
            title: 'Quick tip:',
            description: (
                <>
                    If you have a pitch deck or agency portfolio - share it.
                    <br />
                    <br />
                    Can’t attach? Please send docs to{' '}
                    <a href="mailto:teams@breef.com">teams@breef.com</a> - we’ll
                    include it!
                </>
            ),
        });
    });
    it('getTipPitchProject should return correct value step=3', () => {
        expect(getTipPitchProject(3)).toEqual({
            title: 'Why is this important?',
            description: `This helps clients understand your priorities. \n\nWhat are the most important qualities in a partnership? `,
        });
    });
    it('getTipPitchProject should return correct value step=4', () => {
        expect(getTipPitchProject(4)).toEqual({
            title: 'What’s a deliverable?',
            description: `Better together. Don’t forget to invite your colleagues to the project!`,
        });
    });
    it('getTipPitchProject should return correct value step=5', () => {
        expect(getTipPitchProject(5)).toEqual({
            title: 'Quick tip:',
            description: `Anything else you’d like to share? \n\nLet us know, and we’ll work with you to set you up for success.`,
        });
    });
    it('getTipPitchProject should return correct default value', () => {
        expect(getTipPitchProject(8)).toEqual({
            title: '',
            description: '',
        });
    });
});
