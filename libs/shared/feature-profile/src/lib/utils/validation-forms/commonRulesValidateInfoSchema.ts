import * as yup from 'yup';
import {
    getUrlPattern,
    ValidationErrorMessageMethodValueType,
    validationErrorMessages,
    ValidationErrorType,
} from '@breef/shared/utils';

export const commonRulesForInfoSchema = {
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
        .max(1000),
    industries: yup
        .array()
        .of(
            yup.object({
                id: yup.number(),
                name: yup.string(),
            }),
        )
        .min(
            1,
            (
                validationErrorMessages[
                    ValidationErrorType.required
                ] as ValidationErrorMessageMethodValueType
            )('Industries'),
        ),
    officeLocations: yup
        .array()
        .of(
            yup.object({
                id: yup.number(),
                name: yup.string(),
            }),
        )
        .min(
            1,
            (
                validationErrorMessages[
                    ValidationErrorType.required
                ] as ValidationErrorMessageMethodValueType
            )('Office Locations'),
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
    tiktok: yup
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

    companyOverview: yup
        .string()
        .max(
            2000,
            (
                validationErrorMessages[
                    ValidationErrorType.maxlength
                ] as ValidationErrorMessageMethodValueType
            )(2000),
        ),
};
