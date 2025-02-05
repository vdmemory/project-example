import { render, screen } from '@testing-library/react';
import ReviewStep from './ReviewStep';
import { BudgetType, Choice, SocialNameEnum } from '@breef/shared/constants';
import { Provider } from 'react-redux';
import { mockConfiguredStore } from '../../../store/mockStore';
import { useForm } from 'react-hook-form';
import { PreferencesFormType } from '../../../types/projectCreateTypes';

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: {},
            asPath: '',
            push: jest.fn(),
            isReady: true,
        };
    },
}));

const onSubmit = jest.fn();
const onSaveExit = jest.fn();
const handleServerErrors = jest.fn();
const props = {
    projectData: {
        projectTitle: '',
        companyLocation: 'test company location',
        startDay: 'asap',
        description: 'test project description',
        agencySkills: [
            {
                id: 1,
                name: 'skill name',
                note: 'test skill note',
                isCustomerNote: false,
            },
        ],
        budgetRange: Choice.less_then_fifty,
        budgetType: BudgetType.Monthly,
        agencyLocation: 'test agency location',
        agencyPreferences: [1, 2, 3],
        openToRemoteAgencies: true,
        companyDescription: 'test company description',
        agencyTags: [],
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
        brandLinks: [{ title: 'test additional link', link: 'test.com' }],
        files: [{ id: 1, title: 'test file', link: 'test-file-link.com' }],
        companyWebsite: 'website-test.com',
        idealAgencyDescription: 'test ideal agency description',
        companyName: 'test company name',
        isNameEditLocked: false,
        isConfidential: false,
    },
    companyName: 'Test Company Name',
    onSubmit,
    onSaveExit,
    handleServerErrors,
};
const ReviewStepWrapper = () => {
    const methods = useForm<PreferencesFormType>({
        defaultValues: {
            agencyLocation: '',
            agencyTags: [],
            openToRemoteAgencies: false,
            idealAgencyDescription: '',
        },
    });
    return (
        <Provider store={mockConfiguredStore}>
            <ReviewStep {...props} methodsAgencyPreferences={methods} />
        </Provider>
    );
};

describe('ReviewStep', () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
        matches: false,
    }));
    it('should render successfully', () => {
        render(<ReviewStepWrapper />);
        expect(screen.getByText('skill name Project')).toBeInTheDocument();
        expect(
            screen.getByText('test project description'),
        ).toBeInTheDocument();
        expect(screen.getByText('test skill note')).toBeInTheDocument();
        expect(screen.queryByText('test agency location')).toBe(null);
        expect(
            screen.getByText('test company description'),
        ).toBeInTheDocument();
        expect(screen.getByText('test additional link')).toBeInTheDocument();
        expect(screen.getByText('test file')).toBeInTheDocument();
    });
});
