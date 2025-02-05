import * as yup from 'yup';
import {
    errorMessages,
    getRequiredMessage,
    getUrlPattern,
    ValidationErrorMessageMethodValueType,
    validationErrorMessages,
    ValidationErrorType,
} from '@breef/shared/utils';

export const companyInfoAgencySchema = yup
    .object()
    .shape(
        {
            companyName: yup
                .string()
                .min(
                    1,
                    (
                        validationErrorMessages[
                            ValidationErrorType.required
                        ] as ValidationErrorMessageMethodValueType
                    )('Company Name'),
                )
                .max(
                    255,
                    (
                        validationErrorMessages[
                            ValidationErrorType.maxlength
                        ] as ValidationErrorMessageMethodValueType
                    )(255),
                ),
            website: yup
                .string()
                .min(
                    1,
                    (
                        validationErrorMessages[
                            ValidationErrorType.required
                        ] as ValidationErrorMessageMethodValueType
                    )('Website'),
                )
                .matches(
                    getUrlPattern(),
                    (
                        validationErrorMessages[
                            ValidationErrorType.url
                        ] as ValidationErrorMessageMethodValueType
                    )('Website'),
                )
                .when('website', {
                    is: (val: string) => val?.match(/(http|https):\/\//g),
                    then: yup.string().max(2000),
                    otherwise: yup
                        .string()
                        .max(
                            1992,
                            (
                                validationErrorMessages[
                                    ValidationErrorType.maxlength
                                ] as ValidationErrorMessageMethodValueType
                            )(1992, 'Website'),
                        ),
                }),
            contactEmail: yup
                .string()
                .email(errorMessages.emailNotValid)
                .max(
                    255,
                    (
                        validationErrorMessages[
                            ValidationErrorType.maxlength
                        ] as ValidationErrorMessageMethodValueType
                    )(255),
                ),
            contactPhoneNumber: yup.object({
                number: yup.string(),
                code: yup.string(),
                numberWithoutCountryCode: yup
                    .string()
                    .nullable()
                    .transform(value => (value ? value : null)),
            }),
            officeLocations: yup.array().of(
                yup.object({
                    id: yup.number(),
                    name: yup.string(),
                }),
            ),
            teamSize: yup
                .string()
                .required(
                    (
                        validationErrorMessages[
                            ValidationErrorType.required
                        ] as ValidationErrorMessageMethodValueType
                    )('Team size'),
                ),
            yearsInBusiness: yup
                .string()
                .required(
                    (
                        validationErrorMessages[
                            ValidationErrorType.required
                        ] as ValidationErrorMessageMethodValueType
                    )('Years in business'),
                ),
            twitter: yup
                .string()
                .matches(getUrlPattern(), {
                    excludeEmptyString: true,
                    message: (
                        validationErrorMessages[
                            ValidationErrorType.url
                        ] as ValidationErrorMessageMethodValueType
                    )('Twitter'),
                })
                .max(1000),
            instagram: yup
                .string()
                .matches(getUrlPattern(), {
                    excludeEmptyString: true,
                    message: (
                        validationErrorMessages[
                            ValidationErrorType.url
                        ] as ValidationErrorMessageMethodValueType
                    )('Instagram'),
                })
                .max(1000),
            linkedin: yup
                .string()
                .matches(getUrlPattern(), {
                    excludeEmptyString: true,
                    message: (
                        validationErrorMessages[
                            ValidationErrorType.url
                        ] as ValidationErrorMessageMethodValueType
                    )('Tiktok'),
                })
                .max(1000),
            meta: yup
                .string()
                .matches(getUrlPattern(), {
                    excludeEmptyString: true,
                    message: (
                        validationErrorMessages[
                            ValidationErrorType.url
                        ] as ValidationErrorMessageMethodValueType
                    )('Meta'),
                })
                .when('meta', {
                    is: (val: string) => val?.match(/(http|https):\/\//g),
                    then: yup.string().max(1000),
                    otherwise: yup
                        .string()
                        .max(
                            992,
                            (
                                validationErrorMessages[
                                    ValidationErrorType.maxlength
                                ] as ValidationErrorMessageMethodValueType
                            )(992, 'Meta'),
                        ),
                }),
            tagline: yup.string().min(1, getRequiredMessage('Tagline')).max(80),
            companyOverview: yup.string().max(1000),
        },
        [
            ['meta', 'meta'],
            ['website', 'website'],
        ],
    )
    .required();
