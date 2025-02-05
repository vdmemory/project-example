import { useController, useFormContext } from 'react-hook-form';
import { SignUpFormValuesType } from '../../../../types/authFormTypes';

const serviceAffiliation = (value: string) => {
    const services = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const service = value.split('@')[1];
    return services.includes(service);
};

const warningMessage = 'Please use a company email (if available)';

export const useFieldsFormSignUp = () => {
    const { control, clearErrors } = useFormContext<SignUpFormValuesType>();

    const userRole = useController({
        control,
        name: 'user.role',
    });
    const firstName = useController({
        control,
        name: 'user.firstName',
    });
    const lastName = useController({
        control,
        name: 'user.lastName',
    });
    const email = useController({
        control,
        name: 'user.email',
    });
    const password = useController({
        control,
        name: 'user.password',
    });
    const companyName = useController({
        control,
        name: 'company.name',
    });

    const isShowWarning = serviceAffiliation(email.field.value);

    const errors = {
        userRole: userRole.fieldState.error?.message,
        firstName: firstName.fieldState.error?.message,
        lastName: lastName.fieldState.error?.message,
        email: email.fieldState.error?.message,
        password: password.fieldState.error?.message,
        companyName: companyName.fieldState.error?.message,
    };

    return {
        userRoleField: userRole.field,
        firstNameField: firstName.field,
        lastNameField: lastName.field,
        emailField: email.field,
        passwordField: password.field,
        companyNameField: companyName.field,
        errors,
        warning: isShowWarning ? warningMessage : '',
        clearErrors,
    };
};
