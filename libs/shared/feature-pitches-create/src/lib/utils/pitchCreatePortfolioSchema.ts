import * as yup from 'yup';
import {
    getMaxLengthMessage,
    getRequiredMessage,
    getUrlMessage,
    getUrlPattern,
} from '@breef/shared/utils';

const urlPattern = getUrlPattern();

const linkSchema = yup
    .string()
    .matches(urlPattern, getUrlMessage('Link'))
    .max(992)
    .nullable()
    .transform(value => (value ? value : null));

const linkNameSchema = yup
    .string()
    .max(100)
    .nullable()
    .transform(value => (value ? value : null));

export const pitchCreatePortfolioSchema = yup.object().shape({
    previousWork: yup.array().of(
        yup.object().shape({
            clientName: yup
                .string()
                .required(getRequiredMessage('Client Name'))
                .min(1, getRequiredMessage('Client Name'))
                .max(255, getMaxLengthMessage('Client Name', 255)),
            projectName: yup
                .string()
                .required(getRequiredMessage('Project Name'))
                .min(1, getRequiredMessage('Project Name'))
                .max(255, getMaxLengthMessage('Project Name', 255)),
        }),
    ),
    additionalLinks: yup.array().of(
        yup.object().shape(
            {
                name: yup.string().when('link', {
                    is: (value: string) => value,
                    then: linkNameSchema
                        .required(getRequiredMessage('Name'))
                        .min(1, getRequiredMessage('Name')),
                    otherwise: linkNameSchema,
                }),
                link: yup.string().when('name', {
                    is: (value: string) => value,
                    then: linkSchema
                        .required(getRequiredMessage('Link'))
                        .min(1, getRequiredMessage('Link')),
                    otherwise: linkSchema,
                }),
            },
            [['name', 'link']],
        ),
    ),
    attachments: yup.array().max(5),
});
