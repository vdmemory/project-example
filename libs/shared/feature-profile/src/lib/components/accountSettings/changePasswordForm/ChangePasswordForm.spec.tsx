import { fireEvent, render } from '@testing-library/react';
import ChangePasswordForm from './ChangePasswordForm';
import { MockProfileProvider } from '../../../utils/mockData.ts/mockProfileProvider';
import { changePasswordFormConfig } from './changePasswordFormConfig';

const closeAccordionFunc = jest.fn();
const props = {
    closeAccordionFunc,
    config: changePasswordFormConfig,
};
describe('AccountInformation', () => {
    it('should render successfully', () => {
        const { baseElement, getByText, getByRole } = render(
            <MockProfileProvider>
                <ChangePasswordForm {...props} />
            </MockProfileProvider>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('Current password')).toBeInTheDocument();
        expect(getByText('New password')).toBeInTheDocument();
        expect(getByText('Confirm new password')).toBeInTheDocument();
        expect(getByRole('button')).toBeDisabled();
    });
    it('should change form fields on input successfully', () => {
        const {
            getByLabelText,
            getByDisplayValue,
            getAllByDisplayValue,
            getByRole,
        } = render(
            <MockProfileProvider>
                <ChangePasswordForm {...props} />
            </MockProfileProvider>,
        );
        const currentPasswordField = getByLabelText('Current password');
        const newPassword = getByLabelText('New password');
        const confirmNewPassword = getByLabelText('Confirm new password');

        fireEvent.change(currentPasswordField, {
            target: { value: 'passwordOld' },
        });
        fireEvent.change(newPassword, { target: { value: '!Password1' } });
        fireEvent.change(confirmNewPassword, {
            target: { value: '!Password1' },
        });

        expect(getByDisplayValue('passwordOld')).toBeInTheDocument();
        expect(getAllByDisplayValue('!Password1').length).toBe(2);
        expect(getByRole('button')).not.toBeDisabled();
    });
});
