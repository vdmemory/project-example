import { renderHook, act } from '@testing-library/react-hooks';
import { TypeFieldNames } from '@breef/shared/constants';
import { useViewPassword } from './useViewPassword';

describe('useViewPassword', () => {
    it('should return toggle function and initial state for password field', () => {
        const { result } = renderHook(() =>
            useViewPassword(TypeFieldNames.PASSWORD),
        );
        expect(result.current.typeInput).toBe(TypeFieldNames.PASSWORD);
        act(() => {
            result.current.toggleTypeInput();
        });
        expect(result.current.typeInput).toBe(TypeFieldNames.TEXT);
    });

    it('should return toggle function and initial state for text field', () => {
        const { result } = renderHook(() =>
            useViewPassword(TypeFieldNames.TEXT),
        );
        expect(result.current.typeInput).toBe(TypeFieldNames.TEXT);
        act(() => {
            result.current.toggleTypeInput();
        });
        expect(result.current.typeInput).toBe(TypeFieldNames.PASSWORD);
    });
});
