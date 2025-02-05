import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { paymentScheduleSchema } from '../../../utils/validation-forms/paymentScheduleSchema';
import { PaymentScheduleFormType } from '../../../types/kickoffTypes';
import { defaultMilestonePaymentValue } from '../../../constants/defaultValues';
import _ from 'lodash';

export const useFormPaymentSchedule = () => {
    const methods = useForm<PaymentScheduleFormType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            paymentsType: 'one_time',
            paymentsMilestone: [_.cloneDeep(defaultMilestonePaymentValue)],
            paymentsRetainer: null,
            paymentTerms: '',
        },
        resolver: yupResolver(paymentScheduleSchema),
    });

    return {
        methodsFormPaymentSchedule: methods,
    };
};
