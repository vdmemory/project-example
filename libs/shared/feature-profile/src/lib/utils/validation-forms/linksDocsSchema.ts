import { getUrlPattern } from '@breef/shared/utils';
import * as yup from 'yup';
import { getRequiredMessage, getUrlMessage } from './getErrorMessageForSchema';

const urlPattern = getUrlPattern();

const linkSchema = yup
    .string()
    .matches(urlPattern, getUrlMessage('Link'))
    .max(992)
    .nullable()
    .transform(value => (value ? value : null))
    .required(getRequiredMessage('Link'));

const linkNameSchema = yup
    .string()
    .max(100)
    .nullable()
    .transform(value => (value ? value : null))
    .required(getRequiredMessage('Name'));

export const linksDocsSchema = yup.object().shape({
    links: yup.array().of(
        yup.object().shape(
            {
                title: yup.string().when('link', {
                    is: (value: string) => value,
                    then: linkNameSchema
                        .required(getRequiredMessage('Name'))
                        .min(1, getRequiredMessage('Name')),
                    otherwise: linkNameSchema,
                }),
                link: yup.string().when('title', {
                    is: (value: string) => value,
                    then: linkSchema
                        .required(getRequiredMessage('Link'))
                        .min(1, getRequiredMessage('Link')),
                    otherwise: linkSchema,
                }),
            },
            [['title', 'link']],
        ),
    ),
    docs: yup.array().max(100),
});
