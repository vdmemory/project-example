export const defaultMilestonePaymentValue = {
    amount: null,
    deliverable: '',
    id: 0,
    invoiceDate: '',
    paymentDue: '',
    scheduleType: '',
    status: '',
};

export const defaultRetainerPaymentValue = {
    id: 0,
    amount: null,
    deliverable: '',
    invoiceDate: '',
    paymentFrequency: '',
    numberOfPayments: '',
    scheduleType: 'ongoing' as 'ongoing' | 'retainer',
};
