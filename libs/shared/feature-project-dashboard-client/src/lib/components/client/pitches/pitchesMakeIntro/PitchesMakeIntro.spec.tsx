import { render } from '@testing-library/react';
import { PitchesMakeIntro } from './PitchesMakeIntro';
import {
    BudgetType,
    Choice,
    INTERCOM_APP_ID,
    ProjectClientActionStatuses,
    ProjectCreationStepsEnum,
    ProjectProgressBarStatuses,
    ProjectStatuses,
} from '@breef/shared/constants';
import { MockDashboardProvider } from '../../../../store/mockStore';
import { ProjectByIdType } from '@breef/shared/types';
import { IntercomProvider } from 'react-use-intercom';
import 'intersection-observer';

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: {},
            asPath: '',
            push: jest.fn(),
        };
    },
}));

const props = {
    isUpdateAvailability: false,
    agencies: [
        {
            id: 1,
            logoUrl:
                'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg',
            name: 'test company',
            location: 'test location',
            schedule: false,
            isShortlisted: true,
            pitchId: 1,
        },
    ],
    projectId: 1,
    handleBack: jest.fn(),
    companyName: 'Company Name',
    projectData: {
        id: 1,
        name: 'test project',
        companyLocation: 'test location',
        startDay: 'today',
        description: 'test dexcription',
        agencySkills: [
            {
                id: 1,
                name: 'skill',
                note: 'note',
            },
        ],
        budgetRange: Choice.less_then_fifty,
        budgetType: BudgetType.EntireProject,
        agencyLocation: 'agency location',
        agencyPreferences: [{ id: 1, name: 'preference 1' }],
        openToRemoteAgencies: false,

        companyDescription: 'company description',
        companyWebsite: 'test.com',
        files: [],
        brandLinks: [],
        socialLinks: [],
        progressBarStatus: ProjectProgressBarStatuses.pitchReview,
        actionValue: ProjectClientActionStatuses.reviewPitches,
        currentPaymentId: 1,
        status: ProjectStatuses.inCuration,
        step: ProjectCreationStepsEnum.Review,
        isAvailabilityCreated: false,
    } as unknown as ProjectByIdType,
    clientBrandLead: {
        name: 'test name',
        logo: 'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg',
    },
};

describe('PitchesChoiceShortlisted', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <MockDashboardProvider>
                <IntercomProvider appId={INTERCOM_APP_ID}>
                    <PitchesMakeIntro {...props} />
                </IntercomProvider>
            </MockDashboardProvider>,
        );
        expect(baseElement).toBeTruthy();
    });

    describe('Elements render PitchesChoiceShortlisted', () => {
        const testCases = [
            { name: 'project name', expected: 'test project' },
            { name: 'project details button', expected: 'View Scope' },
            { name: 'label sidebar', expected: 'Here’s what’s next' },
            { name: 'title box info to sidebar', expected: 'Agency Intros' },
            {
                name: 'description box info in sidebar',
                expected: /Confirm the agencies/i,
            },
            { name: 'brand-lead-name', expected: 'test name' },
            { name: 'brand-lead-label', expected: 'Here’s what’s next' },
            { name: 'title one agency table', expected: 'AGENCY' },
            { name: 'title two agency table', expected: 'Meet With Agency?' },
            { name: 'company name to card', expected: 'test company' },
            { name: 'company location in card', expected: 'test location' },
            { name: 'pitch details button to card', expected: 'View Pitch' },
            { name: 'prev button to navigation block', expected: 'pitches' },
            {
                name: 'next button to navigation block',
                expected: 'Schedule Calls',
            },
        ];

        testCases.forEach(testCase => {
            it(`should render successfully ChoiceOfInterestForm with ${testCase.name}`, () => {
                const { getByText } = render(
                    <MockDashboardProvider>
                        <IntercomProvider appId={INTERCOM_APP_ID}>
                            <PitchesMakeIntro {...props} />
                        </IntercomProvider>
                    </MockDashboardProvider>,
                );
                const element = getByText(testCase.expected);
                expect(element).toBeInTheDocument();
            });
        });
    });

    it('should render successfully checkbox in agency card', () => {
        const { getByTestId } = render(
            <MockDashboardProvider>
                <IntercomProvider appId={INTERCOM_APP_ID}>
                    <PitchesMakeIntro {...props} />
                </IntercomProvider>
            </MockDashboardProvider>,
        );
        const logoElement = getByTestId('input-checkbox');
        expect(logoElement).toBeInTheDocument();
    });

    it('should render successfully Logo', () => {
        render(
            <MockDashboardProvider>
                <IntercomProvider appId={INTERCOM_APP_ID}>
                    <PitchesMakeIntro {...props} />
                </IntercomProvider>
            </MockDashboardProvider>,
        );

        const element = document.querySelector('img');
        const src = element?.getAttribute('src');
        expect(src).toBeTruthy();
    });
});
