import React from 'react';

export interface MediaContextProps {
    isMobile: boolean;
    isTablet: boolean;
    isMaxMobile: boolean;
    isLaptop: boolean;
}

const mediaContextDefaultValues = {
    isMobile: false,
    isTablet: false,
    isMaxMobile: false,
    isLaptop: false,
};

export const MediaContext = React.createContext<MediaContextProps>(
    mediaContextDefaultValues,
);
