import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
    AccountInfoFormValuesType,
    changeAccountInfoErrorType,
} from '../../../types/profileFormTypes';
import { SaveButton, InnerForm } from '@breef/shared/ui-components';
import { accountInfoFormConfig } from './accountInfoFormConfig';
import { useChangeAccountInfoMutation } from '@breef/shared/data-access-profile';
import { yupResolver } from '@hookform/resolvers/yup';
import { accountInfoClientSchema } from '../../../utils/validation-forms/accountInfoClientSchema';
import {
    ControlTypeInnerForm,
    AccountInfoRequestType,
    TransformAccountInfoResponseType,
} from '@breef/shared/types';
import { toast } from 'react-toastify';
import {
    getErrorMessage,
    ValidationErrorMessageMethodValueType,
    validationErrorMessages,
    ValidationErrorType,
} from '@breef/shared/utils';
import { parsePhoneNumberWithError } from 'libphonenumber-js';
import _ from 'lodash';
import { accountInfoAgencySchema } from '../../../utils/validation-forms/accountInfoAgencySchema';

const defaultValuesAccountInfo = {
    fullName: '',
    email: '',
    phoneNumber: {
        number: '',
        code: '+1',
        numberWithoutCountryCode: '',
    },
    role: '',
};

export interface AccountInfoFormProps {
    isLoading?: boolean;
    accountInfoData?: TransformAccountInfoResponseType;
    companyType?: string;
}

const AccountInfoForm: React.FC<AccountInfoFormProps> = ({
    isLoading,
    accountInfoData,
    companyType,
}) => {
    const methodsAccountInfo = useForm<ControlTypeInnerForm>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: accountInfoData || defaultValuesAccountInfo,
        resolver: yupResolver(
            companyType === 'client'
                ? accountInfoClientSchema
                : accountInfoAgencySchema,
        ),
    });

    const [changeAccountInfo, changeAccountInfoRequest] =
        useChangeAccountInfoMutation();

    const setInvalidPhoneNumberError = () => {
        methodsAccountInfo.setError('phoneNumber', {
            type: 'invalidPhoneNumber',
            message: 'Invalid Phone number.',
        });
    };

    const checkIsEqualAccountInfoForm = (
        formData: AccountInfoFormValuesType,
    ) => {
        const copyFormData = {
            ...formData,
            phoneNumber: {
                ...accountInfoData?.phoneNumber,
                number: formData.phoneNumber.numberWithoutCountryCode
                    ? formData.phoneNumber.number
                    : accountInfoData?.phoneNumber.code,
            },
        };
        return _.isEqual(copyFormData, accountInfoData);
    };

    const onSubmitAccountInfo: SubmitHandler<
        ControlTypeInnerForm
    > = formData => {
        if (
            !checkIsEqualAccountInfoForm(formData as AccountInfoFormValuesType)
        ) {
            const data = formData as AccountInfoFormValuesType;
            if (data.phoneNumber.numberWithoutCountryCode) {
                try {
                    const parsedPhoneNumber = parsePhoneNumberWithError(
                        data.phoneNumber.number,
                    );
                    if (parsedPhoneNumber.isValid()) {
                        changeAccountInfo({
                            ...formData,
                            companyType,
                        } as AccountInfoFormValuesType);
                    } else {
                        setInvalidPhoneNumberError();
                    }
                } catch (error) {
                    setInvalidPhoneNumberError();
                }
            } else {
                changeAccountInfo({
                    ...formData,
                    companyType,
                } as AccountInfoFormValuesType);
            }
        }
    };

    useEffect(() => {
        if (
            changeAccountInfoRequest.isSuccess &&
            (methodsAccountInfo.getValues() as AccountInfoFormValuesType)
                .email !== accountInfoData?.email
        )
            toast.success('Check your new email to confirm changes!', {
                toastId: 'confirm-email',
            });
    }, [
        accountInfoData,
        changeAccountInfoRequest.isSuccess,
        methodsAccountInfo,
    ]);

    useEffect(() => {
        if (accountInfoData) {
            const formStatePhoneNumber =
                methodsAccountInfo.getValues('phoneNumber').number;
            const storedPhoneNumber = accountInfoData.phoneNumber.number;
            methodsAccountInfo.reset({
                ...accountInfoData,
                phoneNumber:
                    formStatePhoneNumber === storedPhoneNumber
                        ? {
                              ...methodsAccountInfo.getValues('phoneNumber'),
                              number: storedPhoneNumber,
                          }
                        : accountInfoData.phoneNumber,
            });
        }
    }, [accountInfoData, methodsAccountInfo]);

    //handling error for changeAccountInfo
    useEffect(() => {
        if (changeAccountInfoRequest.error) {
            const fetchedError =
                changeAccountInfoRequest.error as changeAccountInfoErrorType;
            if (fetchedError?.data?.time_left) {
                const getMessage = validationErrorMessages[
                    ValidationErrorType.spam
                ] as ValidationErrorMessageMethodValueType;
                toast.error(getMessage(fetchedError.data.time_left), {
                    toastId: ValidationErrorType.spam,
                });
            } else {
                if (fetchedError?.data?.email) {
                    methodsAccountInfo.setError('email', {
                        type: 'backend',
                        message: getErrorMessage(
                            'email',
                            fetchedError.data.email[0],
                        ),
                    });
                }
            }
        }
    }, [changeAccountInfoRequest.error, methodsAccountInfo]);

    return (
        <form onSubmit={methodsAccountInfo.handleSubmit(onSubmitAccountInfo)}>
            <InnerForm
                config={accountInfoFormConfig}
                control={methodsAccountInfo.control}
                cleanErrors={methodsAccountInfo.clearErrors}
            />
            <SaveButton
                type="submit"
                isSubmitting={changeAccountInfoRequest.isLoading}
                isSuccess={changeAccountInfoRequest.isSuccess}
                disabled={
                    isLoading ||
                    changeAccountInfoRequest.isLoading ||
                    Object.keys(methodsAccountInfo.formState.errors).length !==
                        0 ||
                    checkIsEqualAccountInfoForm(
                        methodsAccountInfo.getValues() as AccountInfoFormValuesType,
                    )
                }
            />
        </form>
    );
};
export default React.memo(AccountInfoForm);
