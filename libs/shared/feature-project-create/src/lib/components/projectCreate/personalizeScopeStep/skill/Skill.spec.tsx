import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useGetCapabilitiesQuery } from '@breef/shared/data-access-project-create';
import { Skill } from './Skill';
import { FormProvider } from 'react-hook-form';
import { useProjectCreateFormControl } from '../../../../hooks/useProjectCreateFormControl';
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

jest.mock('@breef/shared/data-access-project-create');
const mockQueryReturnValue = {
    data: [
        {
            id: 1,
            name: 'test skill option',
        },
    ],
};
(useGetCapabilitiesQuery as jest.Mock).mockReturnValue(mockQueryReturnValue);

const projectData = {
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
            link: 'Twitter',
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

const props = {
    index: 0,
    skill: { id: 1, name: 'test skill' },
    clearSkillError: jest.fn(),
    getErrorSkill: jest.fn(),
    validateSkillQuery: jest.fn(),
    setTemplate: jest.fn(),
    setTemplateMeta: {
        id: 1,
        isFetching: false,
    },
};

const SkillWrapper = () => {
    const { methods } = useProjectCreateFormControl({
        setIsReady: jest.fn(),
        projectData: projectData,
    });
    return (
        <FormProvider {...methods.projectScope}>
            <Skill {...props} methodsProjectScopeForm={methods.projectScope} />
        </FormProvider>
    );
};

describe('Skill', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<SkillWrapper />);
        expect(baseElement).toBeInTheDocument();
    });
    it('should select other skill successfully', () => {
        render(<SkillWrapper />);
        const skillSelect = screen.getByTestId('dropdown');
        expect(skillSelect).toBeInTheDocument();
        fireEvent.click(skillSelect);
        const listItem = screen.getByText('test skill option');
        expect(listItem).toBeInTheDocument();
        fireEvent.click(listItem);
        expect(
            screen.getByDisplayValue('test skill option'),
        ).toBeInTheDocument();
    });
    it('should edit skill note on edit successfully', async () => {
        render(<SkillWrapper />);
        const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement;
        expect(textarea).toBeInTheDocument();
        fireEvent.change(textarea, { target: { value: 'Test Custom Text' } });
        await waitFor(() => expect(textarea.value).toBe('Test Custom Text'));
    });
});
