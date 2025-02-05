import { fireEvent, render, screen } from '@testing-library/react';

import { Project } from './Project';
import {
    PitchProjectStatuses,
    ProjectAgencyActionStatuses,
    ProjectClientActionStatuses,
    ProjectProgressBarStatuses,
    ProjectStatuses,
} from '@breef/shared/constants';
import { Provider } from 'react-redux';
import { mockConfiguredStore } from '../../../store/mockStore';
import { FilterProjectsType } from '@breef/shared/types';

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

const resetStateProjectCreate = jest.fn();
const handleRedirectToProjectListening = jest.fn();
const props = {
    data: {
        id: 0,
        status: 'draft' as ProjectStatuses | PitchProjectStatuses,
        actionValue: 'posted' as
            | ProjectClientActionStatuses
            | ProjectAgencyActionStatuses,
        progressBarStatus: ProjectProgressBarStatuses.projectPlanning,
        name: 'name',
        pitchCount: 0,
    },
    pitchId: 0,
    paymentId: 0,
    acceptedTerms: false,
    handleRedirectToProjectListening,
};

const renderProjectCardClient = (
    actionButtonValue: ProjectClientActionStatuses,
) => (
    <Provider store={mockConfiguredStore}>
        <Project
            {...props}
            idx={0}
            data={{
                ...props.data,
                status: 'draft' as ProjectStatuses,
                actionValue: actionButtonValue,
            }}
            role="client"
            filterProjects={{ status: 'in_progress' } as FilterProjectsType}
        />
    </Provider>
);

const renderProjectCardAgency = (
    actionButtonValue: ProjectAgencyActionStatuses,
) => (
    <Provider store={mockConfiguredStore}>
        <Project
            {...props}
            idx={0}
            data={{
                ...props.data,
                status: 'review_project' as PitchProjectStatuses,
                actionValue: actionButtonValue,
            }}
            role="agency"
            filterProjects={{ status: 'in_progress' } as FilterProjectsType}
        />
    </Provider>
);

