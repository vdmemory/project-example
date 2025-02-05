import { render } from '@testing-library/react';
import MyPitchTab from './MyPitchTab';
import { MockProjectDashboardProvider } from '../../../store/mockStore';

const props = {
    pitchId: 1,
    projectId: 1,
    projectName: 'Test Project',
    skills: [],
};
describe('MyPitchTab', () => {
    it('should render successfully', () => {
        const { baseElement, getByTestId } = render(
            <MockProjectDashboardProvider>
                <MyPitchTab {...props} userType="client" />
            </MockProjectDashboardProvider>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByTestId('page-loader')).toBeInTheDocument();
    });
});
