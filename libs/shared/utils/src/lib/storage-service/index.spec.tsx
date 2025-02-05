import Cookies from 'js-cookie';
import { getCookie, setCookie, removeCookie } from './cookie';
import {
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage,
} from './localStorage';

const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
};

describe('getCookie', () => {
    beforeEach(() => {
        document.cookie = 'testCookie=testValue';
        document.cookie = 'jsonCookie={"key": "value"}';
    });

    afterEach(() => {
        document.cookie = 'testCookie=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'jsonCookie=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
    it('it should return the parsed value of a JSON cookie', () => {
        expect(getCookie('jsonCookie', true)).toEqual({ key: 'value' });
    });

    it('it should return the value of a cookie', () => {
        expect(getCookie('testCookie')).toEqual('testValue');
    });
});

describe('setCookie', () => {
    afterEach(() => {
        // Clean up any cookies that were set during testing
        document.cookie = 'testCookie=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });

    it('it should set a cookie with the given name and value', () => {
        setCookie('testCookie', 'testValue');
        expect(document.cookie).toContain('testCookie=testValue');
    });

    it('sets a cookie with the correct value and options', () => {
        setCookie('testCookie', { key: 'value' }, { expires: 7 });
        const cookieMatch = document.cookie.match(/testCookie=(.*?)(;|$)/);
        const cookieValue = cookieMatch ? cookieMatch[1] : null;
        const parsedCookieValue = JSON.parse(
            decodeURIComponent(cookieValue || ''),
        );
        expect(parsedCookieValue).toEqual({ key: 'value' });
    });
});

describe('removeCookie', () => {
    jest.mock('js-cookie');
    const cookieName = 'test-cookie';
    const cookieOptions = { path: '/' };

    it('should call Cookies.remove with the correct arguments', () => {
        const removeMock = jest.fn();
        Cookies.remove = removeMock;

        removeCookie(cookieName, cookieOptions);

        expect(removeMock).toHaveBeenCalledTimes(1);
        expect(removeMock).toHaveBeenCalledWith(cookieName, cookieOptions);
    });

    it('should log an error if Cookies.remove throws an exception', () => {
        const errorMessage = 'Failed to remove cookie';
        const removeMock = jest.fn(() => {
            throw new Error(errorMessage);
        });
        Cookies.remove = removeMock;

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        removeCookie(cookieName, cookieOptions);
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith(new Error(errorMessage));

        consoleSpy.mockRestore();
    });
});

// localStorage

describe('setLocalStorage', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'localStorage', {
            value: mockLocalStorage,
        });
    });

    afterAll(() => {
        Object.defineProperty(window, 'localStorage', {
            value: undefined,
        });
    });

    afterEach(() => {
        mockLocalStorage.setItem.mockClear();
    });

    it('should set an item in local storage if data is provided and localStorage is available', () => {
        setLocalStorage('test-key', { foo: 'bar' });

        expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(1);
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
            'test-key',
            JSON.stringify({ foo: 'bar' }),
        );
    });

    it('should not set an item in local storage if data is not provided', () => {
        setLocalStorage('test-key', '');

        expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
    });
});

describe('getLocalStorage', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'localStorage', {
            value: mockLocalStorage,
        });
    });

    afterAll(() => {
        Object.defineProperty(window, 'localStorage', {
            value: undefined,
        });
    });

    afterEach(() => {
        mockLocalStorage.getItem.mockClear();
    });

    it('should return null if localStorage is not available', () => {
        Object.defineProperty(window, 'localStorage', {
            value: undefined,
        });
        const result = getLocalStorage('test-key');
        expect(result).toBeNull();
    });

    it('should return null if the key is not found in localStorage', () => {
        mockLocalStorage.getItem.mockReturnValueOnce(null);

        const result = getLocalStorage('test-key');

        expect(mockLocalStorage.getItem).toHaveBeenCalledTimes(1);
        expect(mockLocalStorage.getItem).toHaveBeenCalledWith('test-key');
        expect(result).toBeNull();
    });

    it('should return the parsed data if the key is found in localStorage', () => {
        mockLocalStorage.getItem.mockReturnValueOnce(
            JSON.stringify({ foo: 'bar' }),
        );

        const result = getLocalStorage('test-key');

        expect(mockLocalStorage.getItem).toHaveBeenCalledTimes(1);
        expect(mockLocalStorage.getItem).toHaveBeenCalledWith('test-key');
        expect(result).toEqual({ foo: 'bar' });
    });
});

describe('removeLocalStorage', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'localStorage', {
            value: mockLocalStorage,
        });
    });

    afterAll(() => {
        Object.defineProperty(window, 'localStorage', {
            value: undefined,
        });
    });

    afterEach(() => {
        mockLocalStorage.removeItem.mockClear();
    });

    it('should remove the key from localStorage', () => {
        removeLocalStorage('test-key');

        expect(mockLocalStorage.removeItem).toHaveBeenCalledTimes(1);
        expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test-key');
    });
});

// storageController
//TODO: need to fix this test, when I run it, it throws an error (nx test --codeCoverage --project=shared-utils)

// describe('Storage Functions', () => {
//     const mockLocalStorage = {
//         getItem: jest.fn(),
//         setItem: jest.fn(),
//         removeItem: jest.fn(),
//     };

//     beforeEach(() => {
//         Object.defineProperty(window, 'localStorage', {
//             value: mockLocalStorage,
//             writable: true,
//         });
//         jest.clearAllMocks();
//     });

// it('should get data from cookie or local storage based on storage type', () => {
//     const key = 'testKey';
//     const data = { value: 'testValue' };
//     document.cookie = `${key}=${encodeURIComponent(JSON.stringify(data))}`;
//     mockLocalStorage.getItem.mockReturnValue(JSON.stringify(data));

//     const cookieData = getStorageData('cookie', key, true);
//     const localData = getStorageData('local', key, true);

//     expect(cookieData).toEqual(data);
//     expect(localData).toEqual(data);
// });

// it('should set data to cookie or local storage based on storage type', () => {
//     const key = 'testKey';
//     const data = { value: 'testValue' };
//     const options = { expires: 1 };
//     setStorageData('cookie', key, data, options);
//     setStorageData('local', key, data);

//     expect(document.cookie).toContain(
//         'testKey={%22value%22:%22testValue%22}',
//     );
//     expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
//         key,
//         JSON.stringify(data),
//     );
// });

// it('should remove data from cookie or local storage based on storage type', () => {
//     const key = 'testKey';
//     removeStorageData('cookie', key);
//     removeStorageData('local', key);

//     expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(key);
// });
// });
