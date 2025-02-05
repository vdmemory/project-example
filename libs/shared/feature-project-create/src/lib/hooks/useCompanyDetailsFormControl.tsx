import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { FormType } from '../types/projectCreateTypes';
import { companyDetailsFormSchema } from '../utils/validation/companyDetailsSchema';

const defaultCompanyDetails: FormType = {
    name: '',
    website: '',
    location: '',
    description: '',
};

export const useCompanyDetailsFormControl = ({
    formData,
    onSubmit,
}: {
    formData?: FormType;
    onSubmit?: (form: FormType) => void;
}) => {
    const {
        getValues,
        trigger,
        reset,
        control,
        clearErrors,
        setError,
        formState: { errors, isValid },
    } = useForm<FormType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: formData || defaultCompanyDetails,
        resolver: yupResolver(companyDetailsFormSchema),
    });

    const {
        field: fieldName,
        fieldState: { error: errorName },
    } = useController({
        control,
        name: 'name',
    });

    const {
        field: fieldWebsite,
        fieldState: { error: errorWebsite },
    } = useController({
        control,
        name: 'website',
    });

    const {
        field: fieldLocation,
        fieldState: { error: errorLocation },
    } = useController({
        control,
        name: 'location',
    });

    const {
        field: fieldDescription,
        fieldState: { error: errorDescription },
    } = useController({
        control,
        name: 'description',
    });

    const handleSave = () => {
        trigger().then(isValid => {
            if (!isValid) return;
            const values = getValues();
            onSubmit?.(values);
        });
    };

    useEffect(() => {
        return () => reset();
    }, []);

    return {
        form: {
            name: {
                field: fieldName,
                error: errorName,
            },
            website: {
                field: fieldWebsite,
                error: errorWebsite,
            },
            location: {
                field: fieldLocation,
                error: errorLocation,
            },
            description: {
                field: fieldDescription,
                error: errorDescription,
            },
        },
        handleSave,
        isValidForm: Object.keys(errors).length === 0 && isValid,
        clearErrors,
        setError,
        errors: errors,
    };
};
