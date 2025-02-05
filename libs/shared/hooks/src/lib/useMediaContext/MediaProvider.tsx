import React, { ReactNode } from 'react';
import { useMediaQuery } from '../useMediaQuery/useMediaQuery';
import { MediaContext } from './mediaContext';

const { Provider } = MediaContext;

export const MediaProvider = ({ children }: { children: ReactNode }) => {
    const isMobile = useMediaQuery();
    const isMaxMobile = useMediaQuery(); // '(max-width: 428px)'
    const isTablet = useMediaQuery(); // '(max-width: 768px)'
    const isLaptop = useMediaQuery(); // '(max-width: 1024px)'

    return (
        <Provider
            value={React.useMemo(
                () => ({
                    isMobile,
                    isTablet,
                    isMaxMobile,
                    isLaptop,
                }),
                [isMobile, isTablet, isMaxMobile, isLaptop],
            )}
        >
            {children}
        </Provider>
    );
};
