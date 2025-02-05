import { render, screen } from '@testing-library/react';
import { HeaderAuth } from './HeaderAuth';
import { SIGN_IN_ROUTE } from '@breef/shared/constants';
import { BreefPrimaryLogo } from '@breef/shared/assets';

import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

(useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
});

describe('HeaderAuth component', () => {
    it('renders HeaderAuth component with default linkLogo', () => {
        const { baseElement } = render(<HeaderAuth />);
        const logoLink = baseElement.querySelector('.link-logo');
        expect(logoLink).toHaveAttribute('href', SIGN_IN_ROUTE);
    });

    it('renders HeaderAuth component with custom linkLogo', () => {
        const customLink = '/custom-link';
        const { baseElement } = render(<HeaderAuth linkLogo={customLink} />);
        const logoLink = baseElement.querySelector('.link-logo');
        expect(logoLink).toHaveAttribute('href', customLink);
    });

    it('renders BreefPrimaryLogo component', () => {
        render(<HeaderAuth />);
        const logoElement = screen.getByTestId('breef-primary-logo');
        expect(logoElement).toBeInTheDocument();
    });
});
