import React, { FC, Fragment } from 'react';
import {
    StyledWorkPopupFieldLabel,
    StyledWorkPopupRow,
    WorkPopupControl,
} from '@breef/shared/ui-components';
import { StyledFormPricing } from './FormPricing.styled';
import { RadioCard } from '../radioCard/RadioCard';
import { InputOld, Radio, TextareaOld } from '@breef/ui-kit';
import {
    billingStructureConfig,
    configPricingStructure,
    retainerTypeConfig,
} from './configs';
import {
    CustomFieldType,
    useFormPricingControl,
} from './useFormPricingControl';
import {
    CapabilityPricingRetainerType,
    CapabilityPricingType,
} from '@breef/shared/constants';
import { PricingFormType } from '@breef/shared/types';

interface FormPricingProps {
    onClose: () => void;
    onSave: (formData: PricingFormType) => void;
    preValue?: PricingFormType | null;
}
export const FormPricing: FC<FormPricingProps> = ({
    onClose,
    onSave,
    preValue,
}) => {
    const {
        isValidForm,
        getValues,
        pricingStructureField,
        billingStructureField,
        retainerTypeField,
        projectAmountField,
        minProjectAmountField,
        maxProjectAmountField,
        packageNameField,
        descriptionField,
    } = useFormPricingControl(preValue);

    const handleSaveData = () => {
        onSave(getValues());
        onClose();
    };

    const renderAmountField = (label: string, field: CustomFieldType) => {
        const byPeriodUnit = ` / ${getPeriodUnit(retainerTypeField.value)}`;
        return (
            <StyledWorkPopupRow>
                <StyledWorkPopupFieldLabel isShortPadding>
                    {label}
                </StyledWorkPopupFieldLabel>
                <InputOld
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    error={field.error?.message}
                    placeholder={`$75${byPeriodUnit}`}
                    maxLength={20}
                    prefix="$"
                    suffix={byPeriodUnit}
                />
            </StyledWorkPopupRow>
        );
    };

    const renderMinAmountField = () =>
        renderAmountField('Minimum Project Amount', minProjectAmountField);

    const renderProjectAmountFields = () => {
        switch (pricingStructureField.value) {
            case CapabilityPricingType.RANGE:
                return (
                    <Fragment>
                        {renderMinAmountField()}
                        {renderAmountField(
                            'Maximum Project Amount',
                            maxProjectAmountField,
                        )}
                    </Fragment>
                );
            case CapabilityPricingType.PACKAGE:
                return renderAmountField('Project Amount', projectAmountField);
            default:
                return renderMinAmountField();
        }
    };

    return (
        <StyledFormPricing>
            <StyledWorkPopupRow>
                <StyledWorkPopupFieldLabel>
                    Pricing Structure
                </StyledWorkPopupFieldLabel>
                <div className="radio-cards-wrapper">
                    {configPricingStructure.map(item => (
                        <RadioCard
                            key={item.value}
                            title={item.title}
                            description={item.description}
                            onChange={() =>
                                pricingStructureField.onChange(item.value)
                            }
                            checked={item.value === pricingStructureField.value}
                            name="pricing-structure"
                        />
                    ))}
                </div>
            </StyledWorkPopupRow>
            <StyledWorkPopupRow>
                <StyledWorkPopupFieldLabel>
                    Billing Structure
                </StyledWorkPopupFieldLabel>
                {billingStructureConfig.map(item => (
                    <Radio
                        key={item.value}
                        onChange={() =>
                            billingStructureField.onChange(item.value)
                        }
                        checked={item.value === billingStructureField.value}
                        name="billing"
                        label={item.label}
                        small
                    />
                ))}
            </StyledWorkPopupRow>
            <StyledWorkPopupRow>
                <StyledWorkPopupFieldLabel>
                    Retainer Type (Optional)
                </StyledWorkPopupFieldLabel>
                {retainerTypeConfig.map(item => (
                    <Radio
                        key={item.value}
                        onChange={() => retainerTypeField.onChange(item.value)}
                        checked={item.value === retainerTypeField.value}
                        name="retainer-type"
                        label={item.label}
                        small
                    />
                ))}
            </StyledWorkPopupRow>
            {renderProjectAmountFields()}
            <StyledWorkPopupRow>
                <StyledWorkPopupFieldLabel isShortPadding>
                    Package Name (Optional)
                </StyledWorkPopupFieldLabel>
                <TextareaOld
                    {...packageNameField}
                    error={packageNameField.error?.message}
                    placeholder="Social Media Management"
                    maxLength={255}
                    wrapperClassName="textarea-wrapper"
                />
            </StyledWorkPopupRow>
            <StyledWorkPopupRow>
                <StyledWorkPopupFieldLabel isShortPadding>
                    Description (Optional)
                </StyledWorkPopupFieldLabel>
                <TextareaOld
                    {...descriptionField}
                    error={descriptionField.error?.message}
                    placeholder="Our typical deliverables for include 4-5 Instagram posts per week, daily community management..."
                    maxLength={2000}
                    wrapperClassName="textarea-wrapper"
                />
            </StyledWorkPopupRow>
            <WorkPopupControl
                onSave={handleSaveData}
                onCancel={onClose}
                isDisabledSave={!isValidForm}
            />
        </StyledFormPricing>
    );
};

export default FormPricing;

const getPeriodUnit = (value: CapabilityPricingRetainerType | null) => {
    switch (value) {
        case CapabilityPricingRetainerType.HOURLY:
            return 'hr';
        case CapabilityPricingRetainerType.BIWEEKLY:
            return 'w';
        case CapabilityPricingRetainerType.MONTHLY:
            return 'm';
        case CapabilityPricingRetainerType.QUARTERLY:
            return 'qtr';
        default:
            return 'hr';
    }
};
