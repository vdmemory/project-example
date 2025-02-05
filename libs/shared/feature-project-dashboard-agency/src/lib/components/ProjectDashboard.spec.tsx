import { render } from '@testing-library/react';
import ProjectDashboard from './ProjectDashboard';
import { MockProjectDashboardProvider } from '../store/mockStore';

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
            <MockProjectDashboardProvider>
                <ProjectDashboard {...props} />
            </MockProjectDashboardProvider>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByTestId('page-loader')).toBeInTheDocument();
    });
});
