import { Provider } from 'react-redux';
import { FormProvider } from 'react-hook-form';
import {
    fireEvent,
    getByTestId,
    queryByTestId,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import PersonalizeScopeStep from './PersonalizeScopeStep';
import { useProjectCreateFormControl } from '../../../hooks/useProjectCreateFormControl';
import { mockConfiguredStore } from '../../../store/mockStore';

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

const validateSkillQuery = jest.fn();
const clearSkillError = jest.fn();
const getErrorSkill = jest.fn();
const setTemplate = jest.fn();

const props = {
    validateSkillQuery,
    clearSkillError,
    getErrorSkill,
    setTemplate,
    setTemplateMeta: {
        id: 1,
        isFetching: false,
    },
};

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
    isAvailabilityCreated: false,
    isSchedulingCreated: false,
};

const PersonalizeScopeStepWrapper = () => {
    const { methods } = useProjectCreateFormControl({
        setIsReady: jest.fn(),
        projectData: projectData,
    });
    return (
        <Provider store={mockConfiguredStore}>
            <FormProvider {...methods.personalizeScope}>
                <PersonalizeScopeStep
                    {...props}
                    methodsProjectScopeForm={methods.projectScope}
                />
            </FormProvider>
        </Provider>
    );
};

describe('PersonalizeScopeStep', () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
        matches: false,
    }));
    it('should render successfully', () => {
        render(<PersonalizeScopeStepWrapper />);
        expect(screen.getByText('Project Overview')).toBeInTheDocument();
        expect(screen.getByText('Agency Skills')).toBeInTheDocument();
    });
    it('should add additional link field on click successfully', () => {
        render(<PersonalizeScopeStepWrapper />);
        const addLinkButton = screen.getByTestId('link');
        expect(addLinkButton).toBeInTheDocument();
        fireEvent.click(addLinkButton);
        const linkField = document.querySelector('.additional-link');
        expect(linkField).toBeInTheDocument();
    });
    it('should remove additional link field on click successfully', () => {
        render(<PersonalizeScopeStepWrapper />);
        const additionalLinkField = screen.getByDisplayValue('test brand link');
        const removeAdditionalLinkButton =
            screen.getByTestId('trash-icon-button');
        expect(removeAdditionalLinkButton).toBeInTheDocument();
        expect(additionalLinkField).toBeInTheDocument();
        fireEvent.click(removeAdditionalLinkButton);
        setTimeout(() => {
            expect(screen.queryByDisplayValue('test brand link')).toBe(null);
        });
    });
    it('should remove file item on file item trash button successfully', () => {
        render(<PersonalizeScopeStepWrapper />);
        const removeButton = screen.getByTestId('remove-file-item-button');
        expect(screen.getByTestId('file-item')).toBeInTheDocument();
        expect(removeButton).toBeInTheDocument();
        fireEvent.click(removeButton);
        expect(screen.queryByTestId('file-item')).toBe(null);
    });
    it('should add skill on button click successfully', () => {
        render(<PersonalizeScopeStepWrapper />);
        const addSkillButton =
            document.getElementsByClassName('button-add-skill')[0];
        expect(addSkillButton).toBeInTheDocument();
        fireEvent.click(addSkillButton);
        const skillsItems = document.getElementsByClassName('skill-item');
        expect(skillsItems.length).toBe(2);
    });
});
