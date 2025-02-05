import React, { FC, useState } from 'react';
import { useMediaContext } from '@breef/shared/hooks';
import { ArrowSmallIcon, Button, CloseIcon, Input } from '@breef/ui-kit';
import { useController, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Popup } from '../Popup';
import {
    getPopupStylePreset,
    StyledCreatePasswordPopup,
} from './CreatePasswordPopup.styled';
import { setPasswordSchema } from './formSchema';
import { TypeFieldNames } from '@breef/shared/constants';
import { useSetPasswordMutation } from '@breef/shared/data-access-profile';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useLazyGetSelfQuery } from '@breef/shared/data-access-auth';

interface HelpUsPopupProps {
    subtitle?: string;
    onClose?: () => void;
    close: () => void;
    onBack?: () => void;
    onSuccessCallback?: (() => void) | null;
}

export const CreatePasswordPopup: FC<HelpUsPopupProps> = ({
    subtitle = 'Set a password to save your scope to Breef.',
    onBack,
    onClose,
    close,
    onSuccessCallback,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const { isMobile } = useMediaContext();
    const { getValues, setError, control, handleSubmit } =
        useForm<SetPasswordFormType>({
            mode: 'onSubmit',
            reValidateMode: 'onSubmit',
            defaultValues: {
                password: '',
                confirmPassword: '',
            },
            resolver: yupResolver(setPasswordSchema),
        });
    const [createPassword] = useSetPasswordMutation();
    const [getSelf] = useLazyGetSelfQuery();

    const { field: passwordField, fieldState: passwordFieldState } =
        useController({ control, name: 'password' });
    const {
        field: confirmPasswordField,
        fieldState: confirmPasswordFieldstate,
    } = useController({ control, name: 'confirmPassword' });

    const onSubmit = async () => {
        const { password, confirmPassword } = getValues();
        setIsLoading(true);
        try {
            await createPassword({
                newPassword: password,
                confirmNewPassword: confirmPassword,
            }).unwrap();
            await getSelf().unwrap();
            (onSuccessCallback ?? close)();
        } catch (error) {
            const fetchedErrorData = (error as FetchBaseQueryError).data as {
                new_password?: string;
                confirm_password?: string;
            };
            const {
                new_password: passwordError,
                confirm_password: confirmPasswordError,
            } = fetchedErrorData;
            if (passwordError) {
                setError('password', {
                    type: 'backend',
                    message: passwordError[0],
                });
            }
            if (confirmPasswordError) {
                setError('confirmPassword', {
                    type: 'backend',
                    message: confirmPasswordError[0],
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const title = 'Create password';

    return (
        <Popup
            key="popup-book-a-call-modified"
            style={getPopupStylePreset(isMobile)}
            isClosable={false}
        >
            <StyledCreatePasswordPopup>
                <div className="form-header">
                    <div className="group">
                        <h3 className="title">{title}</h3>
                        <p className="subtitle">{subtitle}</p>
                        <div className="divider"></div>
                    </div>
                    {!!onClose && (
                        <div className="close-wrapper">
                            <CloseIcon
                                className="close-button"
                                role="button"
                                onClick={onClose}
                            />
                        </div>
                    )}
                </div>
                <div className="form-body">
                    <Input
                        type={TypeFieldNames.PASSWORD}
                        onChange={passwordField.onChange}
                        maxLength={36}
                        placeholder="Password"
                        error={passwordFieldState.error?.message}
                    />
                    <Input
                        type={TypeFieldNames.PASSWORD}
                        onChange={confirmPasswordField.onChange}
                        maxLength={36}
                        placeholder="Confirm Password"
                        error={confirmPasswordFieldstate.error?.message}
                    />
                </div>
                <div className="form-footer">
                    {!!onBack && (
                        <button
                            className="button-back"
                            onClick={onBack}
                            disabled={isLoading}
                            type="button"
                        >
                            <ArrowSmallIcon />
                        </button>
                    )}
                    <Button
                        label="Save"
                        size="medium"
                        onClick={handleSubmit(onSubmit)}
                        isSubmitted={isLoading}
                        className="button-save"
                        iconPlacement="right"
                    />
                </div>
            </StyledCreatePasswordPopup>
        </Popup>
    );
};

type SetPasswordFormType = {
    password: string;
    confirmPassword: string;
};
