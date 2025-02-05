import { ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { SignUpFormValuesType } from '../../types/authFormTypes';
import { defaultSignUpFormValues } from '../initialFormsData/signupForm';

export const WrapperSignUp = (props: { children: ReactNode }) => {
    const methods = useForm<SignUpFormValuesType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: defaultSignUpFormValues(),
    });
    return <FormProvider {...methods}>{props.children}</FormProvider>;
};
