import React, { useCallback, useEffect } from 'react';
import PopupField from '../../popupField/PopupField';
import {
    ChangeHandler,
    SubmitHandler,
    useController,
    useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { parsePhoneNumberWithError } from 'libphonenumber-js';
import { invitationPopupSchema } from './utils/invitationPopupSchema';
import { DefaultPopup } from '../DefaultPopup';
import {
    defaultPhoneNumberObj,
    PhoneNumberInput,
} from '../../../phoneNumberInput/PhoneNumberInput';
import { useCheckEmailMutation } from '@breef/shared/data-access-auth';
import { useShowToastify } from '@breef/shared/hooks';
import { withPopup } from '../../Popup';

export interface AddInvitePopupProps {
    addInvite: ({
        email,
        phoneNumber,
    }: {
        email: string;
        phoneNumber?: string;
    }) => void;
    invitations: { email: string; phoneNumber?: string }[];
    titlePopup?: string;
    isPhoneNumber?: boolean;
    buttonTitle?: string;
    close: () => void;
    isCheckEmailExist?: boolean;
    defaultErrorMessage?: string;
    placeholder?: string;
}

const AddInvitePopup = ({
    addInvite,
    invitations,
    titlePopup = 'Invite a Colleague:',
    isPhoneNumber = false,
    buttonTitle = 'Invite',
    close,
    isCheckEmailExist = true,
    defaultErrorMessage = 'Invite with this email is already added.',
    placeholder = 'Email address...',
}: AddInvitePopupProps) => {
    const {
        control,
        setError,
        clearErrors,
        formState: { isValid, errors },
        getValues,
        handleSubmit,
    } = useForm<AddUserInviteFormType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            email: '',
            phoneNumber: { ...defaultPhoneNumberObj },
        },
        resolver: yupResolver(invitationPopupSchema),
    });
    const emailField = useController({
        control,
        name: 'email',
    }).field;
    const phoneNumberField = useController({
        control,
        name: 'phoneNumber',
    }).field;

    const setInvalidPhoneNumberError = useCallback(() => {
        setError('phoneNumber', {
            type: 'invalidPhoneNumber',
            message: 'Invalid phone number',
        });
    }, [setError]);

    useEffect(() => {
        clearErrors('phoneNumber');
        if (phoneNumberField.value.numberWithoutCountryCode.length === 1) {
            setInvalidPhoneNumberError();
        } else {
            try {
                const parsedPhoneNumber = parsePhoneNumberWithError(
                    phoneNumberField.value.number,
                );
                if (!parsedPhoneNumber.isValid()) {
                    setInvalidPhoneNumberError();
                }
            } catch (error) {
                clearErrors('phoneNumber');
            }
        }
    }, [clearErrors, phoneNumberField.value, setInvalidPhoneNumberError]);

    const [
        checkEmail,
        {
            isSuccess: isSuccessCheckEmail,
            isError: isErrorCheckEmail,
            error: checkEmailError,
        },
    ] = useCheckEmailMutation();
    const onSubmit: SubmitHandler<AddUserInviteFormType> = data => {
        const isEmailInList = invitations.some(
            item => item.email.toLowerCase() === data.email.toLowerCase(),
        );

        if (!isEmailInList && !isCheckEmailExist) {
            addInvite({ email: data.email.toLowerCase() });
            return close();
        }

        if (!isEmailInList) {
            return checkEmail(data);
        } else {
            return setError('email', {
                type: 'backend',
                message: defaultErrorMessage,
            });
        }
    };

    useEffect(() => {
        if (isSuccessCheckEmail) {
            const data = { ...getValues() };
            const preparedData: { email: string; phoneNumber?: string } = {
                email: data.email.toLowerCase(),
            };
            if (data.phoneNumber.numberWithoutCountryCode)
                preparedData.phoneNumber = data.phoneNumber.number;
            addInvite(preparedData);
            close();
        }
    }, [addInvite, close, isSuccessCheckEmail, getValues]);

    useEffect(() => {
        const typedError = checkEmailError as { data: { email?: string[] } };
        if (isErrorCheckEmail && typedError.data?.email) {
            setError('email', {
                type: 'backend',
                message:
                    typedError.data.email[0] === 'Email already exists.'
                        ? 'This user has already been invited to Breef.'
                        : typedError.data.email[0],
            });
        }
    }, [checkEmailError, isErrorCheckEmail, setError]);

    useShowToastify({
        errors:
            errors.email?.type === 'backend' || errors.email?.type === 'exist'
                ? errors
                : {},
    });

    return (
        <DefaultPopup
            label={titlePopup}
            isDisabledBtn={!isValid}
            onSubmit={handleSubmit(onSubmit)}
            buttonTitle={buttonTitle}
        >
            <PopupField
                label="Email:"
                placeholder={placeholder}
                onChange={emailField.onChange}
                value={emailField.value}
                maxLength={255}
            />
            {isPhoneNumber && (
                <PopupField label="Mobile number:">
                    <PhoneNumberInput
                        value={phoneNumberField.value.number}
                        onChange={phoneNumberField.onChange as ChangeHandler}
                        placeholder="123 - 456 - 7890"
                    />
                </PopupField>
            )}
        </DefaultPopup>
    );
};

export default withPopup(AddInvitePopup);

type AddUserInviteFormType = {
    email: string;
    phoneNumber: {
        number: string;
        numberWithoutCountryCode: string;
        code: string;
    };
};
