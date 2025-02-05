import {
    ACCESS_TOKEN,
    authCookieOptions,
    REFRESH_TOKEN,
} from '@breef/shared/constants';
import {
    removeStorageData,
    setStorageData,
} from '../storage-service/storageController';

type AuthData = {
    access: string;
    refresh: string;
};
export const setAuthTokens = ({ access, refresh }: AuthData) => {
    // clear root domain auth cookies
    removeStorageData('cookie', ACCESS_TOKEN, authCookieOptions);
    removeStorageData('cookie', REFRESH_TOKEN, authCookieOptions);
    // clear subdomain auth cookies
    removeStorageData('cookie', ACCESS_TOKEN);
    removeStorageData('cookie', REFRESH_TOKEN);
    // set auth cookies
    setStorageData('cookie', ACCESS_TOKEN, access, authCookieOptions);
    setStorageData('cookie', REFRESH_TOKEN, refresh, authCookieOptions);
};
