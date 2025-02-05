import * as yup from 'yup';
import {
    getMaxLengthMessage,
    getRequiredMessage,
    getUrlMessage,
    getUrlPattern,
} from '@breef/shared/utils';

const urlPattern = getUrlPattern();

export const companyDetailsFormSchema = yup.object({
    name: yup
        .string()
        .min(1, getRequiredMessage('Company Name'))
        .max(255, getMaxLengthMessage('Company Name', 255)),

    website: yup
        .string()
        .required(getRequiredMessage('Website'))
        .min(1, getRequiredMessage('Website'))
        .matches(urlPattern, getUrlMessage('Website'))
        .max(200),

    location: yup
        .string()
        .required(getRequiredMessage('Your Location'))
        .min(1, getRequiredMessage('Your Location'))
        .max(255),

    description: yup
        .string()
        .required('Add your company bio')
        .min(1, 'Add your company bio')
        .max(2000, getMaxLengthMessage('About My Company', 2000)),
});
