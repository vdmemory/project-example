import {
    getTipProjectInfoNotes,
    getTipProjectOverview,
    getTipProjectPhase,
} from './listTipsProject';

describe('listTipsProject', () => {
    it('getTipProjectOverview should return correct value step=1', () => {
        expect(getTipProjectOverview(1)).toEqual({
            title: 'What makes a good bio?',
            description: `A snapshot of your brand! This\nincludes:\n   •   Product offering\n   •   Company Mission\n   •   Key Stats`,
        });
    });
    it('getTipProjectOverview should return correct value step=2', () => {
        expect(getTipProjectOverview(2)).toEqual({
            title: 'Quick tip:',
            description: `We’re big believers in remote work - allowing access to great talent, anywhere.\n\nOf course, this is just one factor in curating agencies for you.`,
        });
    });
    it('getTipProjectOverview should return correct value step=3', () => {
        expect(getTipProjectOverview(3)).toEqual({
            title: 'Quick tip:',
            description: `Having a goal (or two!), will help agencies understand your objectives.\n\nKPIs (i.e. # of website visits, etc.) can be established later in the process to ensure targets are being hit.`,
        });
    });
    it('getTipProjectOverview should return correct value step=4', () => {
        expect(getTipProjectOverview(4)).toEqual({
            title: 'Quick tip:',
            description: `A timeframe will help us keep your project on track + manage expectations with agencies.\n\n(You can always update it!)`,
        });
    });
    it('getTipProjectOverview should return correct value step=5', () => {
        expect(getTipProjectOverview(5)).toEqual({
            title: `What makes a good overview? `,
            description: `Details! Make sure all the 'w's' are covered! (Who, What, When, Where, Why). This sets the scene for the agency.`,
        });
    });
    it('getTipProjectOverview should return correct default value', () => {
        expect(getTipProjectOverview(7)).toEqual({
            title: '',
            description: '',
        });
    });
});

describe('getTipProjectPhase', () => {
    it('getTipProjectPhase should return correct value step=1', () => {
        expect(getTipProjectPhase(1)).toEqual([
            {
                title: `What’s a deliverable?`,
                description: `Consider it a piece of work within a timeframe (or 'phase'). \n\nOutline everything you need. Be detailed. Deliverables are often tied to payments and the success of an agency.`,
            },
            {
                title: `How To about budgets?`,
                description: `Budget ranges are key for fair pricing. They are a starting point and help guide agencies when pitching. Until you select a team, no pricing is set in stone.`,
            },
        ]);
    });
    it('getTipProjectPhase should return correct value step=2', () => {
        expect(getTipProjectPhase(2)).toEqual({
            title: `What’s Included in phase 2?`,
            description: `Consider this everything you need on an ongoing baisis - once your strategy has been established.`,
        });
    });
    it('getTipProjectPhase should return correct default value ', () => {
        expect(getTipProjectPhase(4)).toEqual({
            title: '',
            description: '',
        });
    });
});

describe('getTipProjectInfoNotes', () => {
    it('getTipProjectInfoNotes should return correct value step=1', () => {
        expect(getTipProjectInfoNotes(1)).toEqual({
            title: 'Quick tip:',
            description: `Your logo will be used to help create a personalized experience as you move into agency discussions.`,
        });
    });
    it('getTipProjectInfoNotes should return correct value step=2', () => {
        expect(getTipProjectInfoNotes(2)).toEqual({
            title: 'Quick tip:',
            description: `If you have additional documents like an internal scope, brand guidelines or inspiration - include them here.`,
        });
    });
    it('getTipProjectInfoNotes should return correct value step=3', () => {
        expect(getTipProjectInfoNotes(3)).toEqual({
            title: `Why is this important?`,
            description: `This helps agencies understand your priorities. What are the most important qualities for you in this project?`,
        });
    });
    it('getTipProjectInfoNotes should return correct value step=4', () => {
        expect(getTipProjectInfoNotes(4)).toEqual({
            title: `Invite your team for review`,
            description: `Add colleagues to your project for pitch review + client introductions.`,
        });
    });
    it('getTipProjectInfoNotes should return correct value step=5', () => {
        expect(getTipProjectInfoNotes(5)).toEqual({
            title: `Notes for breef`,
            description: `Is there anything else you’d like us to know about your agency search?\n\nThis will not be shared with the agencies.`,
        });
    });
    it('getTipProjectInfoNotes should return correct default value ', () => {
        expect(getTipProjectInfoNotes(8)).toEqual({
            title: '',
            description: '',
        });
    });
});
