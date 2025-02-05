import { fireEvent, render } from '@testing-library/react';
import SetPasswordForm from './SetPasswordForm';
import { setPasswordFormConfig } from './setPasswordFormConfig';
import { MockProfileProvider } from '../../../utils/mockData.ts/mockProfileProvider';

const closeAccordionFunc = jest.fn();
const props = {
    isLoading: false,
    closeAccordionFunc,
    config: setPasswordFormConfig,
};
describe('SetPasswordForm', () => {
    it('should render successfully', () => {
        const { baseElement, getByLabelText, getByRole } = render(
            <MockProfileProvider>
                <SetPasswordForm {...props} />
            </MockProfileProvider>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByLabelText('New password')).toBeInTheDocument();
        expect(getByLabelText('Confirm new password')).toBeInTheDocument();
        expect(getByRole('button')).toBeDisabled();
    });
    it('should render successfully', () => {
        const { getByLabelText, getAllByDisplayValue, getByRole } = render(
            <MockProfileProvider>
                <SetPasswordForm {...props} />
            </MockProfileProvider>,
        );
        const newPassword = getByLabelText('New password');
        const confirmNewPassword = getByLabelText('Confirm new password');

        fireEvent.change(newPassword, { target: { value: 'passwordNew' } });
        fireEvent.change(confirmNewPassword, {
            target: { value: 'passwordNew' },
        });

        expect(getAllByDisplayValue('passwordNew').length).toBe(2);
        expect(getByRole('button')).not.toBeDisabled();
    });
});
