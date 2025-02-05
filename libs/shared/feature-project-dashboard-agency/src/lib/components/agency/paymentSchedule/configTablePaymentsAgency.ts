export const configTablePaymentsAgency = [
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
        header: 'Team take',
        accessor: 'teamTake',
    },
    {
        header: '',
        accessor: 'actionMenu',
    },
];

export const configTablePaymentsAgencyMobile = [
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
        header: 'Team take',
        accessor: 'teamTake',
    },
];
