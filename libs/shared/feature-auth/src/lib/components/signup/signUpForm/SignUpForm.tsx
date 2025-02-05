import { RoleFormNames, TypeFieldNames } from '@breef/shared/constants';
import { useFieldsFormSignUp } from './hook/useFieldsFormSignUp';
import { InputField } from '../../authSection/formRow/authFields/inputField/InputField';
import { LabelField } from '../../authSection/formRow/authFields/LabelField';
import { InputFieldPreview } from '../../authSection/formRow/authFields/inputFiledPreview/InputFieldPreview';
import { FormRowsSignUpStateType } from '../../../types/authStateTypes';
import { FormRow } from '../../authSection/formRow/FormRow';
import { RadioRectangle } from '@breef/ui-kit';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FieldError } from '@breef/shared/ui-components';

interface SignUpFormProps {
    formRowsState: FormRowsSignUpStateType;
    isPrefilledFormFlow: boolean;
}

export default function SignUpForm({
    formRowsState,
    isPrefilledFormFlow,
}: SignUpFormProps) {
    const {
        userRoleField,
        firstNameField,
        lastNameField,
        emailField,
        passwordField,
        companyNameField,
        errors,
        warning,
        clearErrors,
    } = useFieldsFormSignUp();
    const [isDisplayRoleChoice, setIsDisplayRoleChoice] = useState(
        !isPrefilledFormFlow,
    );

    const onChangeUserRole = (e: ChangeEvent<HTMLInputElement>) => {
        userRoleField.onChange(e.target.value);
        clearErrors(userRoleField.name);
    };
    const onChangeFirstName = (value: string) => {
        firstNameField.onChange(value);
        clearErrors(firstNameField.name);
    };
    const onChangeLastName = (value: string) => {
        lastNameField.onChange(value);
        clearErrors(lastNameField.name);
    };
    const onChangeEmail = (value: string) => {
        emailField.onChange(value);
        clearErrors(emailField.name);
    };
    const onChangePassword = (value: string) => {
        passwordField.onChange(value);
        clearErrors(passwordField.name);
    };
    const onChangeCompanyName = (value: string) => {
        companyNameField.onChange(value);
        clearErrors(companyNameField.name);
    };

    const renderUserRoleRadio = (label: string, role: RoleFormNames) => (
        <RadioRectangle
            label={label}
            value={role}
            onChange={onChangeUserRole}
            checked={userRoleField.value === role}
            name="user-role"
            selectAreaView="checkbox"
            isError={!!errors.userRole}
            className="radio-role"
        />
    );

    useEffect(() => {
        if (errors.userRole) {
            setIsDisplayRoleChoice(true);
        }
    }, [errors.userRole]);

    return (
        <Fragment>
            {isDisplayRoleChoice && (
                <LabelField label="I Work For:" className="label-field-role">
                    <FormRow>
                        {renderUserRoleRadio('Brand', RoleFormNames.COMPANY)}
                        {renderUserRoleRadio('Agency', RoleFormNames.AGENCY)}
                    </FormRow>
                    {errors.userRole && <FieldError error={errors.userRole} />}
                </LabelField>
            )}
            <FormRow>
                {!formRowsState.name.isEditable ? (
                    <LabelField label="First & Last Name" isStatic>
                        <InputFieldPreview
                            value={`${firstNameField.value} ${lastNameField.value}`}
                            onClick={() =>
                                formRowsState.name.setIsEditable(true)
                            }
                        />
                    </LabelField>
                ) : (
                    <>
                        <LabelField label="First Name">
                            <InputField
                                name={firstNameField.name}
                                onChange={onChangeFirstName}
                                value={firstNameField.value}
                                placeholder="James"
                                error={errors.firstName}
                                maxLength={100}
                            />
                        </LabelField>
                        <LabelField label="Last Name">
                            <InputField
                                name={lastNameField.name}
                                onChange={onChangeLastName}
                                value={lastNameField.value}
                                placeholder="Palmer"
                                error={errors.lastName}
                                maxLength={100}
                            />
                        </LabelField>
                    </>
                )}
            </FormRow>
            <FormRow>
                <LabelField
                    label="Company Name"
                    isStatic={!formRowsState.companyName.isEditable}
                >
                    {!formRowsState.companyName.isEditable ? (
                        <InputFieldPreview
                            value={companyNameField.value}
                            onClick={() =>
                                formRowsState.companyName.setIsEditable(true)
                            }
                        />
                    ) : (
                        <InputField
                            type={TypeFieldNames.TEXT}
                            name={companyNameField.name}
                            onChange={onChangeCompanyName}
                            value={companyNameField.value}
                            placeholder="Acme"
                            error={errors.companyName}
                            maxLength={255}
                        />
                    )}
                </LabelField>
            </FormRow>
            <FormRow>
                <LabelField
                    label="Work Email"
                    isStatic={!formRowsState.email.isEditable}
                >
                    {!formRowsState.email.isEditable ? (
                        <InputFieldPreview
                            value={emailField.value}
                            onClick={() =>
                                formRowsState.email.setIsEditable(true)
                            }
                        />
                    ) : (
                        <InputField
                            type={TypeFieldNames.EMAIL}
                            name={emailField.name}
                            onChange={onChangeEmail}
                            value={emailField.value}
                            placeholder="john@company.com"
                            warning={warning}
                            error={errors.email}
                        />
                    )}
                </LabelField>
            </FormRow>
            <FormRow>
                <LabelField label="Password">
                    <InputField
                        type={TypeFieldNames.PASSWORD}
                        name={passwordField.name}
                        onChange={onChangePassword}
                        value={passwordField.value}
                        placeholder="•••••••••••••••••••"
                        error={errors.password}
                        maxLength={36}
                    />
                </LabelField>
            </FormRow>
        </Fragment>
    );
}
