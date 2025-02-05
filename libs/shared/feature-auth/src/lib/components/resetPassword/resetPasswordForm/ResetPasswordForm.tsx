import { useController, useFormContext } from 'react-hook-form';
import { FormRow } from '../../authSection/formRow/FormRow';
import { LabelField } from '../../authSection/formRow/authFields/LabelField';
import { InputField } from '../../authSection/formRow/authFields/inputField/InputField';
import { TypeFieldNames } from '@breef/shared/constants';
import { Fragment } from 'react';
import { ResetPassFormValuesType } from '../../../types/authFormTypes';

export default function ResetPasswordForm() {
    const {
        control,
        clearErrors,
        formState: { errors },
    } = useFormContext<ResetPassFormValuesType>();
    const passwordField = useController({
        control,
        name: 'password',
    }).field;
    const confirmPasswordField = useController({
        control,
        name: 'confirmPassword',
    }).field;

    const onChangePassword = (value: string) => {
        clearErrors(passwordField.name);
        passwordField.onChange(value);
    };
    const onChangeConfirmPassword = (value: string) => {
        clearErrors(confirmPasswordField.name);
        confirmPasswordField.onChange(value);
    };

    return (
        <Fragment>
            <FormRow>
                <LabelField label="Password">
                    <InputField
                        type={TypeFieldNames.PASSWORD}
                        name={passwordField.name}
                        onChange={onChangePassword}
                        value={passwordField.value}
                        placeholder="•••••••••••••••••••"
                        error={errors.password?.message}
                        hidePasswordEye
                    />
                </LabelField>
            </FormRow>
            <FormRow key="password-row">
                <LabelField label="Confirm Password">
                    <InputField
                        type={TypeFieldNames.PASSWORD}
                        name={confirmPasswordField.name}
                        onChange={onChangeConfirmPassword}
                        value={confirmPasswordField.value}
                        placeholder="•••••••••••••••••••"
                        error={errors.confirmPassword?.message}
                        hidePasswordEye
                    />
                </LabelField>
            </FormRow>
        </Fragment>
    );
}
