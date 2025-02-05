import { projectSharedAdapters } from './projectSharedAdapters';
import { SharedProjectRequest, SharedProjectType } from '@breef/shared/types';
import { BudgetType, Choice, ProjectStatuses } from '@breef/shared/constants';
import moment from 'moment';
import {
    getBrandLinks,
    getFiles,
    urlToDefaultFormat,
} from '@breef/shared/utils';
import { adaptedSocialLink } from '@breef/shared/data-access-pitch-create';

jest.mock('@breef/shared/utils', () => ({
    getBrandLinks: jest.fn(),
    urlToDefaultFormat: jest.fn(),
    getFiles: jest.fn(),
}));

jest.mock('@breef/shared/data-access-pitch-create', () => ({
    adaptedSocialLink: jest.fn(),
}));

describe('projectSharedAdapters', () => {
    it('should transform SharedProjectRequest to SharedProjectType', () => {
        const mockValues: SharedProjectRequest = {
            id: 1,
            name: 'Project Name',
            client_logo_url: 'http://clientlogo.com',
            company_location: 'Company Location',
            description: 'Project Description',
            submission_deadline: '2024-12-31',
            company_name: 'Company Name',
            company_description: 'Company Description',
            social_links: [{ title: 'LinkedIn', link: 'http://linkedin.com' }],
            agency_location: 'Agency Location',
            open_to_remote_agencies: true,
            files: [{ id: 1, name: 'File 1', url: 'http://file1.com' }],
            brand_links: [
                { title: 'Brand Link', link: 'http://brandlink.com' },
            ],
            company_website: 'http://companywebsite.com',
            kick_off_status: 'draft',
            start_day: '2024-01-01',
            agency_skills: [
                { capability: 1, capability_name: 'Skill 1', note: 'Note 1' },
            ],
            budget_range: Choice['20k-30k'],
            budget_range_type: BudgetType.Monthly,
            tags: [{ id: 1, name: 'Tag1' }],
            agencies_advantages: [{ id: 1, name: 'Advantage 1' }],
            is_confidential: true,
            brand_lead: {
                brand_lead: {
                    id: 1,
                    help_text: 'Help Text',
                    company_type: 'Type',
                    logo_url: 'http://logourl.com',
                    calendly_link: 'http://calendly.com',
                },
                id: 2,
                email: 'email@example.com',
                first_name: 'First',
                last_name: 'Last',
            },
            company_id: 3,
            status: ProjectStatuses.draft,
        };

        (getBrandLinks as jest.Mock).mockReturnValue(mockValues.brand_links);
        (urlToDefaultFormat as jest.Mock).mockReturnValue(
            mockValues.company_website,
        );
        const mockFiles = [
            { id: 1, title: 'File 1', link: 'http://file1.com' },
        ];
        (getFiles as jest.Mock).mockReturnValue(mockFiles);
        (adaptedSocialLink as jest.Mock).mockReturnValue(
            mockValues.social_links,
        );

        const expectedOutput: SharedProjectType = {
            id: 1,
            name: 'Project Name',
            companyLocation: 'Company Location',
            description: 'Project Description',
            submissionDeadline: moment('2024-12-31').utc().format('YYYY-MM-DD'),
            companyName: 'Company Name',
            companyDescription: 'Company Description',
            socialLinks: [{ title: 'LinkedIn', link: 'http://linkedin.com' }],
            agencyLocation: 'Agency Location',
            openToRemoteAgencies: true,
            files: mockFiles,
            brandLinks: [{ title: 'Brand Link', link: 'http://brandlink.com' }],
            companyWebsite: 'http://companywebsite.com',
            kickOffStatus: 'draft',
            startDay: '2024-01-01',
            agencySkills: [{ id: 1, name: 'Skill 1', note: 'Note 1' }],
            budgetRange: Choice.less_then_thirty,
            budgetType: BudgetType.Monthly,
            agencyTags: [{ id: 1, name: 'Tag1' }],
            agenciesAdvantages: [{ id: 1, name: 'Advantage 1' }],
            isConfidential: true,
            brandLead: {
                brandLead: {
                    id: 1,
                    helpText: 'Help Text',
                    companyType: 'Type',
                    logoUrl: 'http://logourl.com',
                    calendlyLink: 'http://calendly.com',
                },
                id: 2,
                email: 'email@example.com',
                firstName: 'First',
                lastName: 'Last',
            },
            companyId: 3,
            status: ProjectStatuses.draft,
        };

        expect(projectSharedAdapters(mockValues)).toEqual(expectedOutput);
    });
});
