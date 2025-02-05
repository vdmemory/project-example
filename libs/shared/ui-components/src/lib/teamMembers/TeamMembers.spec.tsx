import { render } from '@testing-library/react';

import TeamMembers, { TeamMembersProps } from './TeamMembers';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { apiProfile } from '@breef/shared/data-access-profile';
import { apiAuth } from '@breef/shared/data-access-auth';

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
        [apiProfile.reducerPath]: apiProfile.reducer,
        [apiAuth.reducerPath]: apiAuth.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            apiProfile.middleware,
            apiAuth.middleware,
        ),
});
const emptyTeamMembersInfo = {
    invites: [],
    teamMembers: [],
};

const defaultProps = {
    teamMembersInfo: {
        invites: [
            {
                email: 'invite@gmail.com',
                date: '01.01.2023',
                id: 1,
                phoneNumber: '99999999',
                status: 'pending_invite',
            },
        ],
        teamMembers: [
            {
                id: 2,
                email: 'owner@gmail.com',
                firstName: 'FirstName',
                lastName: 'LastName',
                position: 'owner',
            },
        ],
    },
    disabledEvents: false,
    isLoading: false,
    hideOwnerRole: false,
    onlyRemoveMember: false,
    type: 'profile' as 'profile' | 'project' | 'pitch',
};

const TeamMembersWrapper = (props: TeamMembersProps) => (
    <Provider store={mockConfiguredStore}>
        <TeamMembers {...props} />
    </Provider>
);
describe('TeamMembers', () => {
    it('should render successfully', () => {
        const { baseElement, getByText, getByTestId } = render(
            <TeamMembersWrapper {...defaultProps} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('invite@gmail.com')).toBeInTheDocument();
        expect(getByText('FirstName LastName')).toBeInTheDocument();
        expect(getByTestId('email-input')).toBeInTheDocument();
    });
    it('should render spinner preloader if isLoading prop is true', () => {
        const { getByTestId } = render(
            <TeamMembersWrapper {...defaultProps} isLoading={true} />,
        );
        expect(getByTestId('preloader')).toBeInTheDocument();
    });
    it('should not render owner member if hideOwnerRole prop is true', () => {
        const { queryByText } = render(
            <TeamMembersWrapper {...defaultProps} hideOwnerRole={true} />,
        );
        expect(queryByText('FirstName LastName')).toEqual(null);
    });
    it('should render plug if no members and owner member is hidden', () => {
        const { getByText } = render(
            <TeamMembersWrapper
                {...defaultProps}
                hideOwnerRole={true}
                teamMembersInfo={emptyTeamMembersInfo}
            />,
        );
        expect(getByText('No added members')).toBeInTheDocument();
    });
    it('should not render InviteMemberForm if disabledEvents prop is true', () => {
        const { queryByTestId } = render(
            <TeamMembersWrapper {...defaultProps} disabledEvents={true} />,
        );
        expect(queryByTestId('email-input')).toEqual(null);
    });
});
