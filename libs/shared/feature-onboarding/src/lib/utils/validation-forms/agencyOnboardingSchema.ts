import * as yup from 'yup';
import {
    getUrlPattern,
    ValidationErrorMessageMethodValueType,
    validationErrorMessages,
    ValidationErrorType,
} from '@breef/shared/utils';

const generalAgencyOnboardingSchema = {
    website: yup
        .string()
        .matches(
            getUrlPattern(),
            (
                validationErrorMessages[
                    ValidationErrorType.url
                ] as ValidationErrorMessageMethodValueType
            )('Website'),
        )
        .max(1000),
    officeLocations: yup
        .array()
        .compact(v => !v.location)
        .of(
            yup.object({
                location: yup.string(),
            }),
        )
        .min(1),
    numberOfEmployees: yup.string().required(),
    industries: yup
        .array()
        .required()
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
    services: yup
        .array()
        .required()
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
            )('Services'),
        ),
    servicesAndSkills: yup
        .array()
        .required()
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
            )('Skills'),
        ),
    identity: yup
        .array()
        // .required()
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
            )('Identity'),
        ),
    phoneNumber: yup
        .string()
        .min(
            2,
            (
                validationErrorMessages[
                    ValidationErrorType.minlength
                ] as ValidationErrorMessageMethodValueType
            )(2),
        )
        .max(
            15,
            (
                validationErrorMessages[
                    ValidationErrorType.maxlength
                ] as ValidationErrorMessageMethodValueType
            )(15),
        ),
};

export const agencyOnboardingSchemaWithSocial = yup
    .object({
        ...generalAgencyOnboardingSchema,
        companyName: yup
            .string()
            .min(
                1,
                (
                    validationErrorMessages[
                        ValidationErrorType.required
                    ] as ValidationErrorMessageMethodValueType
                )('Company name'),
            )
            .max(
                255,
                (
                    validationErrorMessages[
                        ValidationErrorType.maxlength
                    ] as ValidationErrorMessageMethodValueType
                )(255, 'Company name'),
            )
            .required(),
    })
    .required();

export const agencyOnboardingSchema = yup
    .object({
        ...generalAgencyOnboardingSchema,
    })
    .required();
