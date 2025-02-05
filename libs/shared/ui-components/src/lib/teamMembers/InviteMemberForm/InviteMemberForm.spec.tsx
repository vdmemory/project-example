import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import InviteMemberForm from './InviteMemberForm';

import { apiProfile } from '@breef/shared/data-access-profile';

const props = {
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
                email: 'member@gmail.com',
                firstName: 'FirstName',
                lastName: 'LastName',
                position: 'owner',
            },
        ],
    },
};

const mockConfiguredStore = configureStore({
    reducer: {
        [apiProfile.reducerPath]: apiProfile.reducer,
    },
});

describe('InviteMemberForm', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <Provider store={mockConfiguredStore}>
                <InviteMemberForm {...props} />
            </Provider>,
        );
        expect(baseElement).toBeTruthy();
    });
    it('should input value to invite email field successfully', () => {
        const { getByTestId } = render(
            <Provider store={mockConfiguredStore}>
                <InviteMemberForm {...props} />
            </Provider>,
        );
        const emailInput = getByTestId('email-input') as HTMLInputElement;
        expect(emailInput).toBeInTheDocument();
        fireEvent.change(emailInput, { target: { value: 'invite@gmail.com' } });
        expect(emailInput.value).toEqual('invite@gmail.com');
    });
});
