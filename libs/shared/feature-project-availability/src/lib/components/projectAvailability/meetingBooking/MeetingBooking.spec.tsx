import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { mockConfiguredStore } from '../../../utils';
import { Provider } from 'react-redux';
import { MeetingBooking } from './MeetingBooking';
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

jest.mock('@breef/shared/data-access-project-availability', () => ({
    __esModule: true,
    ...jest.requireActual('@breef/shared/data-access-project-availability'),
    useGetAvailabilityQuery: () => ({
        isLoading: false,
    }),
}));

const useRouter = jest.spyOn(nextRouter, 'useRouter');
const router = useRouter.getMockImplementation()?.() as NextRouter;

const props = {
    renderNavigation: jest.fn(),
    onPrev: jest.fn(),
};

describe('MeetingBooking', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <RouterContext.Provider value={router}>
                <Provider store={mockConfiguredStore(true)}>
                    <MeetingBooking {...props} />
                </Provider>
            </RouterContext.Provider>,
        );
        expect(baseElement).toBeTruthy();
    });

    it('should render successfully loader', () => {
        const { baseElement } = render(
            <RouterContext.Provider value={router}>
                <Provider store={mockConfiguredStore(true)}>
                    <MeetingBooking {...props} />
                </Provider>
            </RouterContext.Provider>,
        );
        expect(baseElement).toBeTruthy();
        const spinner = screen.getByTestId('preloader');
        expect(spinner).toBeInTheDocument();
    });

    it('should render successfully first screen', async () => {
        render(
            <RouterContext.Provider value={router}>
                <Provider store={mockConfiguredStore()}>
                    <MeetingBooking {...props} />
                </Provider>
            </RouterContext.Provider>,
        );

        expect(screen).toBeTruthy();
    });

    it('action next button', () => {
        render(
            <RouterContext.Provider value={router}>
                <Provider store={mockConfiguredStore()}>
                    <MeetingBooking {...props} />
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

    describe('Elements render MeetingBooking', () => {
        beforeEach(async () => {
            await waitFor(async () => {
                render(
                    <RouterContext.Provider value={router}>
                        <Provider store={mockConfiguredStore()}>
                            <MeetingBooking {...props} />
                        </Provider>
                    </RouterContext.Provider>,
                );
            });
        });

        const testCases = [
            { name: 'header title', expected: 'SCHEDULE AN INTRO MEETING' },
            {
                name: 'header description',
                expected:
                    'Book your meeting below. This is a great way to introduce yourself to .',
            },
            { name: 'left section title', expected: 'Available DATES' },
            { name: 'right section title', expected: 'Available times' },
            {
                name: 'right section current date name',
                expected: /Friday, October 13/gi,
            },
            {
                name: 'booking slots',
                expected: /9:00 am - 12:00 pm/gi,
            },
            // { name: 'display Calendar', expected: 'November 2023' },
            { name: 'display next button', expected: 'NEXT' },
            { name: 'tip title', expected: 'QUICK TIP:' },
            {
                name: 'tip description',
                expected: 'Be sure to confirm the correct timezone above.',
            },
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
