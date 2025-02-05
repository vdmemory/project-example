import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { GetStarted } from './GetStarted';
import { apiOnboarding } from '@breef/shared/data-access-onboarding';
import { configureStore } from '@reduxjs/toolkit';

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
const mockConfiguredStore = configureStore({
    reducer: {
        [apiOnboarding.reducerPath]: apiOnboarding.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiOnboarding.middleware),
});

describe('GetStarted with default type Client', () => {
    it('should render successfully GetStarted header', () => {
        const { baseElement } = render(
            <Provider store={mockConfiguredStore}>
                <GetStarted userType="client" close={() => null} />
            </Provider>,
        );
        expect(baseElement).toBeTruthy();
        expect(
            screen.getByText('The *easiest* way to find an agency...'),
        ).toBeInTheDocument();
    });
    it('should render successfully GetStarted cards with client config', () => {
        render(
            <Provider store={mockConfiguredStore}>
                <GetStarted userType="client" close={() => null} />
            </Provider>,
        );
        expect(
            screen.getByText('Plan, scope + post project'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Get pitches from vetted agencies'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Select team, start project'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Manage contracts + payments'),
        ).toBeInTheDocument();
    });
});

describe('GetStarted with default type Agency', () => {
    it('should render successfully GetStarted header', () => {
        const { baseElement } = render(
            <Provider store={mockConfiguredStore}>
                <GetStarted userType="agency" close={() => null} />
            </Provider>,
        );
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('Welcome:')).toBeInTheDocument();
    });
    it('should render successfully GetStarted cards with agency config', () => {
        render(
            <Provider store={mockConfiguredStore}>
                <GetStarted userType="agency" close={() => null} />
            </Provider>,
        );
        expect(
            screen.getByText('Access vetted project opportunities'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Submit a pitch in < 15 minutes'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Guided client intros + support'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Seamless contracts + payments'),
        ).toBeInTheDocument();
    });
});
