import { renderHook, act } from '@testing-library/react-hooks';
import { useShowErrorMessage } from './useShowErrorMessage';

describe('useShowErrorMessage', () => {
    it('should show error message and then hide after delay', async () => {
        jest.useFakeTimers();

        const delay = 1000; // milliseconds
        const { result } = renderHook(() => useShowErrorMessage(delay));

        act(() => {
            result.current.showError();
        });

        expect(result.current.isShowError).toBe(true);

        act(() => {
            jest.advanceTimersByTime(delay);
        });

        expect(result.current.isShowError).toBe(false);

        jest.useRealTimers();
    });
});
