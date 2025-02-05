import { render } from '@testing-library/react';
import Dashboard from './Dashboard';
import { MockDashboardProvider } from '../store/mockStore';

//TODO: write tests

const props = {
    role: 'client' as 'client' | 'agency',
};
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

describe('ProjectDashboard', () => {
    it('should render successfully', () => {
        const { baseElement, getByTestId } = render(
            <MockDashboardProvider>
                hello
                {/* <Dashboard {...props} /> */}
            </MockDashboardProvider>,
        );

        expect(baseElement).toBeTruthy();
        // expect(getByTestId('page-loader')).toBeInTheDocument();
    });
});
