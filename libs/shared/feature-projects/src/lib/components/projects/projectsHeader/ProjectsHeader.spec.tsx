import { render, screen } from '@testing-library/react';
import { ProjectsHeader } from './ProjectsHeader';
import {
    DashboardAgencyActionStatuses,
    DashboardClientActionStatuses,
    ProjectAgencyActionStatuses,
    ProjectClientActionStatuses,
    INTERCOM_APP_ID,
} from '@breef/shared/constants';
import { Provider } from 'react-redux';
import { mockConfiguredStore } from '../../../store/mockStore';
import { IntercomProvider } from 'react-use-intercom';
import 'intersection-observer';

const props = {
    userFirstName: 'User Name',
    helpText: 'help text',
    logoUrl: null,
    leadFirstName: 'Lead First Name',
    leadLastName: 'Lead Last Name',
    projectsViewSettingsBarRef: { current: null },
    calendlyLink: 'calendly-test.com',
};

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: { tab: '', projectId: 123 },
            asPath: '/asPath',
        };
    },
}));

type MatchMediaMock = {
    matches: boolean;
    addEventListener: jest.Mock;
    removeEventListener: jest.Mock;
};

const matchMediaMock =
    (matches: boolean): (() => MatchMediaMock) =>
    () => ({
        matches,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
    });

const renderProjectsHeaderClient = (
    actionButtonValue:
        | DashboardClientActionStatuses
        | ProjectClientActionStatuses,
) => (
    <IntercomProvider appId={INTERCOM_APP_ID}>
        <Provider store={mockConfiguredStore}>
            <ProjectsHeader
                {...props}
                role="client"
                ctaData={{ actionValue: actionButtonValue }}
            />
        </Provider>
    </IntercomProvider>
);

const renderProjectsHeaderAgency = (
    actionButtonValue:
        | DashboardAgencyActionStatuses
        | ProjectAgencyActionStatuses,
) => (
    <IntercomProvider appId={INTERCOM_APP_ID}>
        <Provider store={mockConfiguredStore}>
            <ProjectsHeader
                {...props}
                role="agency"
                ctaData={{ actionValue: actionButtonValue }}
            />
        </Provider>
    </IntercomProvider>
);

