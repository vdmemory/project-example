import * as yup from 'yup';
import {
    checkSocialUsername,
    getUrlPattern,
    ValidationErrorMessageMethodValueType,
    validationErrorMessages,
    ValidationErrorType,
} from '@breef/shared/utils';
import { PROJECT_OVERVIEW_FIELD_MAX_LENGTH } from '../constants';

const urlPattern = getUrlPattern();

const agencySkillsSchema = yup
    .array()
    .of(
        yup.object().shape({
            id: yup.number(),
            value: yup.string(),
            note: yup.string().max(10000),
        }),
    )
    .min(
        1,
        (
            validationErrorMessages[
                ValidationErrorType.minItemsLength
            ] as ValidationErrorMessageMethodValueType
        )(1, 'Agency Skills'),
    )
    .max(3);

export const projectScopeSchema = yup.object({
    agencySkills: agencySkillsSchema,
    budgetType: yup.string().required(),
    budgetRange: yup
        .string()
        .required(
            (
                validationErrorMessages[
                    ValidationErrorType.required
                ] as ValidationErrorMessageMethodValueType
            )('Budget Range'),
        )
        .min(
            1,
            (
                validationErrorMessages[
                    ValidationErrorType.required
                ] as ValidationErrorMessageMethodValueType
            )('Budget Range'),
        ),
    startDay: yup.string().required('Please select timing for your project'),
});

export const agencyPreferencesSchema = yup.object({
    openToRemoteAgencies: yup.boolean(),
    agencyLocation: yup.string().when('openToRemoteAgencies', {
        is: (val: boolean) => !val,
        then: yup
            .string()
            .required('Select a preferred agency location')
            .min(1, 'Select a preferred agency location'),
    }),
    agencyTags: yup
        .array()
        .of(yup.object())
        .max(
            10,
            (
                validationErrorMessages[
                    ValidationErrorType.maxItemsLength
                ] as ValidationErrorMessageMethodValueType
            )(10, 'Agency Preferences'),
        ),
    idealAgencyDescription: yup
        .string()
        .max(
            2000,
            (
                validationErrorMessages[
                    ValidationErrorType.maxlength
                ] as ValidationErrorMessageMethodValueType
            )(2000, 'Describe Your Ideal Agency'),
        ),
});

const brandLinkSchema = yup
    .string()
    .matches(
        urlPattern,
        (
            validationErrorMessages[
                ValidationErrorType.url
            ] as ValidationErrorMessageMethodValueType
        )('This field'),
    )
    .max(950)
    .nullable()
    .transform(value => (value ? value : null));

const brandLinkTitleSchema = yup
    .string()
    .max(30)
    .nullable()
    .transform(value => (value ? value : null));

export const personalizeScopeSchema = yup.object({
    description: yup
        .string()
        .required(
            (
                validationErrorMessages[
                    ValidationErrorType.required
                ] as ValidationErrorMessageMethodValueType
            )('Project Overview'),
        )
        .min(
            1,
            (
                validationErrorMessages[
                    ValidationErrorType.required
                ] as ValidationErrorMessageMethodValueType
            )('Project Overview'),
        )
        .max(PROJECT_OVERVIEW_FIELD_MAX_LENGTH),
    agencySkills: agencySkillsSchema,
    brandLinks: yup.array().of(
        yup.object().shape(
            {
                title: yup.string().when('link', {
                    is: (value: string) => value,
                    then: brandLinkTitleSchema
                        .required(
                            (
                                validationErrorMessages[
                                    ValidationErrorType.required
                                ] as ValidationErrorMessageMethodValueType
                            )('Title'),
                        )
                        .min(
                            1,
                            (
                                validationErrorMessages[
                                    ValidationErrorType.required
                                ] as ValidationErrorMessageMethodValueType
                            )('Title'),
                        ),
                    otherwise: brandLinkTitleSchema,
                }),
                link: yup.string().when('title', {
                    is: (value: string) => value,
                    then: brandLinkSchema
                        .required(
                            (
                                validationErrorMessages[
                                    ValidationErrorType.required
                                ] as ValidationErrorMessageMethodValueType
                            )('Link'),
                        )
                        .min(
                            1,
                            (
                                validationErrorMessages[
                                    ValidationErrorType.required
                                ] as ValidationErrorMessageMethodValueType
                            )('Link'),
                        ),
                    otherwise: brandLinkSchema,
                }),
            },
            [['title', 'link']],
        ),
    ),
    files: yup.array().max(5),
});

export const companyDetailsSchema = yup.object({
    companyDescription: yup
        .string()
        .required('Add your company bio')
        .min(1, 'Add your company bio')
        .max(
            2000,
            (
                validationErrorMessages[
                    ValidationErrorType.required
                ] as ValidationErrorMessageMethodValueType
            )('About My Company'),
        ),
    socialLinks: yup.array().of(
        yup.object().shape({
            title: yup.string().min(1).max(100).required(),
            link: yup.lazy((value: string) => {
                if (!value?.match(urlPattern)) {
                    return yup
                        .string()
                        .matches(/^@/, 'Social username must begin with @')
                        .matches(
                            checkSocialUsername,
                            'Social username is not valid',
                        )
                        .max(
                            900,
                            (
                                validationErrorMessages[
                                    ValidationErrorType.maxlength
                                ] as ValidationErrorMessageMethodValueType
                            )(900, 'Social username'),
                        )
                        .nullable()
                        .transform(value => (value ? value : null));
                }
                return yup
                    .string()
                    .max(950)
                    .nullable()
                    .transform(value => (value ? value : null));
            }),
        }),
    ),
    companyWebsite: yup
        .string()
        .required(
            (
                validationErrorMessages[
                    ValidationErrorType.required
                ] as ValidationErrorMessageMethodValueType
            )('Website'),
        )
        .min(
            1,
            (
                validationErrorMessages[
                    ValidationErrorType.required
                ] as ValidationErrorMessageMethodValueType
            )('Website'),
        )
        .matches(
            urlPattern,
            (
                validationErrorMessages[
                    ValidationErrorType.url
                ] as ValidationErrorMessageMethodValueType
            )('Website'),
        )
        .max(950),
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
    companyLocation: yup
        .string()
        .required(
            (
                validationErrorMessages[
                    ValidationErrorType.required
                ] as ValidationErrorMessageMethodValueType
            )('Your Location'),
        )
        .min(
            1,
            (
                validationErrorMessages[
                    ValidationErrorType.required
                ] as ValidationErrorMessageMethodValueType
            )('Your Location'),
        )
        .max(255),
});
