import { projectByIdAdapters } from './projectByIdAdapters';
import {
    BudgetType,
    Choice,
    ProjectClientActionStatuses,
    ProjectCreationStepsEnum,
    ProjectProgressBarStatuses,
    ProjectStatuses,
} from '@breef/shared/constants';
import { ProjectByIdResponseType, ProjectByIdType } from '@breef/shared/types';

describe('projectByIdAdapters', () => {
    it('should transform ProjectByIdResponseType to ProjectByIdType', () => {
        const mockValues: ProjectByIdResponseType = {
            id: 1,
            name: 'Project Name',
            company_name: 'Company Name',
            company_location: 'Company Location',
            start_day: '2024-01-01',
            description: 'Project Description',
            agency_skills: [
                {
                    capability: 1,
                    capability_name: 'Skill 1',
                    note: 'Note 1',
                    is_default: true,
                },
                {
                    capability: 2,
                    capability_name: 'Skill 2',
                    note: 'Note 2',
                    is_default: false,
                },
            ],
            tags: [
                {
                    id: 1,
                    name: 'Tag1',
                },
            ],
            agencies_advantages: [
                {
                    id: 1,
                    name: 'Advantage',
                },
            ],
            agency_location: 'Agency Location',
            open_to_remote_agencies: true,
            budget_range: Choice['100k-150k'],
            budget_range_type: BudgetType.Monthly,
            company_description: 'Company Description',
            social_links: [
                { title: 'Website', link: 'http://website.com' },
                { title: 'LinkedIn', link: 'http://linkedin.com' },
            ],
            brand_links: [
                { title: 'Brand Link', link: 'http://brandlink.com' },
            ],
            files: [
                { id: 1, name: 'File 1', url: 'http://file1.com' },
                { id: 2, name: 'File 2', url: 'http://file2.com' },
            ],
            company_website: 'http://companywebsite.com',
            agency_description: 'Ideal Agency Description',
            progress_bar_status: ProjectProgressBarStatuses.awaitingPitches,
            action_value: ProjectClientActionStatuses.awaitingKickoff,
            current_payment_id: 123,
            status: ProjectStatuses.complete,
            step: ProjectCreationStepsEnum.ProjectScope,
            is_availability_created: true,
            is_scheduling_created: false,
            is_confidential: true,
            is_name_edit_locked: false,
            is_rebuild_project: false,
        };

        const expectedOutput: ProjectByIdType = {
            id: 1,
            name: 'Project Name',
            companyName: 'Company Name',
            companyLocation: 'Company Location',
            startDay: '2024-01-01',
            description: 'Project Description',
            agencySkills: [
                {
                    id: 1,
                    name: 'Skill 1',
                    note: 'Note 1',
                    isCustomerNote: true,
                },
                {
                    id: 2,
                    name: 'Skill 2',
                    note: 'Note 2',
                    isCustomerNote: false,
                },
            ],
            agencyTags: [{ id: 1, name: 'Tag1' }],
            agenciesAdvantages: [{ id: 1, name: 'Advantage' }],
            agencyLocation: 'Agency Location',
            openToRemoteAgencies: true,
            budgetRange: Choice.less_then_hundred_and_fifty,
            budgetType: BudgetType.Monthly,
            companyDescription: 'Company Description',
            socialLinks: [
                { title: 'Website', link: 'http://website.com' },
                { title: 'LinkedIn', link: 'http://linkedin.com' },
            ],
            brandLinks: [
                {
                    title: 'Brand Link',
                    link: 'http://brandlink.com',
                    id: undefined,
                    type: 'link',
                },
            ],
            files: [
                {
                    id: 1,
                    title: 'File 1',
                    link: 'http://file1.com',
                    thumbnail: undefined,
                },
                {
                    id: 2,
                    title: 'File 2',
                    link: 'http://file2.com',
                    thumbnail: undefined,
                },
            ],
            companyWebsite: 'http://companywebsite.com',
            idealAgencyDescription: 'Ideal Agency Description',
            progressBarStatus: ProjectProgressBarStatuses.awaitingPitches,
            actionValue: ProjectClientActionStatuses.awaitingKickoff,
            currentPaymentId: 123,
            status: ProjectStatuses.complete,
            step: ProjectCreationStepsEnum.ProjectScope,
            isAvailabilityCreated: true,
            isSchedulingCreated: false,
            isConfidential: true,
            isNameEditLocked: false,
        };

        expect(projectByIdAdapters(mockValues)).toEqual(expectedOutput);
    });

    it('should handle missing optional fields and default them correctly', () => {
        const mockValues: ProjectByIdResponseType = {
            id: 2,
            name: 'Another Project',
            company_name: null,
            company_location: null,
            start_day: null,
            description: null,
            agency_skills: [],
            tags: [],
            agencies_advantages: [],
            agency_location: null,
            open_to_remote_agencies: false,
            budget_range: null,
            budget_range_type: BudgetType.Monthly,
            company_description: null,
            social_links: [],
            brand_links: [],
            files: [],
            company_website: null,
            agency_description: null,
            progress_bar_status: ProjectProgressBarStatuses.awaitingPitches,
            action_value: ProjectClientActionStatuses.awaitingKickoff,
            current_payment_id: null,
            status: ProjectStatuses.archived,
            step: null,
            is_availability_created: false,
            is_scheduling_created: false,
            is_confidential: false,
            is_name_edit_locked: false,
            is_rebuild_project: false,
        };

        const expectedOutput: ProjectByIdType = {
            id: 2,
            name: 'Another Project',
            companyName: '',
            companyLocation: '',
            startDay: '',
            description: '',
            agencySkills: [],
            agencyTags: [],
            agenciesAdvantages: [],
            agencyLocation: '',
            openToRemoteAgencies: false,
            budgetRange: '',
            budgetType: BudgetType.Monthly,
            companyDescription: '',
            socialLinks: [],
            brandLinks: [],
            files: [],
            companyWebsite: '',
            idealAgencyDescription: '',
            progressBarStatus: ProjectProgressBarStatuses.awaitingPitches,
            actionValue: ProjectClientActionStatuses.awaitingKickoff,
            currentPaymentId: null,
            status: ProjectStatuses.archived,
            step: ProjectCreationStepsEnum.ProjectScope,
            isAvailabilityCreated: false,
            isSchedulingCreated: false,
            isConfidential: false,
            isNameEditLocked: false,
        };

        expect(projectByIdAdapters(mockValues)).toEqual(expectedOutput);
    });
});
