export const companyInfoSharedFormConfig = [
    {
        label: 'Company name',
        name: 'companyName',
        placeholder: 'Your Company Name',
        type: 'text',
        maxLength: 255,
        removeBreakSpaces: 'partially',
    },
    {
        label: 'Website',
        name: 'website',
        placeholder: 'Your Website',
        type: 'text',
        maxLength: 1000,
        removeBreakSpaces: 'all',
    },
    {
        label: 'Industries',
        name: 'industries',
        placeholder: 'Select Your Industries',
        type: 'chipDropdown',
        listType: 'industries',
    },
    {
        label: 'Office locations',
        name: 'officeLocations',
        type: 'chipAutocomplete',
    },
];

export const companyInfoSharedTitterFormConfig = {
    label: 'Twitter',
    name: 'twitter',
    type: 'socialLink',
    maxLength: 1000,
    removeBreakSpaces: 'all',
};

export const companyInfoSharedSocialFormConfig = {
    row: [
        {
            label: 'Instagram',
            name: 'instagram',
            type: 'socialLink',
            maxLength: 1000,
            removeBreakSpaces: 'all',
        },
        {
            label: 'Tiktok',
            name: 'tiktok',
            type: 'socialLink',
            maxLength: 1000,
            removeBreakSpaces: 'all',
        },
    ],
};

export const companyInfoSharedOverviewFormConfig = {
    label: 'Company overview',
    name: 'companyOverview',
    placeholder: 'Share an short intro here...',
    type: 'textarea',
    maxLength: 2000,
    rowsCount: 4,
};
