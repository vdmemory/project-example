import { TypeFieldNames } from '@breef/shared/constants';
import { FormRow } from '../../../authSection/formRow/FormRow';
import { useController, useFormContext } from 'react-hook-form';
import { LabelField } from '../../../authSection/formRow/authFields/LabelField';
import { InputField } from '../../../authSection/formRow/authFields/inputField/InputField';
import { LoginRequestType } from '@breef/shared/types';

export default function FindPasswordForm() {
    const {
        control,
        clearErrors,
        formState: { errors },
    } = useFormContext<{ emailFindPassword: string }>();
    const emailField = useController({
        control,
        name: 'emailFindPassword',
    }).field;

    const onChangeEmail = (value: string) => {
        clearErrors(emailField.name);
        emailField.onChange(value);
    };

    return (
        <FormRow>
            <LabelField label="Email">
                <InputField
                    type={TypeFieldNames.EMAIL}
                    name={emailField.name}
                    onChange={onChangeEmail}
                    value={emailField.value}
                    placeholder="Enter your email"
                    error={errors.emailFindPassword?.message}
                />
            </LabelField>
        </FormRow>
    );
}
