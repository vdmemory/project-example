import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BudgetType, Choice, SocialNameEnum } from '@breef/shared/constants';
import { HelpUsPopup } from './HelpUsPopup';
import {
    useMediaContext,
    useRouteControl,
    useViewPassword,
} from '@breef/shared/hooks';
import {
    useCreateProjectMutation,
    useUpdateProjectMutation,
} from '@breef/shared/data-access-project-create';
import {
    useCreateTagMutation,
    useGetTagsQuery,
} from '@breef/shared/data-access-pitch-create';

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

jest.mock('@breef/shared/hooks', () => ({
    useMediaContext: jest.fn(),
    useRouteControl: jest.fn(),
    useLimitSymbols: jest.fn(),
    useViewPassword: jest.fn(),
}));

jest.mock('@breef/shared/data-access-project-create', () => ({
    useCreateProjectMutation: jest.fn(),
    useUpdateProjectMutation: jest.fn(),
}));
jest.mock('@breef/shared/data-access-pitch-create', () => ({
    useCreateTagMutation: jest.fn(),
    useGetTagsQuery: jest.fn(),
}));

const mockUseRouteControl = useRouteControl as jest.Mock;
const mockUseMediaContext = useMediaContext as jest.Mock;
const mockUseUpdateProjectMutation = useUpdateProjectMutation as jest.Mock;
const mockUseCreateProjectMutation = useCreateProjectMutation as jest.Mock;
const mockUseCreateTagMutation = useCreateTagMutation as jest.Mock;
const mockUseGetTagsQuery = useGetTagsQuery as jest.Mock;
const mockUseViewPassword = useViewPassword as jest.Mock;

const changePage = jest.fn();
const updateProject = jest.fn();
const createProject = jest.fn();
const createTag = jest.fn();

const close = jest.fn();
const onClose = jest.fn();
const onBack = jest.fn();
const handleServerErrors = jest.fn();
const onSuccessCallbackFn = jest.fn();
const props = {
    close,
    onClose,
    onBack,
    handleServerErrors,
    onSuccessCallbackFn,
    projectId: 1,
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
};

const HelpUsPopupWrapper = () => {
    return (
        // <Provider store={mockConfiguredStore}>
        <HelpUsPopup {...props} />
        // </Provider>
    );
};

describe('ReviewStep', () => {
    changePage.mockReturnValue({
        finally: jest.fn(),
    });
    mockUseRouteControl.mockReturnValue({
        changePage,
    });
    mockUseMediaContext.mockReturnValue({
        isMobile: false,
    });
    mockUseCreateProjectMutation.mockReturnValue([createProject]);
    mockUseUpdateProjectMutation.mockReturnValue([updateProject]);
    mockUseCreateTagMutation.mockReturnValue([createTag, { isLoading: false }]);
    mockUseGetTagsQuery.mockReturnValue({
        data: [],
    });
    mockUseViewPassword.mockReturnValue({
        typeInput: 'text',
        toggleTypeInput: jest.fn(),
    });

    it('should render successfully', () => {
        render(<HelpUsPopupWrapper />);
        expect(
            screen.getByText('Help us prepare for your call'),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'What are you looking for in an agency? We guarantee you’ll find the perfect team.',
            ),
        ).toBeInTheDocument();
    });
    it('should close on button close click successfully', () => {
        render(<HelpUsPopupWrapper />);
        const closeBtn = document.getElementsByClassName('close-button')[0];
        expect(closeBtn).toBeInTheDocument();
        fireEvent.click(closeBtn);
        expect(onClose).toBeCalled();
    });
    it('should call back on arrow prev button click successfully', () => {
        render(<HelpUsPopupWrapper />);
        const backBtn = document.getElementsByClassName('button-back')[0];
        expect(backBtn).toBeInTheDocument();
        fireEvent.click(backBtn);
        expect(onBack).toBeCalled();
    });
    it('should render mobile titles successfully', () => {
        mockUseMediaContext.mockReturnValue({
            isMobile: true,
        });
        render(<HelpUsPopupWrapper />);
        expect(screen.getByText('Prepare for your call')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Tell us what you’re looking for in an agency. We guarantee you’ll find the perfect team on Breef.',
            ),
        ).toBeInTheDocument();
    });
});
