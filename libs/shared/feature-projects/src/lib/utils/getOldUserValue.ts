import { IS_OLD_USER } from '@breef/shared/constants';
import { getStorageData, removeStorageData } from '@breef/shared/utils';

export const getOldUserValue = () => {
    const isOldUser = getStorageData('cookie', IS_OLD_USER);
    if (isOldUser === 'true') return true;
    return false;
};

export const removeOldUserValue = () => {
    removeStorageData('cookie', IS_OLD_USER);
};
