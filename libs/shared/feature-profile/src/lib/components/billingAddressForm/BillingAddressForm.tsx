import React, { useEffect, useRef } from 'react';
import {
    DefaultInnerInput,
    InnerAutocomplete,
    InnerFieldWrapper,
    SaveButton,
} from '@breef/shared/ui-components';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import _ from 'lodash';
import {
    StyledBillingAddressForm,
    StyledFieldsWrapper,
} from './BillingAddressForm.styled';
import { billingAddressSchema } from '../../utils/validation-forms/billingAddressSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { replaceExtraBreakSpaces } from '@breef/shared/utils';
import { BillingDataFormValuesType } from '../../types/profileFormTypes';
import { useChangeBillingDataMutation } from '@breef/shared/data-access-profile';
import { toast } from 'react-toastify';
import { BillingDataMergedType } from '@breef/shared/types';

const defaultValuesBillingAddressForm = {
    legalName: '',
    billingAddress: '',
    billingAddressAdditional: '',
};

interface BillingAddressFormProps {
    isLoading?: boolean;
    billingAddressData?: BillingDataFormValuesType;
    isActiveForm?: boolean;
}

export default function BillingAddressForm({
    isLoading,
    billingAddressData,
    isActiveForm = true,
}: BillingAddressFormProps) {
    const [
        saveBillingData,
        {
            isLoading: isLoadingChangeBillingData,
            isSuccess,
            error: responseErrors,
        },
    ] = useChangeBillingDataMutation();
    const billingAddressRef = useRef<HTMLLabelElement>(null);
    const methods = useForm<BillingDataMergedType>({
        mode: 'onChange',
        reValidateMode: 'onSubmit',
        defaultValues: defaultValuesBillingAddressForm,
        resolver: yupResolver(billingAddressSchema),
    });
    const currentFormData = methods.getValues();
    const fieldLegalName = useController({
        control: methods.control,
        name: 'legalName',
    });
    const fieldBillingAddress = useController({
        control: methods.control,
        name: 'billingAddress',
    });
    const fieldBillingAddressAdditional = useController({
        control: methods.control,
        name: 'billingAddressAdditional',
    });
    const checkIsEqualBillingDataForm = (formData: BillingDataMergedType) => {
        const formDataTransformed = {
            ...formData,
            billingAddressAdditional: formData.billingAddressAdditional || '',
        };
        return _.isEqual(formDataTransformed, billingAddressData);
    };

    const onSubmitBillingData: SubmitHandler<
        BillingDataMergedType
    > = formData => {
        if (!checkIsEqualBillingDataForm(formData)) {
            saveBillingData(formData);
        }
    };

    useEffect(() => {
        if (responseErrors) {
            const errorMessage =
                'Sorry, something went wrong. Please try again later';
            toast.error(errorMessage, { toastId: errorMessage });
        }
    }, [responseErrors]);

    useEffect(() => {
        if (billingAddressData) {
            methods.reset(billingAddressData);
        }
    }, [billingAddressData, methods]);

    return (
        <StyledBillingAddressForm
            onSubmit={methods.handleSubmit(onSubmitBillingData)}
        >
            <StyledFieldsWrapper className="fields-wrapper">
                <InnerFieldWrapper
                    labelText="Company legal name"
                    error={fieldLegalName.fieldState.error?.message}
                    isReadOnly={!isActiveForm}
                >
                    <DefaultInnerInput
                        isDisabled={!isActiveForm}
                        value={fieldLegalName.field.value}
                        onChange={e => {
                            methods.clearErrors(fieldLegalName.field.name);
                            fieldLegalName.field.onChange(
                                replaceExtraBreakSpaces(e.target.value),
                            );
                        }}
                        placeholder="Legal Name"
                        maxLength={255}
                    />
                </InnerFieldWrapper>
                <InnerFieldWrapper
                    labelText="Billing Address"
                    setRef={billingAddressRef}
                    error={fieldBillingAddress.fieldState.error?.message}
                    isReadOnly={!isActiveForm}
                >
                    <InnerAutocomplete
                        parentRef={billingAddressRef}
                        value={fieldBillingAddress.field.value}
                        onChange={value => {
                            methods.clearErrors(fieldBillingAddress.field.name);
                            fieldBillingAddress.field.onChange(value);
                        }}
                        placeholder="Billing Address"
                    />
                </InnerFieldWrapper>
                <InnerFieldWrapper
                    isReadOnly={!isActiveForm}
                    labelText="Billing Address 2 (optional)"
                    error={
                        fieldBillingAddressAdditional.fieldState.error?.message
                    }
                >
                    <DefaultInnerInput
                        isDisabled={!isActiveForm}
                        value={fieldBillingAddressAdditional.field.value}
                        onChange={e => {
                            methods.clearErrors(
                                fieldBillingAddressAdditional.field.name,
                            );
                            fieldBillingAddressAdditional.field.onChange(
                                replaceExtraBreakSpaces(e.target.value),
                            );
                        }}
                        placeholder="Apartment # / PO Box / Suite #..."
                        maxLength={255}
                    />
                </InnerFieldWrapper>
            </StyledFieldsWrapper>
            <SaveButton
                type="submit"
                isSubmitting={isLoadingChangeBillingData}
                isSuccess={isSuccess}
                disabled={
                    isLoading ||
                    isLoadingChangeBillingData ||
                    Object.keys(methods.formState.errors).length !== 0 ||
                    !isActiveForm ||
                    checkIsEqualBillingDataForm(currentFormData)
                }
            />
        </StyledBillingAddressForm>
    );
}
