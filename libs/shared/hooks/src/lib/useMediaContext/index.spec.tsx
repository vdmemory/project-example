/* eslint-disable @typescript-eslint/no-var-requires */
import { renderHook } from '@testing-library/react-hooks';
import { MediaContext } from './mediaContext';
import { useMediaContext } from './useMediaContext';
import { MediaProvider } from './MediaProvider';

describe('useMediaContext', () => {
    it('should return the value from the MediaContext', () => {
        const mediaContextValue = {
            isSmallScreen: false,
            isMediumScreen: true,
            isLargeScreen: false,
            isMobile: false,
            isTablet: true,
            isMaxMobile: false,
            isLaptop: false,
        };

        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <MediaContext.Provider value={mediaContextValue}>
                {children}
            </MediaContext.Provider>
        );

        const { result } = renderHook(() => useMediaContext(), { wrapper });

        expect(result.current).toEqual(mediaContextValue);
    });
});

jest.mock('../useMediaQuery/useMediaQuery');

describe('MediaProvider', () => {
    it('should provide media query values to the MediaContext', () => {
        require('../useMediaQuery/useMediaQuery')
            .useMediaQuery.mockReturnValueOnce(true) // isMobile
            .mockReturnValueOnce(false) // isMaxMobile
            .mockReturnValueOnce(true) // isTablet
            .mockReturnValueOnce(false); // isLaptop

        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <MediaProvider>{children}</MediaProvider>
        );

        const { result } = renderHook(() => useMediaContext(), { wrapper });

        expect(result.current).toEqual({
            isMobile: true,
            isTablet: true,
            isMaxMobile: false,
            isLaptop: false,
        });
    });
});
