describe('ProjectScopeClient', () => {
    it('should render successfully', () => {
        //TODO: write tests
    });
});

// import { render } from '@testing-library/react';
// import ProjectScopeClient from './ProjectScopeClient';
// import { mockProjectData } from '@breef/shared/utils';
// import { MockProjectDashboardProvider } from '../../store/mockStore';
// import { CompanyRole } from '@breef/shared/constants';
// import { BrandLead, ServicesAndSkillsRequest } from '@breef/shared/types';

// const props = {
//     projectId: 1,
//     projectData: mockProjectData,
//     userType: 'client' as 'client' | 'agency',
//     companyInfoData: {
//         companyName: 'test company name',
//         officeLocations: [],
//         numberEmployees: '',
//         website: 'test.com',
//         industries: [],
//         twitter: '',
//         tiktok: '',
//         instagram: '',
//         companyOverview: '',
//         companySize: '',
//         logoUrl: '',
//         brandLead: {
//             brandLead: {
//                 companyType: 'client',
//                 helpText: 'test help text',
//                 id: 1,
//                 logoUrl: null,
//                 calendlyLink: 'calendly-link-test.com',
//             },
//             firstName: 'lead test first',
//             lastName: 'lead test last',
//             email: 'test@gmail.com',
//             id: 1,
//         },
//     },
//     isLoading: true,
// };
// describe('ProjectScopeClient', () => {
//     it('should render successfully', () => {
//         const { baseElement, getByTestId } = render(
//             <MockProjectDashboardProvider>
//                 <ProjectScopeClient {...props} />
//             </MockProjectDashboardProvider>,
//         );
//         expect(baseElement).toBeTruthy();
//         expect(getByTestId('page-loader')).toBeInTheDocument();
//     });
// });
