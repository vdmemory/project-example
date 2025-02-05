import { fireEvent, render, screen } from '@testing-library/react';
import { PublicStartProjectPopup } from './PublicStartProjectPopup';
import { useRouter } from 'next/router';
import { useMediaContext, useWindowSize } from '@breef/shared/hooks';
import { logout } from '@breef/shared/utils';
import 'intersection-observer';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));
(useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
});

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

const brandLead = {
    brandLead: {
        companyType: 'Brand',
        helpText:
            'Once your project is posted, you’ll receive custom agency pitches in < 5 days.',
        id: 1,
        logoUrl: 'https://breef.io/wp-content/uploads/2021/08/brand-logo.png',
        calendlyLink: 'https://calendly.com/breef/30min',
    },
    firstName: 'Breef',
    lastName: 'Team',
    email: 'breef@gmail.com',
    id: 1,
};

const onClick = jest.fn();
const props = {
    onClick,
    lead: brandLead,
};
describe('PublicStartProjectPopup', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<PublicStartProjectPopup {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('Projects')).toBeInTheDocument();
        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Log out')).toBeInTheDocument();
        expect(screen.getByText('What to expect:')).toBeInTheDocument();
        expect(
            screen.getByText('Expert marketing support'),
        ).toBeInTheDocument();
        expect(screen.getByText('Seamless agency search')).toBeInTheDocument();
        expect(screen.getByText('Review Your Scope')).toBeInTheDocument();
        expect(screen.getByText('Review Scope')).toBeInTheDocument();
        expect(
            screen.getByText(
                'We’ve written a project scope, based on your brand + goals.',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Post Project')).toBeInTheDocument();
        expect(
            screen.getByText(
                'We’ll invite agencies to submit pitches for your project.',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Get Pitches')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Receive 5-7 agency pitches, curated for your brand + goals.',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByTestId('wrapper-avatar-image')).toBeInTheDocument();
        expect(screen.getByText('Your Strategist')).toBeInTheDocument();
    });
    it('should call onClick successfully', () => {
        render(<PublicStartProjectPopup {...props} />);
        const button = document.querySelector('button.close-button');
        expect(button).not.toBe(null);
        fireEvent.click(button as Element);
        expect(onClick).toBeCalled();
    });

    it('should call onClick successfully', () => {
        render(<PublicStartProjectPopup {...props} />);
        const button = screen.getByTestId('button-container');
        expect(button).not.toBe(null);
        fireEvent.click(button as Element);
        expect(onClick).toBeCalled();
    });

    it('calls handleLogout on logout menu item click', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: true,
        }));
        render(<PublicStartProjectPopup {...props} />);
        expect(screen.getByText('Submit')).toBeInTheDocument();
        const logoutMenuItem = screen.getByText('Log out');
        fireEvent.click(logoutMenuItem);
        expect(logout).toHaveBeenCalled();
    });

    it('calls handleLogout on projects menu item click', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: true,
        }));
        render(<PublicStartProjectPopup {...props} />);
        const projectsMenuItem = screen.getByText('Projects');
        fireEvent.click(projectsMenuItem);
        expect(useRouter().push).toHaveBeenCalled();
    });

    it('calls handleLogout on profile menu item click', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: true,
        }));
        render(<PublicStartProjectPopup {...props} />);
        const profileMenuItem = screen.getByText('Profile');
        fireEvent.click(profileMenuItem);
        expect(useRouter().push).toHaveBeenCalled();
    });
});
