import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    ACCESS_TOKEN,
    API_URL,
    HEADER_AUTH_NAME,
} from '@breef/shared/constants';
import { formattedToken } from './fotmattedToken';
import { getStorageData } from '../storage-service/storageController';

export const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: headers => {
        const accessTk: string = getStorageData('cookie', ACCESS_TOKEN);
        if (accessTk) {
            headers.set(HEADER_AUTH_NAME, formattedToken(accessTk));
        }

        headers.set('Content-Type', 'application/json');
        return headers;
    },
    credentials: 'include',
});
