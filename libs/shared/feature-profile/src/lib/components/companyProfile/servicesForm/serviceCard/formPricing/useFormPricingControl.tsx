import {
    ControllerFieldState,
    ControllerRenderProps,
    useController,
    useForm,
} from 'react-hook-form';
import {
    BillingStructureType,
    CapabilityPricingRetainerType,
    CapabilityPricingType,
} from '@breef/shared/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { pricingSchema } from '../../../../../utils/validation-forms/pricingSchema';
import { PricingFormType } from '@breef/shared/types';

const defaultValuesPricingFrom: PricingFormType = {
    pricingStructure: null,
    billingStructure: null,
    retainerType: null,
    projectAmount: '',
    minProjectAmount: '',
    maxProjectAmount: '',
    packageName: '',
    description: '',
};

export const useFormPricingControl = (preValue?: PricingFormType | null) => {
    const {
        formState: { isValid },
        control,
        getValues,
    } = useForm<PricingFormType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: preValue ?? defaultValuesPricingFrom,
        resolver: yupResolver(pricingSchema),
    });

    const {
        field: pricingStructureField,
        fieldState: pricingStructureFieldState,
    } = useController({ control, name: 'pricingStructure' });
    const {
        field: billingStructureField,
        fieldState: billingStructureFieldState,
    } = useController({ control, name: 'billingStructure' });
    const { field: retainerTypeField, fieldState: retainerTypeFieldState } =
        useController({ control, name: 'retainerType' });
    const { field: projectAmountField, fieldState: projectAmountFieldState } =
        useController({ control, name: 'projectAmount' });
    const {
        field: minProjectAmountField,
        fieldState: minProjectAmountFieldState,
    } = useController({ control, name: 'minProjectAmount' });
    const {
        field: maxProjectAmountField,
        fieldState: maxProjectAmountFieldState,
    } = useController({ control, name: 'maxProjectAmount' });
    const { field: packageNameField, fieldState: packageNameFieldState } =
        useController({ control, name: 'packageName' });
    const { field: descriptionField, fieldState: descriptionFieldState } =
        useController({ control, name: 'description' });

    return {
        getValues,
        isValidForm: isValid,
        pricingStructureField: {
            ...pricingStructureField,
            ...pricingStructureFieldState,
        },
        billingStructureField: {
            ...billingStructureField,
            ...billingStructureFieldState,
        },
        retainerTypeField: {
            ...retainerTypeField,
            ...retainerTypeFieldState,
        },
        projectAmountField: {
            ...projectAmountField,
            ...projectAmountFieldState,
        },
        minProjectAmountField: {
            ...minProjectAmountField,
            ...minProjectAmountFieldState,
        },
        maxProjectAmountField: {
            ...maxProjectAmountField,
            ...maxProjectAmountFieldState,
        },
        packageNameField: {
            ...packageNameField,
            ...packageNameFieldState,
        },
        descriptionField: {
            ...descriptionField,
            ...descriptionFieldState,
        },
    };
};

export type CustomFieldType = ControllerRenderProps<PricingFormType> &
    ControllerFieldState;
