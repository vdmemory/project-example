import { renderHook } from '@testing-library/react-hooks';
import { useStorePathValues } from './useStorePathValues'; // Замените на путь к вашему модулю
import { getStorageData, setStorageData } from '@breef/shared/utils';

jest.mock('@breef/shared/utils', () => ({
    setStorageData: jest.fn(),
    getStorageData: jest.fn(),
}));

jest.mock('next/router', () => ({
    useRouter: jest.fn(() => ({ asPath: '/some-path' })),
}));

describe('useStorePathValues', () => {
    it('should store path values on client platform when prevPath is not present', () => {
        const prevPath = undefined;

        renderHook(() => useStorePathValues());

        (getStorageData as jest.Mock).mockReturnValue(prevPath);

        expect(setStorageData).toHaveBeenCalledWith(
            'cookie',
            'PREV_PATH',
            'null',
        );
        expect(setStorageData).toHaveBeenCalledWith(
            'cookie',
            'CURRENT_PATH',
            '/',
        );
        expect(setStorageData).toBeCalledTimes(4);
    });

    it('should not store path values if prevPath is present', () => {
        const prevPath = '/previous-path';

        (getStorageData as jest.Mock).mockReturnValue(prevPath);

        renderHook(() => useStorePathValues());

        expect(setStorageData).toHaveBeenCalledWith(
            'cookie',
            'PREV_PATH',
            '/previous-path',
        );
        expect(setStorageData).toHaveBeenCalledWith(
            'cookie',
            'CURRENT_PATH',
            '/',
        );
    });
});
