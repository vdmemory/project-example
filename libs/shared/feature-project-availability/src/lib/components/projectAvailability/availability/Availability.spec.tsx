import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { mockConfiguredStore } from '../../../utils';
import { Provider } from 'react-redux';
import { Availability } from './Availability';
import { NextRouter } from 'next/dist/shared/lib/router/router';
import * as nextRouter from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context';

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

const props = {
    renderNavigation: jest.fn(),
    onPrev: jest.fn(),
};

describe('Availability', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <RouterContext.Provider value={router}>
                <Provider store={mockConfiguredStore(true)}>
                    <Availability {...props} />
                </Provider>
            </RouterContext.Provider>,
        );
        expect(baseElement).toBeTruthy();
    });

    it('should render successfully loader', () => {
        const { baseElement } = render(
            <RouterContext.Provider value={router}>
                <Provider store={mockConfiguredStore(true)}>
                    <Availability {...props} />
                </Provider>
            </RouterContext.Provider>,
        );
        expect(baseElement).toBeTruthy();
        const spinner = screen.getByTestId('preloader');
        expect(spinner).toBeInTheDocument();
    });

    it('should render successfully first screen', () => {
        render(
            <RouterContext.Provider value={router}>
                <Provider store={mockConfiguredStore()}>
                    <Availability {...props} />
                </Provider>
            </RouterContext.Provider>,
        );

        expect(screen).toBeTruthy();
    });

    it('action next button', () => {
        render(
            <RouterContext.Provider value={router}>
                <Provider store={mockConfiguredStore()}>
                    <Availability {...props} />
                </Provider>
            </RouterContext.Provider>,
        );

        const nextButton = screen.getByText('NEXT');
        fireEvent.click(nextButton);

        expect(props.renderNavigation).toHaveBeenCalled();

        const backButton = screen.getByTestId('back-button');
        fireEvent.click(backButton);

        expect(props.onPrev).toHaveBeenCalled();
    });

    describe('Elements render Availability', () => {
        beforeEach(async () => {
            await waitFor(async () => {
                render(
                    <RouterContext.Provider value={router}>
                        <Provider store={mockConfiguredStore()}>
                            <Availability {...props} />
                        </Provider>
                    </RouterContext.Provider>,
                );
            });
        });

        const testCases = [
            { name: 'header title', expected: 'SET your availability' },
            {
                name: 'header description',
                expected:
                    'We recommend selecting multiple hour blocks across a few days.',
            },
            { name: 'left section title', expected: '1. SELECT YOUR DAYS' },
            { name: 'right section title', expected: '2. SET YOUR TIMES' },
            // { name: 'display Calendar', expected: 'November 2023' },
            {
                name: 'display Placeholder when day not selected',
                expected: 'Please select a day first on the left.',
            },
            { name: 'display next button', expected: 'NEXT' },
        ];

        testCases.forEach(testCase => {
            it(`should render successfully - ${testCase.name}`, async () => {
                const element = screen.getByText(testCase.expected);
                expect(element).toBeInTheDocument();
            });
        });

        it('should render successfully back button', async () => {
            const element = screen.getByTestId('back-button');
            expect(element).toBeInTheDocument();
        });

        it('should render successfully timezone dropdown', async () => {
            const element = screen.getByPlaceholderText('Select timezone');
            expect(element).toBeInTheDocument();
        });
    });
});
