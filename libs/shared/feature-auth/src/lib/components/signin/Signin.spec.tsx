import { render, screen, waitFor } from '@testing-library/react';
import Signin from './Signin';
import { mockConfiguredStore } from '../../store/mockStore';
import * as nextRouter from 'next/router';
import { NextRouter } from 'next/dist/shared/lib/router/router';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { Provider } from 'react-redux';
import { GOOGLE_CLIENT_ID } from '@breef/shared/constants';
import { GoogleOAuthProvider } from '@react-oauth/google';

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: {},
            asPath: '',
            push: jest.fn(),
            isReady: true,
        };
    },
}));

const useRouter = jest.spyOn(nextRouter, 'useRouter');
const router = useRouter.getMockImplementation()?.() as NextRouter;

beforeEach(async () => {
    await waitFor(async () => {
        render(
            <GoogleOAuthProvider
                onScriptLoadSuccess={() =>
                    console.log('[google script load success]')
                }
                onScriptLoadError={() =>
                    console.log('[google script load error]')
                }
                clientId={GOOGLE_CLIENT_ID}
            >
                <RouterContext.Provider value={router}>
                    <Provider store={mockConfiguredStore}>
                        <Signin />
                    </Provider>
                </RouterContext.Provider>
            </GoogleOAuthProvider>,
        );
    });
});

afterAll(() => {
    jest.resetAllMocks();
});

describe('SignIn', () => {
    it('should render SignIn successfully', () => {
        expect(screen).toBeTruthy();
    });

    describe('Elements render SignIn', () => {
        const testCasesText = [
            { name: 'link redirect', expected: 'Don’t have an account yet?' },
            {
                name: 'page title note',
                expected: 'Enter your account information',
            },
        ];

        testCasesText.forEach(testCase => {
            it(`should render successfully SignIn with ${testCase.name}`, async () => {
                const element = screen.getByText(testCase.expected);
                expect(element).toBeInTheDocument();
            });
        });

        const testCasesTestId = [
            { name: 'input element', expected: 'input-field' },
            { name: 'google button', expected: 'google-auth' },
        ];

        testCasesTestId.forEach(testCase => {
            it(`should render successfully SignIn with ${testCase.name}`, async () => {
                const element = screen.getAllByTestId(testCase.expected)[0];
                expect(element).toBeInTheDocument();
            });
        });

        it(`should render successfully SignIn with input element`, async () => {
            const element = screen.getByPlaceholderText(/Enter your email/i);
            expect(element).toBeInTheDocument();
        });

        it('renders all required elements', () => {
            expect(screen.getByTestId('signin-container')).toBeInTheDocument();
            expect(screen.getByTestId('signin-form')).toBeInTheDocument();
        });
    });
});
