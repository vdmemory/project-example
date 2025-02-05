import { useController, useFormContext } from 'react-hook-form';
import { FormRow } from '../../authSection/formRow/FormRow';
import { LabelField } from '../../authSection/formRow/authFields/LabelField';
import { InputField } from '../../authSection/formRow/authFields/inputField/InputField';
import { TypeFieldNames } from '@breef/shared/constants';
import { AcceptInviteFromValuesType } from '../../../types/authFormTypes';

export default function AcceptInviteForm() {
    const {
        control,
        clearErrors,
        formState: { errors },
    } = useFormContext<AcceptInviteFromValuesType>();

    const firstNameField = useController({
        control,
        name: 'userData.firstName',
    }).field;
    const lastNameField = useController({
        control,
        name: 'userData.lastName',
    }).field;
    const passwordField = useController({
        control,
        name: 'userData.password',
    }).field;

    const onChangeFirstName = (value: string) => {
        clearErrors(firstNameField.name);
        firstNameField.onChange(value);
    };
    const onChangeLastName = (value: string) => {
        clearErrors(lastNameField.name);
        lastNameField.onChange(value);
    };
    const onChangePassword = (value: string) => {
        clearErrors(passwordField.name);
        passwordField.onChange(value);
    };

    return (
        <>
            <FormRow>
                <LabelField label="First Name">
                    <InputField
                        name={firstNameField.name}
                        onChange={onChangeFirstName}
                        value={firstNameField.value}
                        placeholder="John"
                        error={errors.userData?.firstName?.message}
                        maxLength={100}
                    />
                </LabelField>
            </FormRow>
            <FormRow>
                <LabelField label="Last Name">
                    <InputField
                        name={lastNameField.name}
                        onChange={onChangeLastName}
                        value={lastNameField.value}
                        placeholder="Palmer"
                        error={errors.userData?.lastName?.message}
                        maxLength={100}
                    />
                </LabelField>
            </FormRow>
            <FormRow key="password-row">
                <LabelField label="Password">
                    <InputField
                        type={TypeFieldNames.PASSWORD}
                        name={passwordField.name}
                        onChange={onChangePassword}
                        value={passwordField.value}
                        placeholder="•••••••••••••••••••"
                        error={errors.userData?.password?.message}
                    />
                </LabelField>
            </FormRow>
        </>
    );
}
