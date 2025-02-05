import { getOldUserValue, removeOldUserValue } from './getOldUserValue';
import { getStorageData, removeStorageData } from '@breef/shared/utils';

jest.mock('@breef/shared/utils', () => ({
    getStorageData: jest.fn(),
    removeStorageData: jest.fn(),
}));

describe('getOldUserValue', () => {
    it('should return true if isOldUser is "true" in storage', () => {
        (getStorageData as jest.Mock).mockReturnValue('true');
        const result = getOldUserValue();
        expect(result).toBe(true);
        expect(getStorageData).toHaveBeenCalledWith('cookie', 'IS_OLD_USER');
    });

    it('should return false if isOldUser is not "true" in storage', () => {
        (getStorageData as jest.Mock).mockReturnValue('false');
        const result = getOldUserValue();
        expect(result).toBe(false);
        expect(getStorageData).toHaveBeenCalledWith('cookie', 'IS_OLD_USER');
    });

    it('should return false if isOldUser is not found in storage', () => {
        (getStorageData as jest.Mock).mockReturnValue(null);
        const result = getOldUserValue();
        expect(result).toBe(false);
        expect(getStorageData).toHaveBeenCalledWith('cookie', 'IS_OLD_USER');
    });
});

describe('removeOldUserValue', () => {
    it('should remove isOldUser from storage', () => {
        removeOldUserValue();
        expect(removeStorageData).toHaveBeenCalledWith('cookie', 'IS_OLD_USER');
    });
});
