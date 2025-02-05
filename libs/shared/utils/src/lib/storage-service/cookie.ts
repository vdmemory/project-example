import Cookies from 'js-cookie';

export const getCookie = (name = '', shouldJSONParse = false) => {
    try {
        if (name) {
            const data = Cookies.get(name);
            if (data && shouldJSONParse) {
                return JSON.parse(data);
            }
            return data;
        }
        return Cookies.get();
    } catch (exception) {
        console.error(exception);
    }
};

export const setCookie = <T extends Record<string, unknown> | string | object>(
    name: string,
    value: T,
    options = {},
) => {
    try {
        const correctValue: string =
            typeof value === 'object' ? JSON.stringify(value) : value;
        Cookies.set(name, correctValue, options);
    } catch (exception) {
        console.error(exception);
    }
};

export const removeCookie = (name: string, options = {}) => {
    try {
        Cookies.remove(name, options);
    } catch (exception) {
        console.error(exception);
    }
};
