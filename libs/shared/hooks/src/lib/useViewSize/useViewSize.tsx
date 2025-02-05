import { useEffect, useState } from 'react';
import { IS_CLIENT_PLATFORM } from '@breef/shared/constants';
import { debounce } from 'lodash';

export const useViewSize = () => {
    const [viewHeight, setViewHeight] = useState(0);

    const updateViewHeight = () => {
        setViewHeight(window.visualViewport?.height ?? window.innerHeight);
    };
    const updateViewHeightWithDebounce = debounce(updateViewHeight, 50);

    useEffect(() => {
        const windowViewport = IS_CLIENT_PLATFORM
            ? window.visualViewport ?? window
            : undefined;

        const body = document.getElementsByTagName('body')[0];

        body.addEventListener('focusout', updateViewHeightWithDebounce);

        if (windowViewport) {
            windowViewport.addEventListener(
                'resize',
                updateViewHeightWithDebounce,
            );
            updateViewHeight();
        }

        return () => {
            windowViewport?.removeEventListener(
                'resize',
                updateViewHeightWithDebounce,
            );
            body.removeEventListener('focusout', updateViewHeightWithDebounce);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        viewHeight,
    };
};
