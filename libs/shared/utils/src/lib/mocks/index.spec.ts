import { mockRtkQueryAction } from './mockActions';
import { mockPitchData } from './mockPitchData';
import { mockPitchPreviewData } from './mockProjectData';

describe('mockRtkQueryAction', () => {
    it('returns the action object with the correct structure for fulfilled promise state', () => {
        const reducerPath = 'someReducerPath';
        const endpointName = 'someEndpointName';
        const promiseState = 'fulfilled';
        const payload = { data: 'someData' };

        const action = mockRtkQueryAction(
            reducerPath,
            endpointName,
            promiseState,
            payload,
        );

        expect(action).toEqual({
            type: `${reducerPath}/executeQuery/${promiseState}`,
            payload,
            meta: {
                arg: {
                    endpointName,
                },
            },
        });
    });

    it('returns the action object with the correct structure for rejected promise state', () => {
        const reducerPath = 'someOtherReducerPath';
        const endpointName = 'anotherEndpointName';
        const promiseState = 'rejected';
        const payload = { error: 'someError' };

        const action = mockRtkQueryAction(
            reducerPath,
            endpointName,
            promiseState,
            payload,
        );

        expect(action).toEqual({
            type: `${reducerPath}/executeQuery/${promiseState}`,
            payload,
            meta: {
                arg: {
                    endpointName,
                },
            },
        });
    });

    it('returns the action object with the correct structure for pending promise state', () => {
        const reducerPath = 'yetAnotherReducerPath';
        const endpointName = 'yetAnotherEndpointName';
        const promiseState = 'pending';
        const payload = null; // Pending state typically has no payload

        const action = mockRtkQueryAction(
            reducerPath,
            endpointName,
            promiseState,
            payload,
        );

        expect(action).toEqual({
            type: `${reducerPath}/executeQuery/${promiseState}`,
            payload,
            meta: {
                arg: {
                    endpointName,
                },
            },
        });
    });
});

describe('mockPitchData', () => {
    it('has all fields initialized as expected', () => {
        expect(mockPitchData).toEqual({
            emojis: [],
            pitchText: 'Mock Pitch Text',
            agencyLogo: {
                id: 2367,
                name: '',
                url: 'http://www.agencyLogo.com',
            },
            agencyName: 'My Mock Agency Name',
            socialLinks: [
                {
                    title: 'Instagram',
                    link: 'https://www.instagram/@mock_instagram',
                },
                {
                    title: 'Twitter',
                    link: 'https://www.twitter/@mock_twitter',
                },
                {
                    title: 'TikTok',
                    link: 'https://www.tiktok/@mock_tiktok',
                },
            ],
            websiteLink: 'https://www.website.com',
            portfolioLink: 'https://www.portfolioLink.com',
            agencyBio: 'text for agency bio',
            projectFormat: 'mock Project format',
            brandLinks: [
                {
                    id: 232323,
                    title: 'brandLinks-1',
                    link: 'brandLinks-1.pdf',
                    type: 'file',
                },
            ],
            clientsAdvantages: [1, 2],
            contactNumber: {
                number: '9786543212',
                code: '+1',
                numberWithoutCountryCode: '123',
            },
            invitations: [],
            teamMembers: [],
            teamInvites: [],
            notesToBreef: 'Notes For Breef',
            notesToClient: 'Notes for Client',
            gifMiscNotes: [],
            status: 'draft',
            project: null,
            projectEstimation: 100,
        });
    });
});

describe('mockPitchPreviewData', () => {
    it('has all fields initialized as expected', () => {
        expect(mockPitchPreviewData).toEqual({
            startDay: 'asap',
            agencySkills: [],
            budgetRange: '40k-50k',
            budgetType: 'monthly',
            agencyPreferences: [],
            agencyAdvantages: [],
            isAcceptedTerms: false,
            companyWebsite: '',
            kickOffStatus: 'approved_by_breef',
            projectAgencyId: 123,
            name: 'name',
            description: 'description',
            submissionDeadline: '',
            companyName: 'New Balance',
            companyLogoUrl: 'https://www.logo.jpg',
            companyDescription: 'companyDescription',
            clientDescription: 'clientDescription',
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
            companyLocation: 'Barcelona',
            agencyLocation: 'Italy',
            openToRemoteAgencies: true,
            objectives: [
                {
                    id: 111,
                    name: 'objectives name',
                    description: 'objectives description',
                },
            ],
            agenciesAdvantages: [
                {
                    id: 222,
                    name: 'agenciesAdvantages name',
                },
            ],
            projectFormat: 'ongoing',
            miscNotes: 'miscNotes',
            miscNotesGif: null,
            files: [],
            pitchId: 321,
            brandLinks: [
                {
                    id: 44,
                    title: 'link-1',
                    link: 'https://link-1.com',
                    loading: false,
                },
            ],
            kickoffId: null,
            website: 'website.com',
            status: 'draft',
            projectAgencyStatus: 'review_project',
            progressBarStatus: 'review_and_pitch',
            actionValue: 'review_and_pitch',
            isPitchSubmitted: false,
            isInterested: 'not_selected',
            isArchived: false,
            step: 'project_scope',
        });
    });
});
