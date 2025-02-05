import { Choice, ProjectCreationStepsEnum } from '@breef/shared/constants';
import {
    ProjectCreationRequestType,
    ProjectTemplateResponseType,
} from '@breef/shared/types';
import {
    getBrandLinks,
    getSocialLinks,
    prepareProjectCreationData,
    projectTemplateAdapter,
} from './projectCreateAdapters';

describe('prepareProjectCreationData', () => {
    test('should prepare project creation data correctly', () => {
        const values: ProjectCreationRequestType = {
            step: ProjectCreationStepsEnum.CompanyDetails,
            isNameEditLocked: true,
            projectTitle: 'Project Test',
            companyLocation: 'New York',
            startDay: '2023-10-01',
            description: 'Project Description',
            idealAgencyDescription: 'Ideal Agency Description',
            agencySkills: [
                {
                    id: 1,
                    note: 'Skill Note',
                    isCustomerNote: true,
                    name: 'Skill 1',
                },
                {
                    id: -1,
                    note: 'Skill Note 2',
                    isCustomerNote: true,
                    name: 'Skill 2',
                },
            ],
            agencyTags: [{ id: 1, name: 'Agency Tag' }],
            agencyLocation: 'San Francisco',
            openToRemoteAgencies: true,
            budgetRange: Choice['100k-150k'],
            budgetType: 'fixed',
            companyName: 'Test Company',
            companyDescription: 'Company Description',
            companyWebsite: 'http://example.com',
            files: [{ id: 1, title: 'File 1', link: 'http://example.com' }],
            brandLinks: [
                { title: 'brandlink1', link: 'http://brandlink1.com' },
            ],
            socialLinks: [
                { title: 'sociallink1', link: 'http://sociallink1.com' },
            ],
            isConfidential: true,
        };

        const expected = {
            name: 'Project Test',
            step: ProjectCreationStepsEnum.CompanyDetails,
            company_location: 'New York',
            start_day: '2023-10-01',
            description: 'Project Description',
            agency_description: 'Ideal Agency Description',
            agency_skills: [
                { capability: 1, note: 'Skill Note', is_default: true },
            ],
            tags: [1],
            agency_location: null,
            open_to_remote_agencies: true,
            budget_range: Choice.less_then_hundred_and_fifty,
            budget_range_type: 'fixed',
            company_name: 'Test Company',
            company_description: 'Company Description',
            company_website: 'http://example.com',
            files: [1],
            brand_links: [
                {
                    id: undefined,
                    link: 'http://brandlink1.com',
                    title: 'brandlink1',
                },
            ],
            social_links: [
                {
                    link: 'http://sociallink1.com',
                    title: 'sociallink1',
                },
            ],
            is_confidential: true,
        };

        const result = prepareProjectCreationData(values);
        expect(result).toEqual(expected);
    });
});

describe('getSocialLinks', () => {
    it('should filter and transform social links correctly', () => {
        const links = [
            { title: 'instagram', link: 'https://www.instagram.com/example' },
            { title: 'tiktok', link: null },
            { title: 'twitter', link: 'https://twitter.com/example' },
        ];

        const transformedLinks = getSocialLinks(links);
        expect(transformedLinks).toEqual([
            { title: 'instagram', link: 'https://www.instagram.com/example' },
            { title: 'twitter', link: 'https://twitter.com/example' },
        ]);
    });

    it('should return an empty array if no valid links are present', () => {
        const links = [
            { title: 'facebook', link: null },
            { title: 'linkedin', link: null },
        ];

        const transformedLinks = getSocialLinks(links);
        expect(transformedLinks).toEqual([]);
    });
});

describe('getBrandLinks', () => {
    it('should filter and transform brand links correctly', () => {
        const links = [
            {
                title: 'Website',
                link: 'https://www.example.com',
                id: 'tmp-id-1',
                type: 'file',
            },
            {
                title: 'Instagram',
                link: 'https://www.instagram.com/example',
                id: '123',
                type: 'social',
            },
            {
                title: 'Twitter',
                link: 'https://twitter.com/example',
                id: null,
                type: 'social',
            },
        ];

        const transformedLinks = getBrandLinks(links);
        expect(transformedLinks).toEqual([
            {
                id: '123',
                title: 'Instagram',
                link: 'https://www.instagram.com/example',
            },
            { id: null, title: 'Twitter', link: 'https://twitter.com/example' },
        ]);
    });

    it('should return an empty array if no valid brand links are present', () => {
        const links = [
            {
                title: 'Facebook',
                link: 'https://www.facebook.com/example',
                id: 'tmp-id-2',
                type: 'file',
            },
            {
                title: 'LinkedIn',
                link: 'https://www.linkedin.com/example',
                id: 'tmp-id-3',
                type: 'file',
            },
        ];

        const transformedLinks = getBrandLinks(links);
        expect(transformedLinks).toEqual([]);
    });
});

describe('projectTemplateAdapter', () => {
    it('should adapt project template response correctly', () => {
        const mockResponse: ProjectTemplateResponseType = {
            description: 'Sample project template description',
            agency_skills: [
                {
                    capability: 1,
                    capability_name: 'Skill 1',
                    note: 'Note for Skill 1',
                },
                { capability: 2, capability_name: 'Skill 2', note: '' },
            ],
        };

        const adaptedValues = projectTemplateAdapter(mockResponse);
        expect(adaptedValues).toEqual({
            description: 'Sample project template description',
            agencySkills: [
                {
                    id: 1,
                    name: 'Skill 1',
                    note: 'Note for Skill 1',
                    isCustomerNote: false,
                },
                { id: 2, name: 'Skill 2', note: '', isCustomerNote: false },
            ],
        });
    });
});
