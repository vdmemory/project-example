import { projectInitialData } from './projectInfoInitialState';

describe('projectInitialData', () => {
    it('has all fields initialized as expected', () => {
        expect(projectInitialData).toEqual({
            companyLogoUrl: '',
            companyName: '',
            name: '',
            companyLocation: '',
            preferredLocation: '',
            companyDescription: '',
            socialLinks: [
                {
                    title: 'Instagram',
                    link: '',
                },
                {
                    title: 'Twitter',
                    link: '',
                },
                {
                    title: 'TikTok',
                    link: '',
                },
            ],
            description: '',
            objectives: [
                {
                    id: null,
                    name: '',
                    description: '',
                },
            ],
            agenciesAdvantages: [
                {
                    id: null,
                    name: '',
                },
            ],
            files: [],
            miscNotes: '',
            miscNotesGif: '',
        });
    });
});
