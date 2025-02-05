import { IS_CLIENT_PLATFORM } from '@breef/shared/constants';

export const setLocalStorage = <
    T extends Record<string, unknown> | string | object,
>(
    key: string,
    data: T,
) => {
    const localStorage = IS_CLIENT_PLATFORM && window.localStorage;
    if (data && localStorage) localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorage = (key: string) => {
    if (IS_CLIENT_PLATFORM) {
        const localStorage = window.localStorage;
        const formData = localStorage.getItem(key);
        if (formData) return JSON.parse(formData);
    }
    return null;
};

export const removeLocalStorage = (key: string) => {
    const localStorage = window.localStorage;
    localStorage.removeItem(key);
};