describe('ProjectsHeader', () => {
    beforeEach(() => {
        window.matchMedia = matchMediaMock(false) as unknown as (
            query: string,
        ) => MediaQueryList;
    });
    it('should render action tip with client role successfully', () => {
        const { baseElement } = render(
            renderProjectsHeaderClient(ProjectClientActionStatuses.postProject),
        );
        expect(baseElement).toBeTruthy();
        expect(screen.getAllByText(/POST PROJECT/gi)).toBeTruthy();

        render(
            renderProjectsHeaderClient(ProjectClientActionStatuses.reviewScope),
        );
        expect(screen.getAllByText(/Book Call/gi)).toBeTruthy();

        render(
            renderProjectsHeaderClient(
                ProjectClientActionStatuses.reviewPitches,
            ),
        );
        expect(screen.getAllByText(/REVIEW PITCHES/gi)).toBeTruthy();

        render(
            renderProjectsHeaderClient(
                ProjectClientActionStatuses.completeReview,
            ),
        );
        expect(screen.getAllByText(/COMPLETE REVIEW/gi)).toBeTruthy();

        render(
            renderProjectsHeaderClient(
                ProjectClientActionStatuses.shortlistAgencies,
            ),
        );
        expect(screen.getAllByText(/SHORTLIST AGENCIES/gi)).toBeTruthy();

        render(
            renderProjectsHeaderClient(
                ProjectClientActionStatuses.setAvailability,
            ),
        );
        expect(screen.getAllByText(/SET AVAILABILITY/gi)).toBeTruthy();

        render(
            renderProjectsHeaderClient(
                ProjectClientActionStatuses.updateAvailability,
            ),
        );
        expect(screen.getAllByText(/UPDATE AVAILABILITY/gi)).toBeTruthy();

        render(
            renderProjectsHeaderClient(
                ProjectClientActionStatuses.selectAgency,
            ),
        );
        expect(screen.getAllByText(/SELECT AGENCY/gi)).toBeTruthy();

        render(
            renderProjectsHeaderClient(
                ProjectClientActionStatuses.awaitingKickoff,
            ),
        );
        expect(screen.getAllByText(/VIEW PROJECT/gi)).toBeTruthy();

        render(
            renderProjectsHeaderClient(
                ProjectClientActionStatuses.completeKickoff,
            ),
        );
        expect(screen.getAllByText(/COMPLETE KICKOFF/gi)).toBeTruthy();

        render(
            renderProjectsHeaderClient(ProjectClientActionStatuses.viewProject),
        );
        expect(screen.getAllByText(/VIEW PROJECT/gi)).toBeTruthy();

        render(
            renderProjectsHeaderClient(
                ProjectClientActionStatuses.submitPayment,
            ),
        );
        expect(screen.getAllByText(/Make Payment/gi)).toBeTruthy();

        render(
            renderProjectsHeaderClient(ProjectClientActionStatuses.completed),
        );
        expect(screen.getAllByText(/START PROJECT/gi)).toBeTruthy();

        render(renderProjectsHeaderClient(ProjectClientActionStatuses.other));
        expect(screen.getAllByText(/BROWSE ARTICLES/gi)).toBeTruthy();

        render(
            renderProjectsHeaderClient(
                DashboardClientActionStatuses.noProjects,
            ),
        );
        expect(screen.getAllByText(/START PROJECT/gi)).toBeTruthy();
    });
    it('should render action tip with agency role successfully', () => {
        const { baseElement } = render(
            renderProjectsHeaderAgency(
                DashboardAgencyActionStatuses.activeProjects,
            ),
        );
        expect(baseElement).toBeTruthy();
        expect(screen.getAllByText(/View Projects/gi)).toBeTruthy();
        render(
            renderProjectsHeaderAgency(DashboardAgencyActionStatuses.signUp),
        );
        expect(screen.getAllByText(/Articles/gi)).toBeTruthy();
        render(
            renderProjectsHeaderAgency(
                DashboardAgencyActionStatuses.incompleteProfile,
            ),
        );
        expect(screen.getAllByText(/Settings/gi)).toBeTruthy();

        render(
            renderProjectsHeaderAgency(
                ProjectAgencyActionStatuses.reviewAndPitch,
            ),
        );
        expect(screen.getAllByText(/Review project/gi)).toBeTruthy();
        render(
            renderProjectsHeaderAgency(
                ProjectAgencyActionStatuses.finalizeAndSubmit,
            ),
        );
        expect(screen.getAllByText(/Review project/gi)).toBeTruthy();
        render(
            renderProjectsHeaderAgency(
                ProjectAgencyActionStatuses.clientReview,
            ),
        );
        expect(screen.getAllByText(/Articles/gi)).toBeTruthy();
        render(
            renderProjectsHeaderAgency(ProjectAgencyActionStatuses.introCall),
        );
        expect(screen.getAllByText(/Articles/gi)).toBeTruthy();
        render(
            renderProjectsHeaderAgency(
                ProjectAgencyActionStatuses.finalizeContract,
            ),
        );
        expect(screen.getAllByText(/Complete Kickoff/gi)).toBeTruthy();
        render(
            renderProjectsHeaderAgency(
                ProjectAgencyActionStatuses.paymentDetails,
            ),
        );
        expect(screen.getAllByText(/View Payments/gi)).toBeTruthy();
        render(
            renderProjectsHeaderAgency(ProjectAgencyActionStatuses.notChosen),
        );
        expect(
            screen.getAllByText(
                /Sorry, but the client has chosen another team for this project./gi,
            ),
        ).toBeTruthy();
        render(
            renderProjectsHeaderAgency(
                ProjectAgencyActionStatuses.otherArticles,
            ),
        );
        expect(screen.getAllByText(/Articles/gi)).toBeTruthy();
    });
});
