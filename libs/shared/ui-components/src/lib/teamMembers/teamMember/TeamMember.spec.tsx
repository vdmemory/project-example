import { render } from '@testing-library/react';

import TeamMember, { TeamMemberProps } from './TeamMember';
import { configureStore } from '@reduxjs/toolkit';
import { apiProfile } from '@breef/shared/data-access-profile';
import { Provider } from 'react-redux';

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

const memberData = {
    id: 1,
    email: 'email-member@gmail.com',
    firstName: 'FirstName',
    lastName: 'LastName',
    checked: false,
    status: 'active',
    position: 'member',
};
const inviteData = {
    id: 1,
    email: 'email-invite@gmail.com',
    checked: false,
    isInvitees: true,
    status: 'pending',
    date: '01.01.2023',
};
const defaultProps = {
    isAction: true,
    onlyRemoveMember: false,
    disabledEvents: false,
    type: 'profile' as 'profile' | 'project' | 'pitch',
};

const mockConfiguredStore = configureStore({
    reducer: {
        [apiProfile.reducerPath]: apiProfile.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiProfile.middleware),
});

const TeamMemberWrapper = (props: TeamMemberProps) => (
    <Provider store={mockConfiguredStore}>
        <TeamMember {...props} />
    </Provider>
);

describe('InviteMemberForm', () => {
    it('should render member successfully', () => {
        const { baseElement, getByText } = render(
            <TeamMemberWrapper {...defaultProps} data={memberData} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('FirstName LastName')).toBeInTheDocument();
        expect(getByText('member')).toBeInTheDocument();
    });
    it('should render invite successfully', () => {
        const { getByText } = render(
            <TeamMemberWrapper {...defaultProps} data={inviteData} />,
        );
        expect(getByText('email-invite@gmail.com')).toBeInTheDocument();
        expect(getByText('Invited on 01/01/2023')).toBeInTheDocument();
    });
    it('should render remove button if onlyRemoveMember prop is true', () => {
        const { getByText } = render(
            <TeamMemberWrapper
                {...defaultProps}
                data={memberData}
                onlyRemoveMember={true}
            />,
        );
        expect(getByText('Remove'));
    });
});
