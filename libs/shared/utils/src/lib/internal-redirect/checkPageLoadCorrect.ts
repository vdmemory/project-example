import {
    BaseQueryApi,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query/react';
import router from 'next/router';
import { getIsInternalServerError } from '../help-functions/getIs500StatusCode';
import { getIs404StatusCode } from '../help-functions/getIs404StatusCode';

const pitchesMakeIntroPath = '/project/[projectId]/pitches-make-intro';

export const checkRedirectToErrorPage = async (
    api: BaseQueryApi,
    error: FetchBaseQueryError,
) => {
    const statusCode = error.status;

    if (
        getIs404StatusCode(error) &&
        !checkIsExceptionEndpoint(api.endpoint, exceptionPathsBy404Endpoint)
    ) {
        return await router.replace('/404');
    }
    if (getIsInternalServerError(statusCode)) {
        return await router.replace('/500');
    }
    if (
        statusCode === 403 &&
        !checkIsExceptionEndpoint(api.endpoint, exceptionPathsBy403Endpoint)
    ) {
        return await router.replace('/403');
    }

    return null;
};

const checkIsExceptionEndpoint = (
    endpointName: string,
    exceptionPathsByEndpoint: { [key: string]: string[] },
) => {
    const exceptionPaths = exceptionPathsByEndpoint[endpointName];
    if (!exceptionPaths) {
        return false;
    }
    return (
        exceptionPaths.length === 0 || exceptionPaths.includes(router.pathname)
    );
};

// If array is empty - allow all paths. If array is not empty - allow only specified paths
const exceptionPathsBy403Endpoint: { [key: string]: string[] } = {
    downloadInvoiceDocument: [],
    getAvailability: [],
    getPublicSinglePitch: [],
    getPublicPitchesList: [],
    getSharedProject: [],
    getPaymentInfo: [],
    getProjectById: [pitchesMakeIntroPath],
    getAgenciesSchedulesList: [pitchesMakeIntroPath],
    getProjectFromPostProject: [],
};

// If array is empty - allow all paths. If array is not empty - allow only specified paths
const exceptionPathsBy404Endpoint: { [key: string]: string[] } = {
    getProjectById: [pitchesMakeIntroPath],
    getAgenciesSchedulesList: [pitchesMakeIntroPath],
    getProjectFromPostProject: [],
};
