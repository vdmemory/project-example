export const configTablePaymentsClient = [
    {
        header: 'Invoice #',
        accessor: 'invoiceCode',
    },
    {
        header: 'Status',
        accessor: 'status',
    },
    {
        header: 'Description',
        accessor: 'description',
    },
    {
        header: 'Type',
        accessor: 'type',
    },
    {
        header: 'Invoice Date',
        accessor: 'invoiceDate',
    },
    {
        header: 'Pay by',
        tooltip: 'This is invoice date + terms',
        accessor: 'payBy',
    },
    {
        header: 'Amount',
        accessor: 'amount',
    },
    {
        header: '',
        accessor: 'actionButton',
    },
    {
        header: '',
        accessor: 'downloadInvoice',
    },
];

export const configTablePaymentsClientMobile = [
    {
        header: 'Type',
        accessor: 'type',
    },
    {
        header: 'Invoice Date',
        accessor: 'invoiceDate',
    },
    {
        header: 'Pay by',
        tooltip: 'This is invoice date + terms',
        accessor: 'payBy',
    },
    {
        header: 'Amount',
        accessor: 'amount',
    },
];
