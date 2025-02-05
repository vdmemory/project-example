import { ConfigInnerFormType } from '@breef/shared/ui-components';
import {
    companyInfoSharedFormConfig,
    companyInfoSharedOverviewFormConfig,
    companyInfoSharedSocialFormConfig,
    companyInfoSharedTitterFormConfig,
} from './companyInfoSharedConfig';

export const companyInfoAgencyFormConfig = [
    {
        label: 'Company',
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
        maxLength: 2000,
        removeBreakSpaces: 'all',
    },
    {
        row: [
            {
                label: 'Primary Contact Email',
                name: 'contactEmail',
                type: 'text',
                removeBreakSpaces: 'all',
                placeholder: 'Primary Contact Email',
                maxLength: 255,
            },
            {
                label: 'Primary Contact Phone Number',
                name: 'contactPhoneNumber',
                type: 'phone',
                placeholder: 'Primary Contact Phone Number',
            },
        ],
    },
    {
        label: 'Location',
        name: 'officeLocations',
        type: 'chipAutocomplete',
    },
    {
        row: [
            {
                label: 'Team size',
                name: 'teamSize',
                type: 'dropdown',
                listType: 'listNumberOfEmployees',
                placeholder: 'Team size',
            },
            {
                label: 'Years in business',
                name: 'yearsInBusiness',
                type: 'dropdown',
                listType: 'listYearsInBusiness',
                placeholder: 'Years in business',
            },
        ],
    },
    {
        row: [
            {
                label: 'Instagram',
                name: 'instagram',
                type: 'socialLink',
                maxLength: 1000,
                removeBreakSpaces: 'all',
            },
            {
                label: 'Linkedin',
                name: 'linkedin',
                type: 'socialLink',
                maxLength: 1000,
                removeBreakSpaces: 'all',
            },
        ],
    },
    {
        row: [
            companyInfoSharedTitterFormConfig,
            {
                label: 'Meta',
                name: 'meta',
                type: 'text',
                maxLength: 1000,
                removeBreakSpaces: 'all',
            },
        ],
    },
    {
        label: 'Tagline',
        name: 'tagline',
        placeholder: 'Tagline',
        type: 'textarea',
        maxLength: 80,
        rowsCount: 3,
    },
    {
        label: 'Company',
        name: 'companyOverview',
        placeholder: 'Share an short intro here...',
        type: 'textarea',
        maxLength: 1000,
        rowsCount: 3,
    },
] as ConfigInnerFormType;
