import { render } from '@testing-library/react';
import AddInvitePopup, { AddInvitePopupProps } from './AddInvitePopup';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { apiProfile } from '@breef/shared/data-access-profile';

export const mockConfiguredStore = configureStore({
    reducer: {
        [apiProfile.reducerPath]: apiProfile.reducer,
    },
});
const addInvite = jest.fn();
const defaultProps = {
    addInvite,
    invitations: [],
    titlePopup: 'Invite a Colleague:',
    isPhoneNumber: false,
    buttonTitle: 'Invite btn',
    close: jest.fn(),
};
const WrapperAddInvitePopup = (props: AddInvitePopupProps) => (
    <Provider store={mockConfiguredStore}>
        <AddInvitePopup {...props} />
    </Provider>
);
describe('AddInvitePopup', () => {
    it('should render successfully', () => {
        const { baseElement, getByText, queryByText } = render(
            <WrapperAddInvitePopup {...defaultProps} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('Invite a Colleague:')).toBeInTheDocument();
        expect(getByText('Invite btn')).toBeInTheDocument();
        expect(queryByText('Mobile number:')).toBe(null);
    });
    it('should render phone number field if isPhoneNumber prop is true', () => {
        const { getByText } = render(
            <WrapperAddInvitePopup {...defaultProps} isPhoneNumber={true} />,
        );
        expect(getByText('Mobile number:')).toBeInTheDocument();
    });
});
