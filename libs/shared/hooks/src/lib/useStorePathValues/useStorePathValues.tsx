import {
    CURRENT_PATH,
    IS_CLIENT_PLATFORM,
    PREV_PATH,
} from '@breef/shared/constants';
import { getStorageData, setStorageData } from '@breef/shared/utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function storePathValues(prevPath?: string) {
    setStorageData('cookie', PREV_PATH, prevPath || 'null');
    setStorageData('cookie', CURRENT_PATH, globalThis.location.pathname);
}

export const useStorePathValues = () => {
    const router = useRouter();
    const prevPath = getStorageData('cookie', CURRENT_PATH) as
        | string
        | undefined;

    if (IS_CLIENT_PLATFORM && !prevPath) {
        storePathValues(prevPath);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => storePathValues(prevPath), [router.asPath]);
};