describe('Project', () => {
    const originalMatchMedia = window.matchMedia;

    beforeEach(() => {
        window.matchMedia = matchMediaMock(false) as unknown as (
            query: string,
        ) => MediaQueryList;
    });

    afterEach(() => {
        window.matchMedia = originalMatchMedia;
    });
    describe('Client Project Card', () => {
        it('should render client project card correctly postProject status', () => {
            const { baseElement } = render(
                renderProjectCardClient(
                    ProjectClientActionStatuses.postProject,
                ),
            );
            expect(baseElement).toBeTruthy();
            expect(screen.getAllByText(/POST PROJECT/gi)).toBeTruthy();
        });

        it('should render client project card correctly reviewScope status', () => {
            render(
                renderProjectCardClient(
                    ProjectClientActionStatuses.reviewScope,
                ),
            );
            expect(screen.getAllByText(/Book Call/gi)).toBeTruthy();
        });

        it('should render client project card correctly reviewPitches status', () => {
            render(
                renderProjectCardClient(
                    ProjectClientActionStatuses.reviewPitches,
                ),
            );
            expect(screen.getAllByText(/REVIEW PITCHES/gi)).toBeTruthy();
        });

        it('should render client project card correctly completeReview status', () => {
            render(
                renderProjectCardClient(
                    ProjectClientActionStatuses.completeReview,
                ),
            );
            expect(screen.getAllByText(/COMPLETE REVIEW/gi)).toBeTruthy();
        });

        it('should render client project card correctly shortlistAgencies status', () => {
            render(
                renderProjectCardClient(
                    ProjectClientActionStatuses.shortlistAgencies,
                ),
            );
            expect(screen.getAllByText(/SHORTLIST AGENCIES/gi)).toBeTruthy();
        });

        it('should render client project card correctly setAvailability status', () => {
            render(
                renderProjectCardClient(
                    ProjectClientActionStatuses.setAvailability,
                ),
            );
            expect(screen.getAllByText(/SET AVAILABILITY/gi)).toBeTruthy();
        });

        it('should render client project card correctly updateAvailability status', () => {
            render(
                renderProjectCardClient(
                    ProjectClientActionStatuses.updateAvailability,
                ),
            );
            expect(screen.getAllByText(/UPDATE AVAILABILITY/gi)).toBeTruthy();
        });

        it('should render client project card correctly selectAgency status', () => {
            render(
                renderProjectCardClient(
                    ProjectClientActionStatuses.selectAgency,
                ),
            );
            expect(screen.getAllByText(/SELECT AGENCY/gi)).toBeTruthy();
        });

        it('should render client project card correctly completeKickoff status', () => {
            render(
                renderProjectCardClient(
                    ProjectClientActionStatuses.completeKickoff,
                ),
            );
            expect(screen.getAllByText(/AWAITING KICKOFF/gi)).toBeTruthy();
        });

        it('should render client project card correctly viewProject status', () => {
            render(
                renderProjectCardClient(
                    ProjectClientActionStatuses.viewProject,
                ),
            );
            expect(screen.getAllByText(/VIEW PROJECT/gi)).toBeTruthy();
        });

        it('should render client project card correctly submitPayment status', () => {
            render(
                renderProjectCardClient(
                    ProjectClientActionStatuses.submitPayment,
                ),
            );
            expect(screen.getAllByText(/Make Payment/gi)).toBeTruthy();
        });

        it('should render client project card correctly completed status', () => {
            render(
                renderProjectCardClient(ProjectClientActionStatuses.completed),
            );
            expect(screen.getAllByText(/START PROJECT/gi)).toBeTruthy();
        });

        it('should render client project card correctly other status', () => {
            render(renderProjectCardClient(ProjectClientActionStatuses.other));
            expect(screen.getAllByText(/BROWSE ARTICLES/gi)).toBeTruthy();
        });
    });

    describe('Client Project Card', () => {
        it('should render agency project card correctly reviewAndPitch status', () => {
            const { baseElement } = render(
                renderProjectCardAgency(
                    ProjectAgencyActionStatuses.reviewAndPitch,
                ),
            );
            expect(baseElement).toBeTruthy();
            expect(screen.getAllByText(/Review project/gi)).toBeTruthy();
        });

        it('should render agency project card correctly finalizeAndSubmit status', () => {
            render(
                renderProjectCardAgency(
                    ProjectAgencyActionStatuses.finalizeAndSubmit,
                ),
            );
            expect(screen.getAllByText(/Review project/gi)).toBeTruthy();
        });

        it('should render agency project card correctly clientReview status', () => {
            render(
                renderProjectCardAgency(
                    ProjectAgencyActionStatuses.clientReview,
                ),
            );
            expect(screen.getAllByText(/Articles/gi)).toBeTruthy();
        });

        it('should render agency project card correctly introCall status', () => {
            render(
                renderProjectCardAgency(ProjectAgencyActionStatuses.introCall),
            );
            expect(screen.getAllByText(/Articles/gi)).toBeTruthy();
        });

        it('should render agency project card correctly finalizeContract status', () => {
            render(
                renderProjectCardAgency(
                    ProjectAgencyActionStatuses.finalizeContract,
                ),
            );
            expect(screen.getAllByText(/Complete kickoff/gi)).toBeTruthy();
        });

        it('should render agency project card correctly paymentDetails status', () => {
            render(
                renderProjectCardAgency(
                    ProjectAgencyActionStatuses.paymentDetails,
                ),
            );
            expect(screen.getAllByText(/View Payments/gi)).toBeTruthy();
        });

        it('should render agency project card correctly notChosen status', () => {
            render(
                renderProjectCardAgency(ProjectAgencyActionStatuses.notChosen),
            );
            expect(
                screen.getAllByText(
                    /Sorry, but the client has chosen another team for this project./gi,
                ),
            ).toBeTruthy();
        });

        it('should render agency project card correctly completed status', () => {
            render(
                renderProjectCardAgency(ProjectAgencyActionStatuses.completed),
            );
            expect(screen.getAllByText(/Project Complete/gi)).toBeTruthy();
        });

        it('should render agency project card correctly closed status', () => {
            render(renderProjectCardAgency(ProjectAgencyActionStatuses.closed));
            expect(screen.getAllByText(/Project Closed/gi)).toBeTruthy();
        });

        it('should render agency project card correctly closed status', () => {
            render(
                renderProjectCardAgency(
                    ProjectAgencyActionStatuses.otherArticles,
                ),
            );
            expect(screen.getAllByText(/Articles/gi)).toBeTruthy();
        });
    });
});
