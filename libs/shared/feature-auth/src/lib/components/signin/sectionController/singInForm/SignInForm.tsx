import { TypeFieldNames } from '@breef/shared/constants';
import { FormRow } from '../../../authSection/formRow/FormRow';
import { Path, useController, useFormContext } from 'react-hook-form';
import { LoginLinkFormValuesType } from '../../../../types/authFormTypes';
import { LabelField } from '../../../authSection/formRow/authFields/LabelField';
import { InputField } from '../../../authSection/formRow/authFields/inputField/InputField';
import { FieldError, LinkButton } from '@breef/shared/ui-components';
import styled from '@emotion/styled';
import { mixinTypography } from '@breef/ui-kit';
import { useAuthActions, useAuthSelector } from '../../../../store/hook';

interface SignInFormProps {
    onClickForgotPassword: () => void;
}

export default function SignInForm({ onClickForgotPassword }: SignInFormProps) {
    const {
        control,
        clearErrors,
        formState: { errors },
    } = useFormContext<LoginLinkFormValuesType>();
    const { setSignInError } = useAuthActions();
    const { signInError } = useAuthSelector(state => state.auth);
    const emailField = useController({
        control,
        name: 'email',
    }).field;
    const passwordField = useController({
        control,
        name: 'password',
    }).field;

    const onChangeEffects = (path: Path<LoginLinkFormValuesType>) => {
        setSignInError(null);
        clearErrors(path);
    };

    const onChangeEmail = (value: string) => {
        onChangeEffects(emailField.name);
        emailField.onChange(value);
    };
    const onChangePassword = (value: string) => {
        onChangeEffects(passwordField.name);
        passwordField.onChange(value);
    };

    return (
        <StyledSignInForm>
            <FormRow>
                <LabelField label="Email">
                    <InputField
                        type={TypeFieldNames.EMAIL}
                        name={emailField.name}
                        onChange={onChangeEmail}
                        value={emailField.value}
                        placeholder="Enter your email"
                        error={errors.email?.message}
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
                        error={errors.password?.message}
                    />
                    {signInError && <FieldError error={signInError} />}
                    <LinkButton
                        name="Forgot Password"
                        onClick={onClickForgotPassword}
                        className="forgot-password-btn"
                    />
                </LabelField>
            </FormRow>
        </StyledSignInForm>
    );
}

const StyledSignInForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    .forgot-password-btn {
        font-size: 14px;
        font-weight: 450;
        line-height: 16.02px;
        letter-spacing: 0;
        text-align: center;
        margin-top: 8px;
        margin-left: auto;
        text-transform: none;
        color: #d96e34;

        :hover {
            text-decoration: none;
        }
    }
`;
