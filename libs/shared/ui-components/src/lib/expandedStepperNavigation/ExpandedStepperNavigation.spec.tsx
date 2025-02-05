import { fireEvent, render, screen } from '@testing-library/react';
import { ExpandedStepperNavigation } from './ExpandedStepperNavigation';
import { useIntercom } from 'react-use-intercom';
import { usePopup } from '../popup/usePopup';
import { logout } from '@breef/shared/utils';
import { useMediaContext, useWindowSize } from '@breef/shared/hooks';
import { useRouter } from 'next/router';

jest.mock('react-use-intercom');
(useIntercom as jest.Mock).mockReturnValue({
    show: jest.fn(),
    hide: jest.fn(),
    boot: jest.fn(),
});

jest.mock('../popup/usePopup');
(usePopup as jest.Mock).mockReturnValue({
    isOpen: false,
    open: jest.fn(),
    close: jest.fn(),
});

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

(useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
});

jest.mock('@breef/shared/data-access-auth', () => ({
    __esModule: true,
    ...jest.requireActual('@breef/shared/data-access-auth'),
    useGetSelfQuery: () => ({
        data: {
            id: 1,
            email: 'email@gmail.com',
            firstName: 'first',
            lastName: 'last',
            companyType: 'client',
            isOnboardingComplete: true,
            companyPosition: 'owner',
            timeZone: 'Kiev',
            hasSocialAccount: false,
            dateJoined: '13.12.23',
            companyName: 'Company Name',
        },
        isLoading: false,
        isSuccess: true,
    }),
}));

jest.mock('@breef/shared/utils', () => ({
    ...jest.requireActual('@breef/shared/utils'),
    logout: jest.fn(),
}));

jest.mock('@breef/shared/hooks');
(useMediaContext as jest.Mock).mockImplementation(() => ({
    isMobile: false,
}));

(useWindowSize as jest.Mock).mockReturnValue({
    width: 1024,
    height: 720,
});

describe('ExpandedStepperNavigation', () => {
    it('renders with title', () => {
        render(<ExpandedStepperNavigation title="Test Title" />);
        const titleElement = screen.getByDisplayValue('Test Title');
        expect(titleElement).toBeInTheDocument();
    });

    it('renders with text and icons', () => {
        const { baseElement } = render(
            <ExpandedStepperNavigation
                title="Test Title"
                displayPhone={true}
            />,
        );
        const phoneIcon = baseElement.querySelector('.phone-icon');
        const chatIcon = baseElement.querySelector('.chat-icon');

        expect(phoneIcon).toBeInTheDocument();
        expect(chatIcon).toBeInTheDocument();
    });

    it('calls handleShowIntercom on chat icon click', async () => {
        const { baseElement } = render(
            <ExpandedStepperNavigation
                title="Test Title"
                displayPhone={true}
            />,
        );
        const chatIcon = baseElement.querySelector('.chat-icon') as HTMLElement;
        fireEvent.click(chatIcon);
        expect(useIntercom().show).toHaveBeenCalled();
        expect(useIntercom().boot).toHaveBeenCalled();
    });

    it('calls handleShowTooltipPopup on view scope button click', () => {
        const { baseElement } = render(
            <ExpandedStepperNavigation
                title="Test Title"
                isTitleSection
                isShowIconInfo
                tooltipInfoContent="Test tooltip content"
            />,
        );
        const titleElement = screen.getByDisplayValue('Test Title');
        expect(titleElement).toBeInTheDocument();

        const viewScopeButton = baseElement.querySelector(
            '.icon-info',
        ) as HTMLElement;
        fireEvent.click(viewScopeButton);
        expect(usePopup().open).toHaveBeenCalled();
    });

    it('calls handleShowTooltipPopup on view scope button click', () => {
        const { baseElement } = render(
            <ExpandedStepperNavigation
                title="Test Title"
                isTitleSection
                isShowIconInfo
                isShowLinkInfo
                tooltipInfoContent="Test tooltip content"
                estimation="Test estimation"
                readOnly
            />,
        );
        const titleElement = screen.getByText('Test Title');
        expect(titleElement).toBeInTheDocument();

        const estimationElement = screen.getByText('Test estimation');
        expect(estimationElement).toBeInTheDocument();

        const infoButton = baseElement.querySelector(
            '.icon-info',
        ) as HTMLElement;
        fireEvent.click(infoButton);
        expect(usePopup().open).toHaveBeenCalled();

        const viewScopeButton = screen.getByTestId('button-container');
        fireEvent.click(viewScopeButton);
        expect(usePopup().open).toHaveBeenCalled();
    });

    it('calls handleLogout on logout menu item click', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: true,
        }));
        render(<ExpandedStepperNavigation title="Test Title" isNewNav />);
        const logoutMenuItem = screen.getByText('Log out');
        fireEvent.click(logoutMenuItem);
        expect(logout).toHaveBeenCalled();
    });

    it('calls handleLogout on projects menu item click', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: true,
        }));
        render(<ExpandedStepperNavigation title="Test Title" isNewNav />);
        const projectsMenuItem = screen.getByText('Projects');
        fireEvent.click(projectsMenuItem);
        expect(useRouter().push).toHaveBeenCalled();
    });

    it('calls handleLogout on profile menu item click', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: true,
        }));
        render(<ExpandedStepperNavigation title="Test Title" isNewNav />);
        const profileMenuItem = screen.getByText('Profile');
        fireEvent.click(profileMenuItem);
        expect(useRouter().push).toHaveBeenCalled();
    });

    it('calls handleLogout on logout menu item click', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: true,
        }));
        const { baseElement } = render(
            <ExpandedStepperNavigation title="Test Title" />,
        );

        const titleElement = screen.getByDisplayValue('Test Title');
        expect(titleElement).toBeInTheDocument();

        const dropdown = baseElement.querySelector(
            '.drop-button',
        ) as HTMLElement;
        expect(dropdown).toBeInTheDocument();

        const chatMenuItem = screen.getByText('Book a chat');
        fireEvent.click(chatMenuItem);
        expect(useIntercom().show).toHaveBeenCalled();
        expect(useIntercom().boot).toHaveBeenCalled();

        const callMenuItem = screen.getByText('Book a call');
        fireEvent.click(callMenuItem);
        expect(usePopup().open).toHaveBeenCalled();
    });
});
