export enum ValidationErrorType {
    default = 'default',
    minlength = 'minlength',
    maxlength = 'maxlength',
    minItemsLength = 'minItemsLength',
    maxItemsLength = 'maxItemsLength',
    required = 'required',
    email = 'email',
    exist = 'exist',
    confirmPassword = 'notSame',
    spam = 'spam',
    url = 'url',
    password = 'password',
    match = 'match',
    template = 'template',
    checked = 'checked',
    notExistRegExp = 'notExistRegExp',
    pattern = 'pattern',
    notFindPassword = 'notFindPassword',
    notValidUserStatus = 'notValidUserStatus',
    invoiceDate = 'invoiceDate',
    phoneNumber = 'phoneNumber',
    gettingPlaidToken = 'gettingPlaidToken',
    sharedPages = 'sharedPages',
    amountMin = 'amount',
}

export interface ValidationErrorMessageInterface {
    [key: string]: ValidationErrorMessageValueType;
}

export type ValidationErrorMessageValueType =
    | ValidationErrorMessageMethodValueType
    | string;
export type ValidationErrorMessageMethodValueType = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field?: any,
) => string;

export const validationErrorMessages: ValidationErrorMessageInterface = {
    [ValidationErrorType.default]:
        'Sorry, something went wrong. Please try again later',
    [ValidationErrorType.minlength]: (minLength: number, field?: string) =>
        `${
            field ? field : 'This field'
        } must be at least ${minLength} character${minLength > 1 ? 's' : ''}.`,
    [ValidationErrorType.maxlength]: (maxLength: number, field?: string) =>
        `${
            field ? field : 'This field'
        } should not exceed ${maxLength} character${maxLength > 1 ? 's' : ''}.`,
    [ValidationErrorType.required]: (field?: string) =>
        `${field ?? 'This field'} is required.`,
    [ValidationErrorType.email]: 'Please enter a valid email address.',
    [ValidationErrorType.exist]: (field: string) =>
        `An account with this ${field} already exists.`,
    [ValidationErrorType.confirmPassword]: 'Passwords must match.',
    [ValidationErrorType.spam]: (timeLeft: string) =>
        `Wait ${timeLeft} seconds and try again.`,
    [ValidationErrorType.url]: (field: string) =>
        `${field} must be a valid URL.`,
    [ValidationErrorType.password]:
        'Password must include 6 characters including 1 special symbol.',
    [ValidationErrorType.match]: (field: string) => `${field} don't match.`,
    [ValidationErrorType.template]: 'Please fill in all fields.',
    [ValidationErrorType.checked]: 'Field must be checked.',
    [ValidationErrorType.notExistRegExp]:
        "Sorry, we don't recognize that email. Create an account.",
    [ValidationErrorType.pattern]: "Contact's email (format: xxx@xxx.xxx)",
    [ValidationErrorType.notFindPassword]:
        'We couldn’t find those credentials. Try again, or recover your password.',
    [ValidationErrorType.notValidUserStatus]:
        'An admin on your team has removed access for this account. Please register with another email, or contact a colleague to rejoin.',
    [ValidationErrorType.invoiceDate]: 'Invoice date must be in the future',
    [ValidationErrorType.phoneNumber]: 'Invalid phone number.',
    [ValidationErrorType.gettingPlaidToken]:
        'There was an error getting a plaid token.',
    [ValidationErrorType.sharedPages]: (role: string) =>
        `${role} has closed access to the pitch information.`,
    [ValidationErrorType.amountMin]: (minLength: string) =>
        `The amount must be at least ${minLength}`,
    [ValidationErrorType.minItemsLength]: (minLength: number, field?: string) =>
        `${field ? field : 'This field'} must have at least ${minLength} item${
            minLength > 1 ? 's' : ''
        }.`,
    [ValidationErrorType.maxItemsLength]: (maxLength: number, field?: string) =>
        `${field ? field : 'This field'} should not exceed ${maxLength} item${
            maxLength > 1 ? 's' : ''
        }.`,
};

export const internalServerErrorMessage =
    'Something went wrong. Please try again later. \nWe are already working on it.';
