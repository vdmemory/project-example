import { renderHook, act } from '@testing-library/react-hooks';
import { useLimitSymbols } from './useLimitSymbols';

describe('useLimitSymbols', () => {
    it('should not call onChange if maxLength is not provided', () => {
        const onChange = jest.fn();
        const { result } = renderHook(() =>
            useLimitSymbols({
                value: 'test',
                onChange,
            }),
        );

        expect(result.current).toBeUndefined();
        expect(onChange).not.toHaveBeenCalled();
    });

    it('should not call onChange if value is not provided', () => {
        const onChange = jest.fn();
        const { result } = renderHook(() =>
            useLimitSymbols({
                maxLength: 5,
                onChange,
            }),
        );

        expect(result.current).toBeUndefined();
        expect(onChange).not.toHaveBeenCalled();
    });

    it('should not call onChange if value length is less than maxLength', () => {
        const onChange = jest.fn();
        const { result } = renderHook(() =>
            useLimitSymbols({
                value: 'test',
                onChange,
                maxLength: 5,
            }),
        );

        expect(result.current).toBeUndefined();
        expect(onChange).not.toHaveBeenCalled();
    });

    it('should call onChange with sliced value if value length is greater than maxLength', () => {
        const onChange = jest.fn();
        const { result } = renderHook(() =>
            useLimitSymbols({
                value: 'testing',
                onChange,
                maxLength: 5,
            }),
        );

        expect(result.current).toBeUndefined();
        expect(onChange).toHaveBeenCalledWith('testi');
    });

    it('should call onChange with sliced value when value changes', () => {
        const onChange = jest.fn();
        const { result, rerender } = renderHook(
            ({ value }) =>
                useLimitSymbols({
                    value,
                    onChange,
                    maxLength: 5,
                }),
            { initialProps: { value: 'test' } },
        );

        expect(result.current).toBeUndefined();
        expect(onChange).not.toHaveBeenCalled();

        act(() => {
            rerender({ value: 'testing' });
        });

        expect(onChange).toHaveBeenCalledWith('testi');
    });
});
