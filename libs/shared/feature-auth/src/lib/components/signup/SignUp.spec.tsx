import { render, screen, waitFor } from '@testing-library/react';
import * as nextRouter from 'next/router';
import { NextRouter } from 'next/dist/shared/lib/router/router';
import SignUp from './SignUpComponent';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { Provider } from 'react-redux';
import { mockConfiguredStore, WrapperSignUp } from '../../utils';

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
            <RouterContext.Provider value={router}>
                <Provider store={mockConfiguredStore}>
                    <WrapperSignUp>
                        <SignUp />
                    </WrapperSignUp>
                </Provider>
            </RouterContext.Provider>,
        );
    });
});

afterAll(() => {
    jest.resetAllMocks();
});

describe('SignUp initial', () => {
    it('should render SignUp successfully', () => {
        expect(screen).toBeTruthy();
    });

    describe('Elements render SignUp', () => {
        const testCases = [
            { name: 'role button name', expected: 'Brand' },
            { name: 'role button name', expected: 'Agency' },
            {
                name: 'text redirect to login',
                expected: 'Already have an account?',
            },
            { name: 'link to login', expected: 'Log in' },
        ];

        testCases.forEach(testCase => {
            it(`should render successfully SignUp with ${testCase.name}`, async () => {
                const element = screen.getByText(testCase.expected);
                expect(element).toBeInTheDocument();
            });
        });
    });
});
