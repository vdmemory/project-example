import {
    pitchesByClientAdapters,
    pitchesListTransformer,
    transformPitchAdapter,
    getAgenciesSchedulesListAdapter,
} from './pitchesByClientAdapters';
import {
    PitchProjectStatuses,
    ReviewDecisionNames,
} from '@breef/shared/constants';
import { getPitchProjectStatusWeight } from '@breef/shared/utils';
import {
    AgenciesSchedulesListRequest,
    AgencyPitchResponse,
    PitchesListResponse,
    PitchListByClientRequest,
} from '@breef/shared/types';

jest.mock('@breef/shared/utils', () => ({
    getPitchProjectStatusWeight: jest.fn(),
}));

describe('pitchesByClientAdapters all', () => {
    describe('pitchesByClientAdapters', () => {
        it('should transform PitchListByClientRequest to PitchListByClient', () => {
            const mockValues: PitchListByClientRequest = {
                pitches: [
                    {
                        id: 1,
                        company_name: 'Company A',
                        company_logo_url: 'logoA.png',
                        company_locations: { location: 'Location A' },
                        budget: '1000',
                        status: PitchProjectStatuses.agencySelected,
                        schedule_status: 'scheduled',
                        review_decision: 'approved',
                        is_shortlisted: true,
                        pitch_tags: ['tag1', 'tag2'],
                    },
                    {
                        id: 2,
                        company_name: 'Company B',
                        company_logo_url: 'logoB.png',
                        company_locations: { location: 'Location B' },
                        budget: '2000',
                        status: PitchProjectStatuses.shortlisted,
                        schedule_status: null,
                        review_decision: 'pending',
                        is_shortlisted: false,
                        pitch_tags: ['tag3', 'tag4'],
                    },
                ],
            };

            const expectedOutput = {
                pitches: [
                    {
                        id: 1,
                        companyName: 'Company A',
                        companyLogoUrl: 'logoA.png',
                        companyLocations: { location: 'Location A' },
                        budget: '1000',
                        status: 'agency_selected',
                        scheduleStatus: 'scheduled',
                        reviewDecision: 'approved',
                        isShortlisted: true,
                        pitchTags: ['tag1', 'tag2'],
                    },
                    {
                        id: 2,
                        companyName: 'Company B',
                        companyLogoUrl: 'logoB.png',
                        companyLocations: { location: 'Location B' },
                        budget: '2000',
                        status: 'shortlisted',
                        scheduleStatus: null,
                        reviewDecision: 'pending',
                        isShortlisted: false,
                        pitchTags: ['tag3', 'tag4'],
                    },
                ],
            };

            expect(pitchesByClientAdapters(mockValues)).toEqual(expectedOutput);
        });
    });

    describe('pitchesListTransformer', () => {
        it('should transform PitchesListResponse to TransformPitchesListResponse', () => {
            const mockValues: PitchesListResponse = {
                pitches: [
                    {
                        id: 1,
                        company_name: 'Company A',
                        company_logo_url: 'logoA.png',
                        status: PitchProjectStatuses.shortlisted,
                        review_decision: ReviewDecisionNames.UNREVIEWED,
                        budget: 1000,
                        is_shortlisted: true,
                        schedule_status: 'scheduled',
                    },
                    {
                        id: 2,
                        company_name: 'Company B',
                        company_logo_url: 'logoB.png',
                        status: PitchProjectStatuses.archived,
                        review_decision: ReviewDecisionNames.ACCEPTED,
                        budget: 1000,
                        is_shortlisted: true,
                        schedule_status: null,
                    },
                ],
            };

            (getPitchProjectStatusWeight as jest.Mock).mockImplementation(
                status => {
                    return status === 'active' ? 1 : 0;
                },
            );

            const expectedOutput = [
                {
                    id: 1,
                    logo: 'logoA.png',
                    name: 'Company A',
                    pitch: null,
                    reviewDecision: 'unreviewed',
                    status: 'shortlisted',
                },
                {
                    id: 2,
                    logo: 'logoB.png',
                    name: 'Company B',
                    pitch: null,
                    reviewDecision: 'accepted',
                    status: 'archived',
                },
            ];

            expect(pitchesListTransformer(mockValues)).toEqual(expectedOutput);
        });
    });

    describe('transformPitchAdapter', () => {
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

            const expectedOutput = {
                id: 1,
                aboutUs: 'About us',
                companyLogo: {
                    id: 124,
                    url: 'logo.png',
                    name: '',
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

            expect(transformPitchAdapter(mockValues)).toEqual(expectedOutput);
        });
    });

    describe('getAgenciesSchedulesListAdapter', () => {
        it('should transform AgenciesSchedulesListRequest to AgenciesSchedulesList', () => {
            const mockValues: AgenciesSchedulesListRequest[] = [
                {
                    id: 1,
                    logo_url: 'logo.png',
                    name: 'Agency name',
                    location: 'Location',
                    schedule: true,
                    is_shortlisted: true,
                    pitch: { id: 2 },
                },
            ];

            const expectedOutput = [
                {
                    id: 1,
                    logoUrl: 'logo.png',
                    name: 'Agency name',
                    location: 'Location',
                    schedule: true,
                    isShortlisted: true,
                    pitchId: 2,
                },
            ];

            expect(getAgenciesSchedulesListAdapter(mockValues)).toEqual(
                expectedOutput,
            );
        });
    });
});
