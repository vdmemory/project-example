import * as yup from 'yup';
import { getMaxLengthMessage, getRequiredMessage } from '@breef/shared/utils';
import { CapabilityPricingType } from '@breef/shared/constants';

export const pricingSchema = yup.object().shape(
    {
        pricingStructure: yup
            .string()
            .required(getRequiredMessage('Pricing Structure')),
        billingStructure: yup
            .string()
            .required(getRequiredMessage('Billing Structure')),
        retainerType: yup.string().nullable(),
        projectAmount: yup.string().when('pricingStructure', {
            is: (val: CapabilityPricingType) =>
                val === CapabilityPricingType.PACKAGE,
            then: yup
                .string()
                .required(getRequiredMessage('Project Amount'))
                .test(
                    'projectAmount',
                    'Project Amount must be more than 0.',
                    function (value) {
                        return parseFloat(value || '0') !== 0;
                    },
                ),
        }),
        minProjectAmount: yup
            .string()
            .when(['pricingStructure', 'maxProjectAmount'], {
                is: (val: CapabilityPricingType | null) =>
                    val === CapabilityPricingType.MINIMUM ||
                    val === CapabilityPricingType.RANGE ||
                    !val,
                then: yup
                    .string()
                    .when(['pricingStructure', 'maxProjectAmount'], {
                        is: (val: CapabilityPricingType) =>
                            val === CapabilityPricingType.RANGE,
                        then: yup
                            .string()
                            .test(
                                'minProjectAmount',
                                'Minimum Project Amount must be less than Maximum Project Amount.',
                                function (value) {
                                    const { maxProjectAmount } = this.parent;
                                    return (
                                        !maxProjectAmount ||
                                        !value ||
                                        parseFloat(value) <=
                                            parseFloat(maxProjectAmount)
                                    );
                                },
                            ),
                    })
                    .required(getRequiredMessage('Minimum Project Amount'))
                    .test(
                        'minProjectAmount',
                        'Minimum Project Amount must be more than 0.',
                        function (value) {
                            return parseFloat(value || '0') !== 0;
                        },
                    ),
            }),
        maxProjectAmount: yup
            .string()
            .when(['pricingStructure', 'minProjectAmount'], {
                is: (val: CapabilityPricingType) =>
                    val === CapabilityPricingType.RANGE,
                then: yup
                    .string()
                    .required(getRequiredMessage('Maximum Project Amount'))
                    .test(
                        'maxProjectAmount',
                        'Maximum Project Amount must be more than Minimum Project Amount.',
                        function (value) {
                            const { minProjectAmount } = this.parent;
                            return (
                                !minProjectAmount ||
                                !value ||
                                parseFloat(value) >=
                                    parseFloat(minProjectAmount)
                            );
                        },
                    )
                    .test(
                        'maxProjectAmount',
                        'Maximum Project Amount must be more than 0.',
                        function (value) {
                            return parseFloat(value || '0') !== 0;
                        },
                    ),
            }),
        packageName: yup
            .string()
            .max(255, getMaxLengthMessage('Package Name', 255)),
        description: yup
            .string()
            .max(2000, getMaxLengthMessage('Description', 2000)),
    },
    [['minProjectAmount', 'maxProjectAmount']],
);
