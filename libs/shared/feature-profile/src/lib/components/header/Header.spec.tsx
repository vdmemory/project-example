import { TabsProfile } from '@breef/shared/constants';
import { render } from '@testing-library/react';
import HeaderProfile from './Header';

const tabsConfig = [
    {
        title: 'Account settings',
        tab: TabsProfile.settings,
        route: '/profile/settings',
    },
    {
        title: 'Company profile',
        tab: TabsProfile.profile,
        route: '/profile/profile',
    },
    {
        title: 'Team members',
        tab: TabsProfile.team,
        route: '/profile/team',
    },
    {
        title: 'Payments',
        tab: TabsProfile.payments,
        route: '/profile/payments',
    },
];

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: {},
            asPath: '',
        };
    },
}));

describe('HeaderProfile', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <HeaderProfile tabsConfig={tabsConfig} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('Your Profile')).toBeInTheDocument();
        expect(getByText('Account settings')).toBeInTheDocument();
        expect(getByText('Company profile')).toBeInTheDocument();
        expect(getByText('Team members')).toBeInTheDocument();
        expect(getByText('Payments')).toBeInTheDocument();
    });
});
