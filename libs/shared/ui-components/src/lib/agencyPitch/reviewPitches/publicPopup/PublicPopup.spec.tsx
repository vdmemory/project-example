import { fireEvent, render, screen } from '@testing-library/react';
import { PublicPopup } from './PublicPopup';
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
describe('PublicPopup', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<PublicPopup {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('What to expect:')).toBeInTheDocument();
        expect(
            screen.getByText('Custom pitches from vetted agencies'),
        ).toBeInTheDocument();
        expect(screen.getByText('Seamless agency search')).toBeInTheDocument();
        expect(screen.getByText('Expert project support')).toBeInTheDocument();
        expect(screen.getByText('Review Pitches')).toBeInTheDocument();
        expect(
            screen.getByText('Learn more about each agency.'),
        ).toBeInTheDocument();
        expect(screen.getByText('Shortlist Agencies')).toBeInTheDocument();
        expect(
            screen.getByText('Select the agencies you’d like to meet with.'),
        ).toBeInTheDocument();
        expect(screen.getByText('Schedule Intros')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Share your availability — we’ll arrange intro meetings.',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByTestId('wrapper-avatar-image')).toBeInTheDocument();
        expect(screen.getByText('Your Strategist')).toBeInTheDocument();
    });
    it('should call onClick successfully', () => {
        render(<PublicPopup {...props} />);
        const button = document.querySelector('button.close-button');
        expect(button).not.toBe(null);
        fireEvent.click(button as Element);
        expect(onClick).toBeCalled();
    });

    it('should call onClick successfully', () => {
        render(<PublicPopup {...props} />);
        const button = screen.getByTestId('button-container');
        expect(button).not.toBe(null);
        fireEvent.click(button as Element);
        expect(onClick).toBeCalled();
    });
});
