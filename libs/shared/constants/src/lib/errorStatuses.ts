export enum InterceptableErrorStatusCodesEnum {
    FetchError = 'FETCH_ERROR',
    TimeoutError = 'TIMEOUT_ERROR',
    ParsingError = 'PARSING_ERROR',
    CustomError = 'CUSTOM_ERROR',
}

export const interceptableErrorStatusCodesList: (number | string)[] = [
    InterceptableErrorStatusCodesEnum.FetchError,
    InterceptableErrorStatusCodesEnum.TimeoutError,
    InterceptableErrorStatusCodesEnum.ParsingError,
    InterceptableErrorStatusCodesEnum.CustomError,
];
