import { render, screen, fireEvent } from '@testing-library/react';
import { YourBreefRep, YourBreefRepProps } from './YourBreefRep';
import { useIntercom } from 'react-use-intercom';
import 'intersection-observer';

jest.mock('react-use-intercom');
(useIntercom as jest.Mock).mockReturnValue({
    show: jest.fn(),
    hide: jest.fn(),
    boot: jest.fn(),
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

describe('YourBreefRep', () => {
    const defaultProps: YourBreefRepProps = {
        userFirstName: 'John',
        helpText: 'Hello {user}, how can we help you?',
        logoUrl: null,
        leadFirstName: 'Jane',
        leadLastName: 'Doe',
        calendlyLink: 'https://calendly.com/test',
        role: 'client',
    };

    it('renders correctly with given props', () => {
        render(<YourBreefRep {...defaultProps} />);

        expect(screen.getByText('Your BRAND LEAD')).toBeInTheDocument();
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
        expect(
            screen.getByText('Hello John, how can we help you?'),
        ).toBeInTheDocument();
        expect(screen.getByAltText('Rock&Roll')).toHaveAttribute('src', 'src');
    });
});
