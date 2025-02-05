import { renderHook } from '@testing-library/react-hooks';
import { useWindowSize } from './useWindowSize';

it('useWindowSize returns the expected window size', () => {
    const { result } = renderHook(() => useWindowSize());
    expect(result.current).toEqual({
        width: window.innerWidth,
        height: window.innerHeight,
    });
});
