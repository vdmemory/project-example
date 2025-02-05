import {
    BillingStructureType,
    CapabilityPricingRetainerType,
    CapabilityPricingType,
} from '@breef/shared/constants';

export const configPricingStructure = [
    {
        title: 'Minimum Price',
        description:
            'My agency charges a minimum price to complete this project.',
        value: CapabilityPricingType.MINIMUM,
    },
    {
        title: 'Price Range',
        description:
            'My agency completes this project within a range of prices.',
        value: CapabilityPricingType.RANGE,
    },
    {
        title: 'Package Pricing',
        description:
            'My agency completes a set list of deliverables at a certain price.',
        value: CapabilityPricingType.PACKAGE,
    },
];

export const billingStructureConfig = [
    {
        label: 'Ongoing (Retainer)',
        value: BillingStructureType.ONGOING,
    },
    {
        label: 'One-time (Project Fee)',
        value: BillingStructureType.ONE_TIME,
    },
];

export const retainerTypeConfig = [
    {
        label: 'Hourly',
        value: CapabilityPricingRetainerType.HOURLY,
    },
    {
        label: 'Bi-weekly',
        value: CapabilityPricingRetainerType.BIWEEKLY,
    },
    {
        label: 'Monthly',
        value: CapabilityPricingRetainerType.MONTHLY,
    },
    {
        label: 'Quarterly',
        value: CapabilityPricingRetainerType.QUARTERLY,
    },
];
