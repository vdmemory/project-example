import { StyledInviteForm } from './InviteForm.styled';
import { Button, Input } from '@breef/ui-kit';
import * as yup from 'yup';
import {
    emailPattern,
    errorMessages,
    getMaxLengthMessage,
} from '@breef/shared/utils';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCheckEmailMutation } from '@breef/shared/data-access-auth';
import { useState } from 'react';
import { toast } from 'react-toastify';

const schema = yup
    .object()
    .shape({
        email: yup
            .string()
            .max(255, getMaxLengthMessage('E-mail', 255))
            .matches(emailPattern, errorMessages.emailNotValid)
            // .email(errorMessages.emailNotValid)
            .nullable()
            .transform(value => (value ? value : null)),
    })
    .required();

type InviteFormType = {
    email: string;
};

interface InviteFormProps {
    onClick: (email: string) => void;
    list: { email: string }[];
}

export const InviteForm = ({ onClick, list }: InviteFormProps) => {
    const [checkEmail] = useCheckEmailMutation();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
        setError,
    } = useForm<InviteFormType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            email: '',
        },
        resolver: yupResolver(schema),
    });

    const { value, onChange } = useController({
        control,
        name: 'email',
    }).field;

    const handleChange = (value: string) => onChange(value);

    const onSubmit: SubmitHandler<InviteFormType> = async data => {
        if (!data.email) {
            setError('email', {
                type: 'required',
                message: errorMessages.emailNotValid as string,
            });
            return;
        }
        const isEmailInList = list.some(
            item => item.email.toLowerCase() === data.email.toLowerCase(),
        );

        if (isEmailInList) return;

        setIsSubmitted(true);
        try {
            await checkEmail(data).unwrap();
            onClick(data.email.toLowerCase());
            reset();
        } catch (error) {
            const typedError = error as { data: { email?: string[] | string } };
            let message = 'Something went wrong';
            const emailError = typedError.data.email;
            if (emailError) {
                let emailBackendMessage = Array.isArray(emailError)
                    ? emailError[0]
                    : emailError;

                message =
                    emailBackendMessage === 'Email already exists.'
                        ? 'This user has already been invited to Breef.'
                        : emailBackendMessage;
            }
            toast.error(message);
        } finally {
            setIsSubmitted(false);
        }
    };

    return (
        <StyledInviteForm
            className="invite-form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                className="form-input"
                onChange={handleChange}
                value={value}
                placeholder={'Email Address'}
                error={errors.email?.message}
            />
            <Button
                isSubmitted={isSubmitted}
                label="Invite"
                variant="outlined"
                size="medium"
                type="submit"
            />
        </StyledInviteForm>
    );
};
