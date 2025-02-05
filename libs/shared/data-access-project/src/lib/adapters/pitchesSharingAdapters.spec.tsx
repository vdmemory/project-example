import {
    AgencyPitchResponse,
    TransformAgencyPitchResponse,
} from '@breef/shared/types';
import {
    pitchesSharingAdapters,
    publicPitchesListAdapters,
    publicSinglePitchAdapter,
} from './pitchesSharingAdapters';

describe('pitchesSharingAdapters all', () => {
    describe('pitchesSharingAdapters', () => {
        it('should transform GetPitchesListSharingRequest to GetPitchesListSharing', () => {
            const mockValues = {
                id: 1,
                pitches_sharing: true,
                token: 'token_123',
            };

            const expectedOutput = {
                id: 1,
                pitchesSharing: true,
                token: 'token_123',
            };

            expect(pitchesSharingAdapters(mockValues)).toEqual(expectedOutput);
        });
    });

    describe('publicPitchesListAdapters', () => {
        it('should transform PublicPitchesListRequest[] to PublicPitchesList[]', () => {
            const mockValues = [
                {
                    token: 'token_1',
                    company_name: 'Company A',
                    company_logo_url: 'logoA.png',
                },
                {
                    token: 'token_2',
                    company_name: 'Company B',
                    company_logo_url: 'logoB.png',
                },
            ];

            const expectedOutput = [
                {
                    token: 'token_1',
                    companyName: 'Company A',
                    companyLogoUrl: 'logoA.png',
                },
                {
                    token: 'token_2',
                    companyName: 'Company B',
                    companyLogoUrl: 'logoB.png',
                },
            ];

            expect(publicPitchesListAdapters(mockValues)).toEqual(
                expectedOutput,
            );
        });
    });

    describe('publicSinglePitchAdapter', () => {
        it('should transform AgencyPitchResponse to TransformAgencyPitchResponse', () => {
            const mockValues: AgencyPitchResponse = {
                id: 1,
                agency_bio: 'About us',
                company_logo_url: 'logo.png',
                company_logo: 124,
                tagline: 'Tagline',
                other_links: [{ title: 'website', link: 'http://website.com' }],
                social_links: [
                    { title: 'instagram', link: 'http://instagram.com' },
                ],
                pitch_text: 'Pitch details',
                project_capabilities: [{ id: 1, name: 'skill1' }],
                additional_links: [{ title: 'link', link: 'http://link.com' }],
                files: [{ id: 1, name: 'file', url: 'http://file.com' }],
                budget: '1000',
                budget_note: 'Budget note',
                experience: 5,
                client_fit: 4,
                project_scope: '3',
                tags: [{ id: 1, name: 'tag1' }],
                review_decision: 'approved',
                company_locations: { location: 'Location' },
                company_name: 'Company name',
                approach: {
                    description: 'Approach description',
                    links: [
                        { title: 'link', link: 'http://approach-link.com' },
                    ],
                },
                past_clients: [
                    {
                        id: 1,
                        name: 'Client name',
                        project_name: 'Project name',
                        website: 'http://project-website.com',
                        project_description: 'Project description',
                        documents: [
                            { id: 1, name: 'doc', url: 'http://doc.com' },
                        ],
                        links: [{ title: '', link: 'http://project-link.com' }],
                    },
                ],
                breef_take: 'Breef take',
                agency_clients: [
                    {
                        id: 12,
                        name: 'Client name',
                        link: 'http://client-link.com',
                    },
                ],
                project: 123,
            };

            const expectedOutput: TransformAgencyPitchResponse = {
                id: 1,
                aboutUs: 'About us',
                companyLogo: {
                    id: 124,
                    url: 'logo.png',
                },
                tagline: 'Tagline',
                website: 'http://website.com',
                portfolio: '',
                instagram: 'http://instagram.com',
                pitchDetails: 'Pitch details',
                skills: [{ id: 1, name: 'skill1' }],
                additionalLinks: [{ name: 'link', link: 'http://link.com' }],
                attachments: [
                    { id: 1, title: 'file', link: 'http://file.com' },
                ],
                budget: { value: '1000', comment: 'Budget note' },
                experience: '5',
                clientFit: '4',
                projectScope: '3',
                uniqueThings: [{ id: 1, name: 'tag1' }],
                reviewDecision: 'approved',
                companyLocation: 'Location',
                companyName: 'Company name',
                approach: {
                    description: 'Approach description',
                    links: [
                        { link: 'http://approach-link.com', title: 'link' },
                    ],
                },
                previousWork: [
                    {
                        id: 1,
                        clientName: 'Client name',
                        projectName: 'Project name',
                        website: 'http://project-website.com',
                        description: 'Project description',
                        documents: [
                            { id: 1, title: 'doc', link: 'http://doc.com' },
                        ],
                        projectLinks: [
                            { title: '', link: 'http://project-link.com' },
                        ],
                    },
                ],
                breefTake: 'Breef take',
            };

            expect(publicSinglePitchAdapter(mockValues)).toEqual(
                expectedOutput,
            );
        });
    });
});
