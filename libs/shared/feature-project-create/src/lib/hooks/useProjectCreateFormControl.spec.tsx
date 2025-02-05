import {
    BudgetType,
    Choice,
    ProjectClientActionStatuses,
    ProjectCreationStepsEnum,
    ProjectProgressBarStatuses,
    ProjectStartDay,
    ProjectStatuses,
    SocialNameEnum,
} from '@breef/shared/constants';
import { act, renderHook } from '@testing-library/react-hooks';
import { useProjectCreateFormControl } from './useProjectCreateFormControl';
import {
    CompanyInfoMergedResponseType,
    ProjectByIdType,
} from '@breef/shared/types';

const mockProjectData = {
    id: 1,
    name: 'project title',
    agencySkills: [
        {
            id: 1,
            name: 'skill 1',
            note: 'test skill note',
            isCustomerNote: true,
        },
    ],
    budgetRange: Choice.less_then_fifty,
    budgetType: BudgetType.Monthly,
    startDay: ProjectStartDay.Now,
    isNameEditLocked: false,
    agencyLocation: 'Agency Test Location',
    agencyTags: [{ id: 1, name: 'Agency tag 1' }],
    openToRemoteAgencies: false,
    idealAgencyDescription: 'ideal agency description',
    description: 'test description',
    brandLinks: [
        {
            title: 'test brand link',
            link: 'test.brand.link.com',
        },
    ],
    files: [{ id: 1, link: 'test.file.com', title: 'test file' }],
    companyDescription: 'Company Description',
    socialLinks: [
        {
            title: SocialNameEnum.Instagram,
            link: '@instagram',
        },
        {
            title: SocialNameEnum.Tiktok,
            link: '@tiktok',
        },
        {
            title: SocialNameEnum.Twitter,
            link: '@twitter',
        },
    ],
    companyWebsite: 'https://company.website.com',
    companyLocation: 'company test location',
    companyName: 'test company name',
    isConfidential: false,
    progressBarStatus: ProjectProgressBarStatuses.projectPlanning,
    actionValue: ProjectClientActionStatuses.postProject,
    currentPaymentId: null,
    status: ProjectStatuses.draft,
    step: ProjectCreationStepsEnum.ProjectScope,
    unfilledStep: ProjectCreationStepsEnum.ProjectScope,
    isAvailabilityCreated: false,
    isSchedulingCreated: false,
};
const mockCompanyData = {
    companyName: 'Test Company',
    website: 'example.com',
    industries: [{ id: 1, name: 'industry 1' }],
    officeLocations: [{ id: 1, name: 'location 1' }],
    numberEmployees: '1-5',
    instagram: 'instagram.com',
    twitter: '@twitter',
    linkedin: '@linkedin',
    tiktok: '@tiktok',
    companyOverview: 'Test Company Overview',
    companySize: 'just_me',
    logo: 1,
    logoUrl: 'logo-url.com',
    brandLead: {
        brandLead: {
            companyType: 'client',
            helpText: 'Help Text',
            id: 1,
            logoUrl: 'logo-url.com',
            calendlyLink: 'calendly-link.com',
        },
        firstName: 'LeadFirst',
        lastName: 'LeadLast',
        email: 'example-lead@gmail.com',
        id: 1,
    },
    tags: [{ id: 1, name: 'tag 1' }],
    docs: [{ id: 1, title: 'doc 1', link: 'doc-url.com' }],
    links: [{ id: 1, title: 'link 1', link: 'link-url.com' }],
    services: [
        {
            serviceId: 1,
            name: 'service 1',
            pricing: null,
            portfolio: [
                {
                    clientName: 'Client Name',
                    clientWebsite: 'client-website.com',
                    projectName: 'Project Name',
                    startDateMonth: '1',
                    startDateYear: '2021',
                    projectDescription: 'Project Description',
                    clientTestimonial: 'Client Testimonial',
                    linkUrl: 'link-url.com',
                    documents: [{ id: 1, title: 'doc 1', link: 'doc-url.com' }],
                },
            ],
        },
    ],
};
const setIsReady = jest.fn();

const setup = ({
    isDisableValidation,
    projectData,
    companyData,
}: {
    isDisableValidation?: boolean;
    projectData?: ProjectByIdType;
    companyData?: CompanyInfoMergedResponseType;
}) => {
    return renderHook(() =>
        useProjectCreateFormControl({
            projectData: projectData ?? mockProjectData,
            companyData: companyData ?? mockCompanyData,
            setIsReady,
            isDisableValidation: isDisableValidation ?? false,
        }),
    );
};
describe('useProjectCreateFormControl', () => {
    it('should initialize forms with default values', () => {
        const {
            result: {
                current: { methods },
            },
        } = setup({});

        expect(methods.projectScope.getValues()).toEqual({
            agencySkills: mockProjectData.agencySkills,
            budgetRange: mockProjectData.budgetRange,
            budgetType: mockProjectData.budgetType,
            startDay: mockProjectData.startDay,
            projectTitle: mockProjectData.name,
            isNameEditLocked: mockProjectData.isNameEditLocked,
        });
        expect(methods.companyDetails.getValues()).toEqual({
            companyDescription: mockProjectData.companyDescription,
            socialLinks: mockProjectData.socialLinks,
            companyWebsite: mockProjectData.companyWebsite,
            companyLocation: mockProjectData.companyLocation,
            companyName: mockProjectData.companyName,
            isConfidential: mockProjectData.isConfidential,
        });
        expect(methods.personalizeScope.getValues()).toEqual({
            description: mockProjectData.description,
            brandLinks: mockProjectData.brandLinks,
            files: mockProjectData.files,
        });
        expect(methods.agencyPreferences.getValues()).toEqual({
            agencyLocation: mockProjectData.agencyLocation,
            agencyTags: mockProjectData.agencyTags,
            openToRemoteAgencies: mockProjectData.openToRemoteAgencies,
            idealAgencyDescription: mockProjectData.idealAgencyDescription,
        });
    });

    it('should handle form validation correctly', async () => {
        const { result, waitForNextUpdate } = setup({});

        await act(async () => {
            await result.current.methods.projectScope.trigger();
            await waitForNextUpdate();
        });
        expect(result.current.validationSteps).toEqual([
            false,
            false,
            false,
            false,
            false,
        ]);
        expect(setIsReady).toHaveBeenCalledWith(true);
    });

    it('should disable validation steps when isDisableValidation is true', () => {
        const { result } = setup({ isDisableValidation: true });

        expect(result.current.validationSteps).toEqual([]);
    });
});
