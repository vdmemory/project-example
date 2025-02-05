import { useEffect, useState } from 'react';

const DEFAULT_QUERY = '(max-width: 1024px)';
const DEFAULT_WIDTH = 1024;

export const useMediaQuery = (query = DEFAULT_QUERY) => {
    const [mQuery, setMQuery] = useState<boolean>(
        window.innerWidth < DEFAULT_WIDTH,
    );

    const listener = (event: MediaQueryListEvent) => {
        setMQuery(event.matches);
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        mediaQuery?.addEventListener('change', listener);
        return () => {
            mediaQuery?.removeEventListener('change', listener);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return mQuery;
};
