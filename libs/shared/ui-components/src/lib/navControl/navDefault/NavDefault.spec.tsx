import { fireEvent, render, screen } from '@testing-library/react';
import { NavDefault } from './NavDefault';
import { useIntercom } from 'react-use-intercom';
import { usePopup } from '../../popup/usePopup';
import { logout } from '@breef/shared/utils';
import {
    useMediaContext,
    useRouteControl,
    useWindowSize,
} from '@breef/shared/hooks';
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
    pathname: '/projects',
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

jest.mock('@breef/shared/data-access-profile', () => ({
    __esModule: true,
    ...jest.requireActual('@breef/shared/data-access-profile'),
    useGetCompanyInfoQuery: () => ({
        data: {
            id: 1,
            email: 'hello',
            companyName: 'Test Company',
            companyType: 'client',
            companyPosition: 'owner',
            timeZone: 'Kiev',
            hasSocialAccount: false,
            dateJoined: '13.12.23',
        },
        isLoading: false,
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

const changePage = jest.fn();
(useRouteControl as jest.Mock).mockImplementation(() => ({
    changePage,
}));

(useWindowSize as jest.Mock).mockReturnValue({
    width: 1024,
    height: 720,
});

afterAll(() => {
    jest.resetAllMocks();
});

describe('ExpandedNavigation', () => {
    it('renders with title', () => {
        const { baseElement } = render(<NavDefault />);
        const logoElement = baseElement.querySelector('.logo');
        expect(logoElement).toBeInTheDocument();
    });

    it('renders with text and icons', () => {
        const { baseElement } = render(<NavDefault />);

        const logoLink = baseElement.querySelector('.logo a.active');
        const projectsLink = screen.getByText('Projects');
        const profileLink = screen.getByText('Profile');
        const logoutNameBtn = screen.getByText('Log out');
        const logoutButton = baseElement.querySelector('.button-logout');
        const startProjectNameBtn = screen.getByText('Start project');
        const startProjectButton = baseElement.querySelector('.small-accent');

        expect(logoLink).toBeInTheDocument();
        expect(projectsLink).toBeInTheDocument();
        expect(profileLink).toBeInTheDocument();
        expect(logoutNameBtn).toBeInTheDocument();
        expect(logoutButton).toBeInTheDocument();
        expect(startProjectNameBtn).toBeInTheDocument();
        expect(startProjectButton).toBeInTheDocument();
    });

    it('should call logout on click', () => {
        render(<NavDefault />);
        const logoutButton = screen.getByText('Log out');
        fireEvent.click(logoutButton);
        expect(logout).toHaveBeenCalled();
    });

    it('should call push on click', () => {
        render(<NavDefault />);
        const startProjectButton = screen.getByText('Start project');
        fireEvent.click(startProjectButton);
        expect(changePage).toHaveBeenCalled();
    });

    it('should call push on click projectsLink', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: true,
        }));
        const { baseElement } = render(<NavDefault />);
        const liProjects = baseElement.querySelector(
            'li[value="projects"]',
        ) as HTMLElement;
        expect(liProjects).toBeInTheDocument();

        fireEvent.click(liProjects);
        expect(useRouter().push).toHaveBeenCalled();
    });

    it('should call push on click profileLink', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: true,
        }));
        const { baseElement } = render(<NavDefault />);
        const liProfile = baseElement.querySelector(
            'li[value="profile"]',
        ) as HTMLElement;
        expect(liProfile).toBeInTheDocument();

        fireEvent.click(liProfile);
        expect(useRouter().push).toHaveBeenCalled();
    });

    it('should call push on click logoLink', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: true,
        }));
        const { baseElement } = render(<NavDefault />);
        const liLogout = baseElement.querySelector(
            'li[value="logout"]',
        ) as HTMLElement;
        expect(liLogout).toBeInTheDocument();

        fireEvent.click(liLogout);
        expect(logout).toHaveBeenCalled();
    });
});
