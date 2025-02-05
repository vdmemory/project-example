import { apiPitchCreate } from '@breef/shared/data-access-pitch-create';
import { apiProjectCreate } from '@breef/shared/data-access-project-create';
import { PitchPreviewResponse } from '@breef/shared/types';
import pitchPreviewReducer from '../../store/pitchPreviewSlice';
import { configureStore } from '@reduxjs/toolkit';
import { render, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState } from '../../store/pitchPreviewSlice';
import SideBar from './SideBar';

type PitchPreviewSliceType = {
    shortProjectInfo: {
        clientName: string;
        name: string;
        budgetRange: string;
        budgetType: string;
        kickoff: string;
        requiredSkills: number[];
        agencyPreferences: {
            location: string;
            preferences: string[];
            advantages: string[];
        };
    };
    pitchPreview: PitchPreviewResponse;
};

const capabilities = [
    {
        id: 25,
        name: 'Animation',
    },
];

const mockConfiguredStore = configureStore({
    reducer: {
        [apiProjectCreate.reducerPath]: apiProjectCreate.reducer,
        [apiPitchCreate.reducerPath]: apiPitchCreate.reducer,
        pitchPreview: pitchPreviewReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            apiProjectCreate.middleware,
            apiPitchCreate.middleware,
        ),
    preloadedState: {
        pitchPreview: {
            ...initialState,
            ...{
                shortProjectInfo: {
                    clientName: 'test company',
                    name: 'welcome',
                    budgetRange: '5k-7k',
                    budgetType: 'monthly',
                    kickoff: 'one_two_weeks',
                    requiredSkills: [25],
                    agencyPreferences: {
                        location: 'Houston',
                        preferences: ['Industry Experience'],
                        advantages: [],
                    },
                },
            },
        } as PitchPreviewSliceType,
    },
});

jest.mock('@breef/shared/data-access-pitch-create', () => ({
    __esModule: true,
    ...jest.requireActual('@breef/shared/data-access-pitch-create'),
    useGetCapabilitiesQuery: () => ({
        data: capabilities,
        isLoading: false,
    }),
}));

beforeEach(async () => {
    await waitFor(async () => {
        render(
            <Provider store={mockConfiguredStore}>
                <SideBar />
            </Provider>,
        );
    });
});

afterAll(() => {
    jest.resetAllMocks();
});

describe('SideBar', () => {
    describe('SideBar when data uploaded', () => {
        it('should render successfully when data uploaded', async () => {
            const sideBar = await waitFor(() => {
                return screen.getByTestId('side-bar');
            });
            expect(sideBar).toBeTruthy();
        });

        describe('Elements render SideBar', () => {
            const testCases = [
                { name: 'title', expected: 'Project Overview' },
                { name: 'link button', expected: 'View Scope' },
                { name: 'client name block title', expected: 'Client Name' },
                { name: 'client name block content', expected: 'test company' },
                { name: 'project name block title', expected: 'Client Name' },
                { name: 'project name block content', expected: 'welcome' },
                { name: 'budget block title', expected: 'Monthly Budget' },
                { name: 'budget block content', expected: '$5K-$7K' },
                {
                    name: 'project kickoff block title',
                    expected: 'Project Kickoff',
                },
                {
                    name: 'required skills block title',
                    expected: 'Required Skills',
                },
                {
                    name: 'Agency Preferences block title',
                    expected: 'Agency Preferences',
                },
                {
                    name: 'location block content',
                    expected: 'Location: Houston',
                },
                {
                    name: 'preferences block content',
                    expected: 'Industry Experience',
                },
            ];

            testCases.forEach(testCase => {
                it(`should render successfully SideBar with ${testCase.name}`, async () => {
                    const element = await waitFor(() =>
                        screen.getByText(testCase.expected),
                    );
                    expect(element).toBeInTheDocument();
                });
            });
        });
    });
});
