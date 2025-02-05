import { InterceptableErrorStatusCodesEnum } from '@breef/shared/constants';

export const gerErrorMessage = (statusCode: number | string) => {
    switch (statusCode) {
        case 400:
            return '400 Validation Error';
        case 403:
            return '403 Permission Denied';
        case 404:
            return '404 Not Found';
        case InterceptableErrorStatusCodesEnum.FetchError:
        case InterceptableErrorStatusCodesEnum.TimeoutError:
            return `Network Connection Error (${statusCode})`;
        case 500:
        case InterceptableErrorStatusCodesEnum.ParsingError:
        case InterceptableErrorStatusCodesEnum.CustomError:
            return `Something went wrong (${statusCode})`;
        default:
            return `Unexpected Error (${statusCode})`;
    }
};
