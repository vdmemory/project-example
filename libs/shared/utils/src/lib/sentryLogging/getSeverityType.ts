import { InterceptableErrorStatusCodesEnum } from '@breef/shared/constants';
import { Severity } from '@sentry/react';

export const getSeverityType = (statusCode: number | string) => {
    switch (statusCode) {
        case 400:
        case InterceptableErrorStatusCodesEnum.FetchError:
        case InterceptableErrorStatusCodesEnum.TimeoutError:
            return Severity.Log;
        case 403:
        case 404:
            return Severity.Warning;
        default:
            return Severity.Error;
    }
};
