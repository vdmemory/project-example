import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProjectCreate from './ProjectCreate';
import {
    useProjectCreateSelector,
    useProjectCreateActions,
} from '../../store/hooks';
import {
    useMediaContext,
    useRouteControl,
    useViewPassword,
} from '@breef/shared/hooks';
import { IntercomProvider } from 'react-use-intercom';
import { INTERCOM_APP_ID } from '@breef/shared/constants';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { apiProjectCreate } from '@breef/shared/data-access-project-create';
import { apiAuth } from '@breef/shared/data-access-auth';
import { apiPitchCreate } from '@breef/shared/data-access-pitch-create';
import projectCreateReducer from '../../store/projectCreateSlice';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { useStepperControl } from '../../hooks/useStepperControl';

jest.mock('../../store/hooks', () => ({
    useProjectCreateSelector: jest.fn(),
    useProjectCreateActions: jest.fn(),
}));
jest.mock('@breef/shared/hooks', () => ({
    useViewPassword: jest.fn(),
    useMediaContext: jest.fn(),
    useRouteControl: jest.fn(),
    useTargetElement: jest.fn(),
    useOnClickOutside: jest.fn(),
    useLimitSymbols: jest.fn(),
}));
jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: {},
            asPath: '',
            push: jest.fn(),
            replace: jest.fn(),
        };
    },
}));
jest.mock('../../hooks/useStepperControl', () => ({
    useStepperControl: jest.fn(),
}));

const mockSetStep = jest.fn();

jest.mock('react-google-autocomplete/lib/usePlacesAutocompleteService');
(useGoogle as jest.Mock).mockReturnValue({
    placePredictions: [],
    getPlacePredictions: jest.fn(),
    isPlacePredictionsLoading: false,
});

const ProjectDetailsStepWrapper = ({ store }: { store: ToolkitStore }) => {
    return (
        <Provider store={store}>
            <IntercomProvider appId={INTERCOM_APP_ID}>
                <ProjectCreate />
            </IntercomProvider>
        </Provider>
    );
};

const initialState = {
    projectCreate: {
        step: 1,
        profile: {
            companyName: null,
            brandLead: null,
        },
        user: { hasPassword: false },
        isSubmitting: false,
        isSubmittingSaveExit: false,
        isPenMode: false,
        targetElementId: null,
        isTooltipProjectOverview: true,
    },
};

const apiReducer = {
    [apiProjectCreate.reducerPath]: apiProjectCreate.reducer,
    [apiAuth.reducerPath]: apiAuth.reducer,
    [apiPitchCreate.reducerPath]: apiPitchCreate.reducer,
    projectCreate: projectCreateReducer,
};

const getMockStore = () => {
    const store = configureStore({
        reducer: {
            ...apiReducer,
            projectCreate: (state = initialState.projectCreate) => state,
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(apiProjectCreate.middleware),
    });
    return store;
};

describe('ProjectCreate', () => {
    let store: ToolkitStore;

    beforeEach(() => {
        store = getMockStore();
        (useProjectCreateSelector as jest.Mock).mockImplementation(selector =>
            selector(initialState),
        );
        (useProjectCreateActions as jest.Mock).mockReturnValue({
            setIsSubmitting: jest.fn(),
            resetPenMode: jest.fn(),
        });
        (useMediaContext as jest.Mock).mockReturnValue({ isMobile: false });
        (useRouteControl as jest.Mock).mockReturnValue({
            changePage: jest.fn(),
            queryParams: {},
            clearHistoryQueryParams: jest.fn(),
        });
        window.matchMedia = jest.fn().mockImplementation(() => ({
            matches: false,
        }));
        (useViewPassword as jest.Mock).mockReturnValue(() => ({
            typeInput: 'text',
            toggleTypeInput: jest.fn(),
        }));
        (useStepperControl as jest.Mock).mockReturnValue({
            step: 1,
            setStep: mockSetStep,
            handleNext: jest.fn(),
            handleBack: jest.fn(),
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the component without crashing', () => {
        render(<ProjectDetailsStepWrapper store={store} />);
        expect(screen.getByText('Project Scope')).toBeInTheDocument();
    });
});
