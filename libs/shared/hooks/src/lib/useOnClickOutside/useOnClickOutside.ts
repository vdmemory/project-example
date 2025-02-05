import { IS_CLIENT_PLATFORM } from '@breef/shared/constants';
import { RefObject, useCallback, useEffect } from 'react';

export const useOnClickOutside = (
    ref: RefObject<HTMLElement>,
    close: () => void,
) => {
    const checkIsNotContainsElement = useCallback(
        (e: Event) => {
            const target = e.target as HTMLElement;
            if (target !== ref.current && !ref.current?.contains(target)) {
                close();
            }
        },
        [ref, close],
    );

    useEffect(() => {
        IS_CLIENT_PLATFORM &&
            window.addEventListener('click', checkIsNotContainsElement);
        return () =>
            window.removeEventListener('click', checkIsNotContainsElement);
    }, [checkIsNotContainsElement]);
};
