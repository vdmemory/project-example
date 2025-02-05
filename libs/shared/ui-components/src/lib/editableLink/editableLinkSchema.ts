import * as yup from 'yup';
import {
    getUrlPattern,
    ValidationErrorMessageMethodValueType,
    validationErrorMessages,
    ValidationErrorType,
} from '@breef/shared/utils';

const titleSchema = yup
    .string()
    .max(
        100,
        (
            validationErrorMessages[
                ValidationErrorType.maxlength
            ] as ValidationErrorMessageMethodValueType
        )('Title'),
    )
    .nullable()
    .transform(value => (value ? value : null));
const linkSchema = yup
    .string()
    .matches(
        getUrlPattern(),
        (
            validationErrorMessages[
                ValidationErrorType.url
            ] as ValidationErrorMessageMethodValueType
        )('Link'),
    )
    .max(
        992,
        (
            validationErrorMessages[
                ValidationErrorType.maxlength
            ] as ValidationErrorMessageMethodValueType
        )(992, 'Link'),
    )
    .nullable()
    .transform(value => (value ? value : null));

export const editableLinkSchema = yup.object().shape(
    {
        title: yup.string().when('link', {
            is: (value: string) => value,
            then: titleSchema
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
            otherwise: titleSchema,
        }),
        link: yup.string().when('title', {
            is: (value: string) => value,
            then: linkSchema
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
            otherwise: linkSchema,
        }),
    },
    [['title', 'link']],
);
