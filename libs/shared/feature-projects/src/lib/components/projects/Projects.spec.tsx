import { Projects, ProjectsProps } from './Projects';
import {
    Choice,
    Filters,
    INTERCOM_APP_ID,
    PitchProjectProgressBarStatuses,
    PitchProjectStatuses,
    ProjectAgencyActionStatuses,
    ProjectClientActionStatuses,
    ProjectProgressBarStatuses,
    ProjectStatuses,
} from '@breef/shared/constants';
import { mockConfiguredStore } from '../../store/mockStore';
import { Provider } from 'react-redux';
import { IntercomProvider } from 'react-use-intercom';
import { render } from '@testing-library/react';
import 'intersection-observer';

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: { step: '2' },
            asPath: '',
            push: () => null,
        };
    },
}));

const defaultProps = {
    selfData: {
        id: 1,
        email: 'email@gmail.com',
        firstName: 'UserFirstName',
        lastName: 'UserLastName',
        companyType: 'client',
        companyName: 'Test company name',
        isOnboardingComplete: true,
        isOldCompany: false,
        companyPosition: 'member',
        timeZone: '+3',
        hasSocialAccount: false,
        dateJoined: '22.05.2023',
    },
    isLoadingSelf: false,
    isSuccessSelf: true,
    isLoadingProject: false,
    configUser: [
        {
            label: 'Config User Label',
            note: 'Config User Note',
        },
    ],
    filterProjects: {
        status: Filters.active,
    },
    changeFilterProjects: jest.fn(),
    isFetchingProjects: false,
    projectsData: {
        pitchId: null,
        paymentId: null,
        kickoffId: null,
        acceptedTerms: false,
    },
    isLoadingCompanyInfo: false,
    isLoadingCtaData: false,
    companyInfoData: {
        companyName: 'Company Name',
        officeLocations: [],
        website: 'website',
        industries: [],
        twitter: '',
        tiktok: '',
        instagram: '',
        companyOverview: 'Company Description',
        logo: 1,
        logoUrl: 'logoUrl',
        brandLead: {
            id: 1,
            firstName: 'LeadFirstName',
            lastName: 'LeadLastName',
            email: 'leadmail@gmail.com',
            brandLead: {
                id: 1,
                companyType: '',
                helpText: 'help text',
                logoUrl: null,
                calendlyLink: 'link',
            },
        },
        tags: [{ id: 1, name: 'tag 1' }],
        docs: [{ id: 1, title: 'doc 1', link: 'doc-url.com' }],
        links: [{ id: 1, title: 'link 1', link: 'link-url.com' }],
        services: [
            {
                serviceId: 1,
                name: 'service 1',
                pricing: null,
                portfolio: [
                    {
                        clientName: 'Client Name',
                        clientWebsite: 'client-website.com',
                        projectName: 'Project Name',
                        startDateMonth: '1',
                        startDateYear: '2021',
                        projectDescription: 'Project Description',
                        clientTestimonial: 'Client Testimonial',
                        linkUrl: 'link-url.com',
                        documents: [
                            { id: 1, title: 'doc 1', link: 'doc-url.com' },
                        ],
                    },
                ],
            },
        ],
    },
    ctaData: {
        meta: {
            projectId: 1,
            projectsCount: 1,
        },
    },
};
const defaultClientProps = {
    ...defaultProps,
    role: 'client' as 'client' | 'agency',
    selfData: {
        ...defaultProps.selfData,
        companyType: 'client',
    },
    projectsData: [
        {
            ...defaultProps.projectsData,

            data: {
                id: 1,
                name: 'Test Project',
                status: ProjectStatuses.draft,
                progressBarStatus: ProjectProgressBarStatuses.projectPlanning,
                actionValue: ProjectClientActionStatuses.postProject,
                created: '22.05.2023',
                budget: Choice['100k-150k'],
            },
        },
    ],
    ctaData: {
        meta: defaultProps.ctaData.meta,
        actionValue: ProjectClientActionStatuses.postProject,
    },
};
const defaultAgencyProps = {
    ...defaultProps,
    role: 'agency' as 'client' | 'agency',
    selfData: {
        ...defaultProps.selfData,
        companyType: 'agency',
    },
    projectsData: [
        {
            ...defaultProps.projectsData,
            data: {
                id: 1,
                name: 'Test Project',
                status: PitchProjectStatuses.reviewProject,
                progressBarStatus:
                    PitchProjectProgressBarStatuses.reviewAndPitch,
                actionValue: ProjectAgencyActionStatuses.reviewAndPitch,
            },
        },
    ],
    ctaData: {
        ...defaultProps.ctaData.meta,
        actionValue: ProjectAgencyActionStatuses.reviewAndPitch,
    },
};

const ProjectsWrapper = (props: ProjectsProps) => {
    return (
        <IntercomProvider appId={INTERCOM_APP_ID}>
            <Provider store={mockConfiguredStore}>
                <Projects {...props} />
            </Provider>
        </IntercomProvider>
    );
};

describe('Projects', () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
        matches: false,
    }));
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <ProjectsWrapper {...defaultClientProps} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText(/Welcome, UserFirstName/g)).toBeInTheDocument();
        expect(getByText('Test Project')).toBeInTheDocument();
    });
    it('should display plug if no projects data', () => {
        const { getByText, getByTestId } = render(
            <ProjectsWrapper
                {...defaultClientProps}
                projectsData={[]}
                ctaData={{
                    ...defaultClientProps.ctaData,
                    meta: {
                        ...defaultClientProps.ctaData.meta,
                        projectsCount: 0,
                        projectsArchivedCount: 0,
                    },
                }}
            />,
        );
        expect(getByTestId('wrapper-info-boxes')).toBeInTheDocument();
        expect(getByText('Config User Label')).toBeInTheDocument();
        expect(getByText('Config User Note')).toBeInTheDocument();
        expect(getByText('The benefits of breef')).toBeInTheDocument();
    });
    it('should render successfully for client user role', () => {
        const { getByText, getAllByText } = render(
            <ProjectsWrapper {...defaultClientProps} />,
        );
        expect(getByText(/Your Strategist/i)).toBeInTheDocument();
        expect(
            getByText('What types of projects can I do with breef?'),
        ).toBeInTheDocument();
        const actionButtons = getAllByText(/Post Project/i);
        expect(actionButtons[0]).toBeInTheDocument();
        expect(actionButtons[1]).toBeInTheDocument();
    });
    it('should render successfully for agency user role', () => {
        const { getByText, getAllByText } = render(
            <ProjectsWrapper {...defaultAgencyProps} />,
        );
        expect(getByText(/YOUR COMMUNITY TEAM:/i)).toBeInTheDocument();
        expect(
            getByText(
                'What types of projects are shared with agencies on Breef?',
            ),
        ).toBeInTheDocument();
        const actionButtons = getAllByText(/Review project/i);
        expect(actionButtons[0]).toBeInTheDocument();
        expect(actionButtons[1]).toBeInTheDocument();
    });
});
