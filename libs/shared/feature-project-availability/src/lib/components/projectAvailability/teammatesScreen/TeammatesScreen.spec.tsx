import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TeammatesScreen } from './TeammatesScreen';
import { NextRouter } from 'next/dist/shared/lib/router/router';
import * as nextRouter from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { mockConfiguredStore } from '../../../utils';
import { Provider } from 'react-redux';
import 'intersection-observer';

const props = {
    brandLead: {
        brandLead: {
            companyType: 'client',
            helpText: 'Help text',
            id: 1,
            logoUrl:
                'data:image/svg+xml;base64,PHN2ZyBpZD0iY2lyY2xlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKICAgIHhtbDpzcGFjZT0icHJlc2VydmUiIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MS40MTQyMTsiPgoKICAgIDxzdHlsZT4KICAgICAgICAjbWFzayB7CiAgICAgICAgICAgIGFuaW1hdGlvbjogbWFzayAxLjJzIGVhc2UgaW5maW5pdGU7CiAgICAgICAgfQoKICAgICAgICBAa2V5ZnJhbWVzIG1hc2sgewogICAgICAgICAgICBmcm9tIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTgwcHgpCiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIHRvIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxODBweCkKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIDwvc3R5bGU+CgogICAgPGRlZnM+CgogICAgICAgIDxtYXNrIGlkPSJtYXNrLWVsZW1lbnQiPgoKICAgICAgICAgICAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGlkPSJjaXJjbGUiIGZpbGw9IiM3MjcxNzEiIC8+CgogICAgICAgICAgICA8cGF0aCBmaWxsPSJoc2xhKDIwMCwwJSwxMCUsLjYpIiBpZD0ibWFzayIgZD0iTTgyLDY3LjVsMCwzNWwtNjUsMGwwLC0xMDVsMCwwbDY1LDBaIiAvPgoKICAgICAgICA8L21hc2s+CgogICAgPC9kZWZzPgoKICAgIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBtYXNrPSJ1cmwoI21hc2stZWxlbWVudCkiIGlkPSJjaXJjbGUiIGZpbGw9IiNkYWRhZGEiIC8+Cgo8L3N2Zz4=',
            calendlyLink: 'https://www.youtube.com',
        },
        id: 1,
        email: 'example@gmail.com',
        firstName: 'John',
        lastName: 'Doe',
    },
    onNext: jest.fn(),
    renderNavigation: jest.fn(),
    onPrev: jest.fn(),
};

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

jest.mock('../../../store/hooks', () => ({
    __esModule: true,
    ...jest.requireActual('../../../store/hooks'),
    useProjectAvailabilitySelector: () => ({
        projectAvailability: {
            inviteTeammates: [],
            teammatesList: [
                {
                    id: 1,
                    email: 'first@gmail.com',
                    isDisabled: false,
                },
                {
                    id: 2,
                    email: 'second@gmail.com',
                    isDisabled: true,
                },
            ],
            inviteMembers: [
                {
                    id: 9,
                    email: 'testclient@gmail.com',
                    firstName: 'test',
                    lastName: 'test11о',
                    position: 'member',
                    isDisabled: true,
                },
            ],
        },
    }),
}));

jest.mock('@breef/shared/data-access-profile', () => ({
    __esModule: true,
    ...jest.requireActual('@breef/shared/data-access-profile'),
    useGetTeamMembersQuery: () => ({
        isLoading: false,
    }),
}));

describe('TeammatesScreen', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <RouterContext.Provider value={router}>
                <Provider store={mockConfiguredStore()}>
                    <TeammatesScreen {...props} />
                </Provider>
            </RouterContext.Provider>,
        );
        expect(baseElement).toBeTruthy();
    });

    it('action next button', () => {
        render(
            <RouterContext.Provider value={router}>
                <Provider store={mockConfiguredStore()}>
                    <TeammatesScreen {...props} />
                </Provider>
            </RouterContext.Provider>,
        );

        const nextButton = screen.getByText('Next');
        fireEvent.click(nextButton);

        expect(props.renderNavigation).toHaveBeenCalled();

        const backButton = screen.getByTestId('back-button');
        fireEvent.click(backButton);

        expect(props.onPrev).toHaveBeenCalled();

        const addButton = screen.getByTestId('link-button');
        fireEvent.click(addButton);

        expect(props.renderNavigation).toHaveBeenCalled();
    });

    describe('Elements render MeetingBooking', () => {
        beforeEach(async () => {
            render(
                <RouterContext.Provider value={router}>
                    <Provider store={mockConfiguredStore()}>
                        <TeammatesScreen {...props} />
                    </Provider>
                </RouterContext.Provider>,
            );
        });

        const testCases = [
            { name: 'header title', expected: 'ADD YOUR TEAM MEMBERS' },
            {
                name: 'header description',
                expected:
                    'Who should join you on the client intro call? Add team members below.',
            },
            { name: 'tip title', expected: 'QUICK TIP:' },
            {
                name: 'tip description',
                expected:
                    'This is a great time to introduce your team to the undefined.',
            },

            { name: 'lead name', expected: 'John Doe' },
            { name: 'display next button', expected: 'Next' },
            { name: 'first team email', expected: 'first@gmail.com' },
            { name: 'first team email', expected: 'second@gmail.com' },
            { name: 'add member button', expected: 'Add Team Member' },
        ];

        testCases.forEach(testCase => {
            it(`should render successfully - ${testCase.name}`, async () => {
                const element = screen.getByText(testCase.expected);
                expect(element).toBeInTheDocument();
            });
        });

        it('should render successfully avatar', async () => {
            const element = screen.getByAltText('Avatar');
            expect(element).toBeInTheDocument();
            expect(element).toHaveAttribute(
                'src',
                'data:image/svg+xml;base64,PHN2ZyBpZD0iY2lyY2xlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKICAgIHhtbDpzcGFjZT0icHJlc2VydmUiIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MS40MTQyMTsiPgoKICAgIDxzdHlsZT4KICAgICAgICAjbWFzayB7CiAgICAgICAgICAgIGFuaW1hdGlvbjogbWFzayAxLjJzIGVhc2UgaW5maW5pdGU7CiAgICAgICAgfQoKICAgICAgICBAa2V5ZnJhbWVzIG1hc2sgewogICAgICAgICAgICBmcm9tIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTgwcHgpCiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIHRvIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxODBweCkKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIDwvc3R5bGU+CgogICAgPGRlZnM+CgogICAgICAgIDxtYXNrIGlkPSJtYXNrLWVsZW1lbnQiPgoKICAgICAgICAgICAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGlkPSJjaXJjbGUiIGZpbGw9IiM3MjcxNzEiIC8+CgogICAgICAgICAgICA8cGF0aCBmaWxsPSJoc2xhKDIwMCwwJSwxMCUsLjYpIiBpZD0ibWFzayIgZD0iTTgyLDY3LjVsMCwzNWwtNjUsMGwwLC0xMDVsMCwwbDY1LDBaIiAvPgoKICAgICAgICA8L21hc2s+CgogICAgPC9kZWZzPgoKICAgIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBtYXNrPSJ1cmwoI21hc2stZWxlbWVudCkiIGlkPSJjaXJjbGUiIGZpbGw9IiNkYWRhZGEiIC8+Cgo8L3N2Zz4=',
            );
        });

        it('should render successfully back button', async () => {
            const element = screen.getByTestId('back-button');
            expect(element).toBeInTheDocument();
        });
    });
});
