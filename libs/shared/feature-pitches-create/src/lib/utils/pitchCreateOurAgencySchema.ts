import * as yup from 'yup';
import {
    checkSocialUsername,
    getUrlPattern,
    ValidationErrorMessageMethodValueType,
    validationErrorMessages,
    ValidationErrorType,
} from '@breef/shared/utils';

const urlPattern = getUrlPattern();
const aboutUsRequiredMessage = (
    validationErrorMessages[
        ValidationErrorType.required
    ] as ValidationErrorMessageMethodValueType
)('About us');
const aboutUsMinLengthMessage = (
    validationErrorMessages[
        ValidationErrorType.minlength
    ] as ValidationErrorMessageMethodValueType
)(50, 'About us');
const aboutUsMaxLengthMessage = (
    validationErrorMessages[
        ValidationErrorType.maxlength
    ] as ValidationErrorMessageMethodValueType
)(1000, 'About us');
const logoRequiredMessage = (
    validationErrorMessages[
        ValidationErrorType.required
    ] as ValidationErrorMessageMethodValueType
)('Logo');
const taglineRequiredMessage = (
    validationErrorMessages[
        ValidationErrorType.required
    ] as ValidationErrorMessageMethodValueType
)('Tagline');
const taglineMinLengthMessage = (
    validationErrorMessages[
        ValidationErrorType.minlength
    ] as ValidationErrorMessageMethodValueType
)(5, 'Tagline');
const taglineMaxLengthMessage = (
    validationErrorMessages[
        ValidationErrorType.maxlength
    ] as ValidationErrorMessageMethodValueType
)(80, 'Tagline');
const websiteRequiredMessage = (
    validationErrorMessages[
        ValidationErrorType.required
    ] as ValidationErrorMessageMethodValueType
)('Website');
const websiteMaxLengthMessage = (
    validationErrorMessages[
        ValidationErrorType.maxlength
    ] as ValidationErrorMessageMethodValueType
)(992, 'Website');
const portfolioMaxLengthMessage = (
    validationErrorMessages[
        ValidationErrorType.maxlength
    ] as ValidationErrorMessageMethodValueType
)(992, 'Portfolio');
const socialLinkMaxLengthMessage = (
    validationErrorMessages[
        ValidationErrorType.maxlength
    ] as ValidationErrorMessageMethodValueType
)(992, 'Social link');
const socialUsernameMaxLengthMessage = (
    validationErrorMessages[
        ValidationErrorType.maxlength
    ] as ValidationErrorMessageMethodValueType
)(900, 'Social username');

export const pitchCreateOurAgencySchema = yup.object().shape({
    aboutUs: yup
        .string()
        .required(aboutUsRequiredMessage)
        .min(50, aboutUsMinLengthMessage)
        .max(1000, aboutUsMaxLengthMessage)
        .nullable()
        .transform(value => (value ? value : null)),
    logo: yup
        .object({
            id: yup.number(),
            name: yup.string(),
            url: yup
                .string()
                .required(logoRequiredMessage)
                .min(1, logoRequiredMessage),
        })
        .required(logoRequiredMessage)
        .nullable()
        .transform(value => (value ? value : null)),
    tagline: yup
        .string()
        .required(taglineRequiredMessage)
        .min(5, taglineMinLengthMessage)
        .max(80, taglineMaxLengthMessage)
        .nullable()
        .transform(value => (value ? value : null)),
    website: yup
        .string()
        .required(websiteRequiredMessage)
        .matches(
            urlPattern,
            (
                validationErrorMessages[
                    ValidationErrorType.url
                ] as ValidationErrorMessageMethodValueType
            )('Website'),
        )
        .min(1, websiteRequiredMessage)
        .max(992, websiteMaxLengthMessage)
        .nullable()
        .transform(value => (value ? value : null)),
    portfolio: yup
        .string()
        .matches(
            urlPattern,
            (
                validationErrorMessages[
                    ValidationErrorType.url
                ] as ValidationErrorMessageMethodValueType
            )('Portfolio'),
        )
        .max(992, portfolioMaxLengthMessage)
        .nullable()
        .transform(value => (value ? value : null)),
    instagram: yup.lazy((value: string) => {
        if (!value?.match(urlPattern)) {
            return yup
                .string()
                .matches(/^@/, 'Social username must begin with @')
                .matches(checkSocialUsername, 'Social username is not valid')
                .max(900, socialUsernameMaxLengthMessage)
                .nullable()
                .transform(value => (value ? value : null));
        }
        return yup
            .string()
            .max(992, socialLinkMaxLengthMessage)
            .nullable()
            .transform(value => (value ? value : null));
    }),
});
