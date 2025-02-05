import { RenderInnerFieldProps } from './PaymentSummary';

export const paymentSummaryConfig = ({
    routingNumber,
    accountNumber,
}: {
    routingNumber: string;
    accountNumber: string;
}): RenderInnerFieldProps[] => [
    {
        labelText: 'Account Name',
        content: 'Breef Inc',
        withCopy: false,
        id: 'account-name',
    },
    {
        labelText: 'Account',
        content: accountNumber,
        withCopy: true,
        id: 'account',
    },
    {
        labelText: 'Routing',
        content: routingNumber,
        withCopy: true,
        id: 'routing',
    },
];
