import { ConfigInnerFormType } from '@breef/shared/ui-components';
import {
    companyInfoSharedFormConfig,
    companyInfoSharedOverviewFormConfig,
    companyInfoSharedSocialFormConfig,
    companyInfoSharedTitterFormConfig,
} from './companyInfoSharedConfig';

export const companyInfoClientFormConfig = [
    ...companyInfoSharedFormConfig,
    {
        row: [
            {
                label: 'Company size',
                name: 'companySize',
                placeholder: 'Your Company Size',
                type: 'dropdown',
                listType: 'companySize',
            },
            companyInfoSharedTitterFormConfig,
        ],
    },
    companyInfoSharedSocialFormConfig,
    companyInfoSharedOverviewFormConfig,
] as ConfigInnerFormType;
