import { setCookie, getCookie, removeCookie } from './cookie';
import {
    getLocalStorage,
    removeLocalStorage,
    setLocalStorage,
} from './localStorage';
import { APP_URL } from '@breef/shared/constants';
import { getDomainName } from '../parser-url/getDomain';

const APP_DOMAIN_COOKIE = APP_URL ? `.${getDomainName(APP_URL)}` : 'localhost';
const defaultCookieOptions = {
    domain: APP_DOMAIN_COOKIE,
};

export const setStorageData = <
    T extends Record<string, unknown> | string | object,
>(
    storage: 'cookie' | 'local',
    key: string,
    data: T,
    options?: object,
) => {
    switch (storage) {
        case 'cookie':
            return setCookie(key, data, {
                ...defaultCookieOptions,
                ...options,
            });
        case 'local':
            return setLocalStorage(key, data);
    }
};
export const getStorageData = (
    storage: 'cookie' | 'local',
    key: string,
    shouldJSONParse?: boolean,
) => {
    switch (storage) {
        case 'cookie':
            return getCookie(key, shouldJSONParse);
        case 'local':
            return getLocalStorage(key);
    }
};
export const removeStorageData = (
    storage: 'cookie' | 'local',
    key: string,
    options?: object,
) => {
    switch (storage) {
        case 'cookie':
            return removeCookie(key, {
                ...defaultCookieOptions,
                ...options,
            });
        case 'local':
            return removeLocalStorage(key);
    }
};
