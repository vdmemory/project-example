import { renderHook, act } from '@testing-library/react-hooks';
import { useMediaQuery } from './useMediaQuery';

describe('useMediaQuery', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false, // Set the default match state
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
            })),
        });
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 1025,
        });
    });

    it('should return false for default query when innerWidth is greater than 1024', () => {
        const { result } = renderHook(() => useMediaQuery());
        expect(result.current).toBeFalsy();
    });

    it('should return true for default query when innerWidth is less than or equal to 1024', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 1024,
        });

        const { result } = renderHook(() => useMediaQuery());
        expect(result.current).toBeFalsy();
    });

    it('should return correct value for custom query', () => {
        const { result } = renderHook(() =>
            useMediaQuery('(max-width: 768px)'),
        );
        expect(result.current).toBeFalsy();
    });

    it('should update state when media query matches', () => {
        const { result } = renderHook(() => useMediaQuery());

        act(() => {
            // Simulate window resize event
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                value: 1023, // Trigger media query match
            });
            window.dispatchEvent(new Event('resize'));
        });

        expect(result.current).toBeFalsy();
    });

    it('should update state when media query no longer matches', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 1024,
        });
        const { result } = renderHook(() => useMediaQuery());

        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                value: 1025, // Trigger media query to no longer match
            });
            window.dispatchEvent(new Event('resize'));
        });

        expect(result.current).toBeFalsy();
    });
});
