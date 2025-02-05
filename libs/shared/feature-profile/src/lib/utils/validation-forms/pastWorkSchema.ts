import * as yup from 'yup';
import {
    getMaxLengthMessage,
    getRequiredMessage,
    getUrlMessage,
    urlPattern,
} from '@breef/shared/utils';

export const pastWorkSchema = yup.object().shape(
    {
        clientName: yup
            .string()
            .required(getRequiredMessage('Client Name'))
            .max(255),
        clientWebsite: yup
            .string()
            .matches(urlPattern, {
                excludeEmptyString: true,
                message: getUrlMessage('Client Website'),
            })
            .when('clientWebsite', {
                is: (val: string) => !!val && val.match(/(http|https):\/\//g),
                then: yup.string().max(2000),
                otherwise: yup
                    .string()
                    .max(1992, getMaxLengthMessage('Client Website', 1992)),
            }),
        projectName: yup
            .string()
            .required(getRequiredMessage('Project Name'))
            .max(255, getMaxLengthMessage('Project Name', 255)),
        startDateMonth: yup.string().when('startDateYear', {
            is: (val: string) => !!val,
            then: yup
                .string()
                .required(
                    'Start Month is required if Start Year is not empty.',
                ),
        }),
        startDateYear: yup.string().when('startDateMonth', {
            is: (val: string) => !!val,
            then: yup
                .string()
                .required(
                    'Start Year is required if Start Month is not empty.',
                ),
        }),
        projectDescription: yup
            .string()
            .max(2000, getMaxLengthMessage('Project Description', 2000)),
        clientTestimonial: yup
            .string()
            .max(2000, getMaxLengthMessage('Client Testimonial', 2000)),
        linkUrl: yup
            .string()
            .matches(urlPattern, {
                excludeEmptyString: true,
                message: getUrlMessage('Link'),
            })
            .when('linkUrl', {
                is: (val: string) => !!val && val.match(/(http|https):\/\//g),
                then: yup.string().max(2000),
                otherwise: yup
                    .string()
                    .max(1992, getMaxLengthMessage('Link', 1992)),
            }),
        documents: yup.array().max(5),
    },
    [
        ['clientWebsite', 'clientWebsite'],
        ['linkUrl', 'linkUrl'],
        ['startDateYear', 'startDateMonth'],
    ],
);
