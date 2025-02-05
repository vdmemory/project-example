import {
    ACCESS_TOKEN,
    authCookieOptions,
    IS_CLIENT_PLATFORM,
    IS_IMPERSONATE,
    IS_OLD_USER,
    REFRESH_TOKEN,
} from '@breef/shared/constants';
import { removeStorageData } from '../storage-service/storageController';
import router from 'next/router';
import { redirectToAuthApp } from '../internal-redirect/redirect';

export const resetAuth = () => {
    // clear root domain auth cookies
    removeStorageData('cookie', ACCESS_TOKEN, authCookieOptions);
    removeStorageData('cookie', REFRESH_TOKEN, authCookieOptions);
    // clear subdomain auth cookies
    removeStorageData('cookie', ACCESS_TOKEN);
    removeStorageData('cookie', REFRESH_TOKEN);
    // clear other auth cookies
    removeStorageData('cookie', IS_OLD_USER);
    removeStorageData('cookie', IS_IMPERSONATE);
};

export const logout = (withNextPath?: boolean) => {
    const isPublicApp =
        IS_CLIENT_PLATFORM && window.location.href.includes('public');
    resetAuth();
    if (!isPublicApp) {
        const nextPath = router.isReady && withNextPath ? router.asPath : '';
        redirectToAuthApp(nextPath);
    }
};
