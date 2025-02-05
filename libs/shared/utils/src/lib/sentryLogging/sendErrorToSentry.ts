import {
    BaseQueryApi,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query/react';
import { FeatureByRoute } from '@breef/shared/constants';
import { getSeverityType } from './getSeverityType';
import { getAppType } from '../help-functions/getAppType';
import { gerErrorMessage } from './getErrorMessage';
import { ErrorLogging } from './initializeErrorLogging';

type FeatureByRouteKeyType = keyof typeof FeatureByRoute;

export const sendErrorToSentry = (
    args: FetchArgs | string,
    api: BaseQueryApi,
    originError: FetchBaseQueryError,
    pathname: string,
) => {
    const methodByApiType = api.type === 'query' ? 'GET' : 'mutation';
    const method =
        typeof args !== 'string' && args.method ? args.method : methodByApiType;
    const endpoint = api.endpoint;
    const statusCode = originError.status;
    const appType = getAppType();
    const featureName =
        FeatureByRoute[pathname as FeatureByRouteKeyType] ?? 'Unknown Feature';
    const errorMessage = gerErrorMessage(statusCode);
    const errorDetail = `Endpoint name ${endpoint}, method ${method} (${appType} app), path ${pathname}`;
    const error = new Error(errorDetail);
    error.name = `Backend Error - ${errorMessage} (Feature ${featureName})`;

    ErrorLogging.withScope(scope => {
        scope.setLevel(getSeverityType(statusCode));
        scope.setExtra('data args', args);
        scope.setExtra('data error', originError);
        scope.setFingerprint([
            endpoint,
            method,
            String(statusCode),
            pathname,
            appType,
        ]);
        ErrorLogging.captureException(error);
    });
};
