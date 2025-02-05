import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { billingDataSchema } from '../../../utils/validation-forms/billingDataSchema';
import { BillingDataFormType } from '../../../types/kickoffTypes';
import { useEffect } from 'react';
import { useGetBillingDataQuery } from '@breef/shared/data-access-profile';

export const useFormBillingData = () => {
    const { data: billingData } = useGetBillingDataQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const methods = useForm<BillingDataFormType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            legalName: '',
            billingAddress: '',
            billingAddressAdditional: '',
            teamMembers: [],
            teamInvites: [],
            invites: [],
            files: [],
        },
        resolver: yupResolver(billingDataSchema),
    });

    useEffect(() => {
        if (billingData)
            methods.reset({
                ...methods.getValues(),
                ...billingData,
            });
    }, [billingData, methods]);

    return {
        methodsFormBillingData: methods,
    };
};
