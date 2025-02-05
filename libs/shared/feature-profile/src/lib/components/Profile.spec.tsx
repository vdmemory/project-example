import { TabsProfile } from '@breef/shared/constants';
import { render } from '@testing-library/react';
import { MockProfileProvider } from '../utils/mockData.ts/mockProfileProvider';
import Profile from './Profile';

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

const config = [
    {
        title: 'Account settings',
        tab: 'account-settings' as TabsProfile,
        route: '/account-settings',
    },
];
describe('Profile', () => {
    it('should render successfully', () => {
        const { baseElement, getByTestId, getByText } = render(
            <MockProfileProvider>
                <Profile tabsConfig={config}>Content</Profile>
            </MockProfileProvider>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByTestId('profile-content-wrapper')).toBeInTheDocument();
        expect(getByText('Account settings'));
        expect(getByText('Content'));
    });
});
