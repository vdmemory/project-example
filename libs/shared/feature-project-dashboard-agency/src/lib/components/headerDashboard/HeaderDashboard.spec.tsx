import { render, screen } from '@testing-library/react';
import HeaderDashboard from './HeaderDashboard';
import {
    ProjectAgencyActionStatuses,
    ProjectClientActionStatuses,
} from '@breef/shared/constants';
import { MockProjectDashboardProvider } from '../../store/mockStore';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import * as nextRouter from 'next/router';
import { NextRouter } from 'next/dist/shared/lib/router/router';

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: { tab: '' },
            asPath: '',
        };
    },
}));
const useRouter = jest.spyOn(nextRouter, 'useRouter');
const router = useRouter.getMockImplementation()?.() as NextRouter;

const renderHeaderDashboardClient = (
    actionValue: ProjectClientActionStatuses,
) => {
    return (
        <RouterContext.Provider value={router}>
            <MockProjectDashboardProvider>
                <HeaderDashboard type="client" actionValue={actionValue} />
            </MockProjectDashboardProvider>
        </RouterContext.Provider>
    );
};

const renderHeaderDashboardAgency = (
    actionValue: ProjectAgencyActionStatuses,
) => {
    return (
        <RouterContext.Provider value={router}>
            <MockProjectDashboardProvider>
                <HeaderDashboard type="agency" actionValue={actionValue} />
            </MockProjectDashboardProvider>
        </RouterContext.Provider>
    );
};

describe('HeaderDashboard', () => {
    it('should render client header dashboard successfully', () => {
        const { baseElement } = render(
            renderHeaderDashboardClient(
                ProjectClientActionStatuses.postProject,
            ),
        );
        expect(baseElement).toBeTruthy();
        expect(screen.getAllByText(/POST PROJECT/gi)).toBeTruthy();
        expect(screen.getAllByText(/Post Project/gi)).toBeTruthy();

        render(
            renderHeaderDashboardClient(
                ProjectClientActionStatuses.reviewScope,
            ),
        );
        expect(screen.getAllByText(/Book Call/gi)).toBeTruthy();
        expect(screen.getAllByText(/Pitch Review Call/gi)).toBeTruthy();

        render(
            renderHeaderDashboardClient(
                ProjectClientActionStatuses.reviewPitches,
            ),
        );
        expect(screen.getAllByText(/REVIEW PITCHES/gi)).toBeTruthy();
        expect(screen.getAllByText(/Review Pitches/gi)).toBeTruthy();

        render(
            renderHeaderDashboardClient(
                ProjectClientActionStatuses.completeReview,
            ),
        );
        expect(screen.getAllByText(/COMPLETE REVIEW/gi)).toBeTruthy();
        expect(screen.getAllByText(/Review Pitches/gi)).toBeTruthy();

        render(
            renderHeaderDashboardClient(
                ProjectClientActionStatuses.shortlistAgencies,
            ),
        );
        expect(screen.getAllByText(/SHORTLIST AGENCIES/gi)).toBeTruthy();
        expect(screen.getAllByText(/Shortlist Agencies/gi)).toBeTruthy();

        render(
            renderHeaderDashboardClient(
                ProjectClientActionStatuses.setAvailability,
            ),
        );
        expect(screen.getAllByText(/SET AVAILABILITY/gi)).toBeTruthy();
        expect(screen.getAllByText(/Set Availability/gi)).toBeTruthy();

        render(
            renderHeaderDashboardClient(
                ProjectClientActionStatuses.updateAvailability,
            ),
        );
        expect(screen.getAllByText(/UPDATE AVAILABILITY/gi)).toBeTruthy();
        expect(screen.getAllByText(/Meet Agencies/gi)).toBeTruthy();

        render(
            renderHeaderDashboardClient(
                ProjectClientActionStatuses.selectAgency,
            ),
        );
        expect(screen.getAllByText(/SELECT AGENCY/gi)).toBeTruthy();
        expect(screen.getAllByText(/Agency Selection/gi)).toBeTruthy();

        render(
            renderHeaderDashboardClient(
                ProjectClientActionStatuses.awaitingKickoff,
            ),
        );
        expect(screen.getAllByText(/VIEW PROJECT/gi)).toBeTruthy();
        expect(screen.getAllByText(/Finalize Contract/gi)).toBeTruthy();

        render(
            renderHeaderDashboardClient(
                ProjectClientActionStatuses.completeKickoff,
            ),
        );
        expect(screen.getAllByText(/COMPLETE KICKOFF/gi)).toBeTruthy();
        expect(screen.getAllByText(/Complete Kickoff/gi)).toBeTruthy();

        render(
            renderHeaderDashboardClient(
                ProjectClientActionStatuses.viewProject,
            ),
        );
        expect(screen.getAllByText(/VIEW PROJECT/gi)).toBeTruthy();
        expect(screen.getAllByText(/Payment Due Soon/gi)).toBeTruthy();

        render(
            renderHeaderDashboardClient(
                ProjectClientActionStatuses.submitPayment,
            ),
        );
        expect(screen.getAllByText(/Make Payment/gi)).toBeTruthy();
        expect(screen.getAllByText(/Payment Due/gi)).toBeTruthy();

        render(
            renderHeaderDashboardClient(ProjectClientActionStatuses.completed),
        );
        expect(screen.getAllByText(/START PROJECT/gi)).toBeTruthy();
        render(renderHeaderDashboardClient(ProjectClientActionStatuses.other));
        expect(screen.getAllByText(/BROWSE ARTICLES/gi)).toBeTruthy();
    });

    it('should render agency header dashboard successfully', () => {
        const { baseElement } = render(
            renderHeaderDashboardAgency(
                ProjectAgencyActionStatuses.clientReview,
            ),
        );
        expect(baseElement).toBeTruthy();
        expect(screen.getAllByText(/Articles/gi));
        render(
            renderHeaderDashboardAgency(ProjectAgencyActionStatuses.introCall),
        );
        expect(screen.getAllByText(/Articles/gi)).toBeTruthy();
        render(
            renderHeaderDashboardAgency(
                ProjectAgencyActionStatuses.finalizeContract,
            ),
        );
        expect(screen.getAllByText(/Complete Kickoff/gi)).toBeTruthy();
        render(
            renderHeaderDashboardAgency(
                ProjectAgencyActionStatuses.paymentDetails,
            ),
        );
        expect(screen.getAllByText(/View Payments/gi)).toBeTruthy();
        render(
            renderHeaderDashboardAgency(
                ProjectAgencyActionStatuses.otherArticles,
            ),
        );
        expect(screen.getAllByText(/Articles/gi)).toBeTruthy();
    });
});
