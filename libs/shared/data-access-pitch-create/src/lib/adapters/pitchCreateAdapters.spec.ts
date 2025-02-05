import { urlToDefaultFormat } from '@breef/shared/utils';
import { PitchCreationStepsEnum } from '@breef/shared/constants';

import {
    PitchResponseType,
    PitchMergedResponseType,
    PitchGuideFileRequest,
    PitchCreate,
    PitchCreateRequestType,
    PitchGuideFile,
} from '@breef/shared/types';
import {
    preparePitchCreationData,
    transformGetPitchByIdData,
    transformPitchGuideFile,
} from './pitchCreateAdapters';

jest.mock('@breef/shared/utils', () => ({
    urlToDefaultFormat: jest.fn(),
    getLink: jest.fn(({ link }) => link),
}));

describe('preparePitchCreationData', () => {
    const mockValues: PitchCreate = {
        body: {
            website: 'http://example.com',
            portfolio: 'http://portfolio.com',
            instagram: 'http://instagram.com',
            step: PitchCreationStepsEnum.Post,
            logo: { id: 1, url: 'http://logo.com' },
            tagline: 'tagline',
            aboutUs: 'aboutUs',
            pitchDetails: 'pitchDetails',
            approach: {
                description: 'approach description',
                links: [{ title: 'link1', link: 'http://link1.com' }],
            },
            uniqueThings: [{ id: 1, name: 'unique' }],
            budget: { value: '1000', comment: 'budget comment' },
            previousWork: [
                {
                    id: 1,
                    clientName: 'Client1',
                    projectName: 'Project1',
                    website: 'http://client1.com',
                    description: 'description',
                    projectLinks: [
                        {
                            title: 'projectLink',
                            link: 'http://projectlink.com',
                        },
                    ],
                    documents: [
                        { id: 1, title: 'doc', link: 'http://doc.com' },
                    ],
                },
            ],
            additionalLinks: [
                { name: 'additional', link: 'http://additional.com' },
            ],
            attachments: [{ id: 1, title: 'doc', link: 'http://doc.com' }],
            projectScope: 'project scope',
            experience: 'experience',
            clientFit: 'client fit',
            noteToBreef: 'note',
        },
        projectId: 1,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should prepare pitch creation data', () => {
        (urlToDefaultFormat as jest.Mock).mockImplementation(link => link);

        const result: PitchCreateRequestType =
            preparePitchCreationData(mockValues);

        expect(result).toEqual({
            project: 1,
            step: PitchCreationStepsEnum.Post,
            other_links: [
                { title: 'website', link: 'http://example.com' },
                { title: 'portfolio', link: 'http://portfolio.com' },
            ],
            social_links: [
                { title: 'instagram', link: 'http://instagram.com' },
            ],
            company_logo: 1,
            tagline: 'tagline',
            agency_bio: 'aboutUs',
            pitch_text: 'pitchDetails',
            approach: {
                description: 'approach description',
                links: [{ title: 'link1', link: 'http://link1.com' }],
            },
            tags: [1],
            budget: '1000',
            budget_note: 'budget comment',
            past_clients: [
                {
                    name: 'Client1',
                    project_name: 'Project1',
                    website: 'http://client1.com',
                    project_description: 'description',
                    links: [
                        {
                            title: 'projectLink',
                            link: 'http://projectlink.com',
                        },
                    ],
                    documents: [1],
                },
            ],
            additional_links: [
                { title: 'additional', link: 'http://additional.com' },
            ],
            files: [1],
            project_scope: 'project scope',
            experience: 'experience',
            client_fit: 'client fit',
            note_to_breef: 'note',
            status: 'posted',
        });
    });
});

describe('transformGetPitchByIdData', () => {
    const mockValues: PitchResponseType = {
        id: 1,
        agency_bio: 'agency_bio',
        company_logo: 1,
        company_logo_url: 'http://logo.com',
        tagline: 'tagline',
        other_links: [
            { title: 'website', link: 'http://example.com' },
            { title: 'portfolio', link: 'http://portfolio.com' },
        ],
        social_links: [{ title: 'instagram', link: 'http://instagram.com' }],
        pitch_text: 'pitch_text',
        approach: {
            description: 'approach description',
            links: [{ title: 'link1', link: 'http://link1.com' }],
        },
        additional_links: [
            { title: 'additional', link: 'http://additional.com' },
        ],
        files: [{ id: 1, name: 'file', url: 'http://file.com' }],
        budget: '1000',
        budget_note: 'budget note',
        project_scope: 'project scope',
        experience: 'experience',
        client_fit: 'client fit',
        note_to_breef: 'note',
        tags: [],
        status: 'status',
        step: PitchCreationStepsEnum.Post,
        agency_clients: [],
        past_clients: [
            {
                id: 1,
                name: 'Client1',
                project_name: 'Project1',
                website: 'http://client1.com',
                project_description: 'description',
                links: [
                    { title: 'projectLink', link: 'http://projectlink.com' },
                ],
                documents: [{ id: 1, name: 'doc', url: 'http://doc.com' }],
            },
        ],
    };

    it('should transform pitch by id data', () => {
        const result: PitchMergedResponseType =
            transformGetPitchByIdData(mockValues);

        expect(result).toEqual({
            id: 1,
            aboutUs: 'agency_bio',
            logo: { url: 'http://logo.com', id: 1, name: '' },
            tagline: 'tagline',
            website: 'http://example.com',
            portfolio: 'http://portfolio.com',
            instagram: 'http://instagram.com',
            pitchDetails: 'pitch_text',
            approach: {
                description: 'approach description',
                links: [{ title: 'link1', link: 'http://link1.com' }],
            },
            additionalLinks: [
                { name: 'additional', link: 'http://additional.com' },
            ],
            attachments: [{ id: 1, title: 'file', link: 'http://file.com' }],
            budget: { value: '1000', comment: 'budget note' },
            projectScope: 'project scope',
            experience: 'experience',
            clientFit: 'client fit',
            noteToBreef: 'note',
            uniqueThings: [],
            status: 'status',
            step: PitchCreationStepsEnum.Post,
            previousWork: [
                {
                    id: 1,
                    clientName: 'Client1',
                    projectName: 'Project1',
                    website: 'http://client1.com',
                    description: 'description',
                    documents: [
                        { id: 1, title: 'doc', link: 'http://doc.com' },
                    ],
                    projectLinks: [
                        {
                            title: 'projectLink',
                            link: 'http://projectlink.com',
                        },
                    ],
                },
            ],
        });
    });
});

describe('transformPitchGuideFile', () => {
    it('should transform pitch guide file data', () => {
        const mockValues: PitchGuideFileRequest = {
            breef_pitch_guide_url: 'http://guide.com',
        };

        const result: PitchGuideFile = transformPitchGuideFile(mockValues);

        expect(result).toEqual({
            breefPitchGuideUrl: 'http://guide.com',
        });
    });
});
