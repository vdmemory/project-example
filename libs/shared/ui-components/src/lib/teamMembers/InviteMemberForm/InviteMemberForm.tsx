import React, { useEffect } from 'react';
import { StyledInviteMemberForm } from './InviteMemberForm.styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../../button/Button';
import { useShowToastify } from '@breef/shared/hooks';
import { useInviteTeamMemberMutation } from '@breef/shared/data-access-profile';
import {
    TeamMemberRequestType as InviteTeamMemberFormValuesType,
    TeamMembersMergedResponseType,
} from '@breef/shared/types';
import * as yup from 'yup';
import { errorMessages, limitSymbols, ucFirst } from '@breef/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';

const inviteSchema = yup.object({
    email: yup
        .string()
        .min(2, errorMessages.emailNotValid)
        .email(errorMessages.emailNotValid)
        .max(255),
});

interface InviteMemberFormProps {
    teamMembersInfo?: TeamMembersMergedResponseType;
}

export default function InviteMemberForm({
    teamMembersInfo,
}: InviteMemberFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm<InviteTeamMemberFormValuesType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: { email: '' },
        resolver: yupResolver(inviteSchema),
    });
    const [sendInvite, { isSuccess, isLoading, isError, error }] =
        useInviteTeamMemberMutation();

    useShowToastify({ errors, isSuccess });
    const onSubmitInvite: SubmitHandler<
        InviteTeamMemberFormValuesType
    > = formData => {
        const allMembers = [
            ...(teamMembersInfo?.invites || []),
            ...(teamMembersInfo?.teamMembers || []),
        ];
        if (allMembers.some(item => item.email === formData.email)) {
            setError('email', {
                type: 'exist',
                message: 'This user has already been invited to Breef"',
            });
        } else {
            sendInvite(formData);
        }
    };

    const errorMessage = (
        error: FetchBaseQueryError | SerializedError | undefined,
    ) => {
        const defaultError = 'Something went wrong. Please try again later';
        const status = (error as { status: string | number }).status;

        if (
            status === 400 &&
            (
                error as {
                    data: { [key: string]: string };
                }
            ).data
        ) {
            const errorObject = error as {
                data: { [key: string]: string };
            };
            const errorKey = Object.keys(
                errorObject.data as {
                    [key: string]: string;
                },
            );
            const errorMessage = errorObject.data[errorKey[0]] as
                | string
                | string[];
            if (typeof errorMessage === 'object') {
                return ucFirst(errorMessage[0]);
            }
            return ucFirst(errorMessage);
        }
        return defaultError;
    };

    useEffect(() => {
        if (isSuccess) return reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            toast.error(errorMessage(error));
        }
    }, [isError, error]);

    return (
        <StyledInviteMemberForm onSubmit={handleSubmit(onSubmitInvite)}>
            <span className="label">Add memeber</span>
            <input
                data-testid="email-input"
                type="text"
                {...register('email', {
                    onChange: e => {
                        e.target.value = limitSymbols(
                            255,
                            e.target.value.trim(),
                        );
                    },
                })}
                placeholder="Email address"
            />
            <Button
                type="submit"
                title="Invite"
                disabled={isLoading}
                className="normal"
                withAnimate
            />
        </StyledInviteMemberForm>
    );
}
