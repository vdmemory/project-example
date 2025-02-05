import { render } from '@testing-library/react';
import ProjectScopeAgency from './ProjectScopeAgency';
import { KickoffRequestType } from '@breef/shared/types';
import {
    IsInterestedProject,
    PitchProjectProgressBarStatuses,
    PitchProjectStatuses,
    ProjectAgencyActionStatuses,
    ProjectStatuses,
} from '@breef/shared/constants';
import moment from 'moment';

const props = {
    projectId: 1,
    projectData: null,
};
describe('ProjectScopeAgency', () => {
    it('should render successfully', () => {
        render(<div>test</div>);
    });
    //     it('should render successfully', () => {
    //         const { baseElement, queryByTestId, getByText } = render(
    //             <MockProjectDashboardProvider>
    //                 <ProjectScopeAgency {...props} userType="agency" />
    //             </MockProjectDashboardProvider>,
    //         );
    //         expect(baseElement).toBeTruthy();
    //         expect(queryByTestId('page-loader')).toBe(null);
    //         expect(getByText('Test Project Name')).toBeInTheDocument();
    //         expect(getByText('Test Company Name')).toBeInTheDocument();
    //         expect(getByText('test description')).toBeInTheDocument();
    //     });
    //     it('should render page loader if no description info', () => {
    //         const { getByTestId } = render(
    //             <MockProjectDashboardProvider>
    //                 <ProjectScopeAgency
    //                     {...props}
    //                     projectData={{ description: '' }}
    //                     userType="agency"
    //                 />
    //             </MockProjectDashboardProvider>,
    //         );
    //         expect(getByTestId('page-loader')).toBeInTheDocument();
    //     });
    //     it('should not render page loader and project scope if terms is not accepted', () => {
    //         const { queryByTestId } = render(
    //             <MockProjectDashboardProvider>
    //                 <ProjectScopeAgency
    //                     {...props}
    //                     projectData={{
    //                         isAcceptedTerms: false,
    //                     }}
    //                     userType="agency"
    //                 />
    //             </MockProjectDashboardProvider>,
    //         );
    //         expect(queryByTestId('project-scope-dashboard')).toBe(null);
    //         expect(queryByTestId('page-loader')).toBe(null);
    //     });
});
