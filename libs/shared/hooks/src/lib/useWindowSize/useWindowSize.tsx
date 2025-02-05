import { IS_CLIENT_PLATFORM } from '@breef/shared/constants';
import * as React from 'react';

export function useWindowSize() {
    const [windowSize, setWindowSize] = React.useState(getSize);

    function getSize() {
        return {
            width: IS_CLIENT_PLATFORM ? window.innerWidth : 0,
            height: IS_CLIENT_PLATFORM ? window.innerHeight : 0,
        };
    }

    React.useEffect(() => {
        function handleResize() {
            setWindowSize(getSize());
        }
        IS_CLIENT_PLATFORM && window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}
