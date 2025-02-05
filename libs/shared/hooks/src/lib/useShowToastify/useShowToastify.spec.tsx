import { renderHook } from '@testing-library/react-hooks';
import { toast } from 'react-toastify';
import { ToastifyOptionsProps, useShowToastify } from './useShowToastify';

jest.mock('react-toastify');

describe('useShowToastify', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should show error toast for each validation error message', () => {
        const errors = {
            field1: { message: 'Error message 1' },
            field2: { message: 'Error message 2' },
        };
        renderHook(() => useShowToastify({ errors }));

        expect(toast.error).toHaveBeenCalledTimes(2);
        expect(toast.error).toHaveBeenCalledWith('Error message 1', {
            toastId: 'Error message 1',
        });
        expect(toast.error).toHaveBeenCalledWith('Error message 2', {
            toastId: 'Error message 2',
        });
    });

    it('should show default validation error message if no message is provided', () => {
        const errors = {
            field1: { message: '' },
        };
        renderHook(() => useShowToastify({ errors }));

        expect(toast.error).toHaveBeenCalledTimes(1);
        expect(toast.error).toHaveBeenCalledWith(
            'Sorry, something went wrong. Please try again later',
            { toastId: 'Sorry, something went wrong. Please try again later' },
        );
    });

    it('should show success toast if isSuccess is true', () => {
        renderHook(() =>
            useShowToastify({
                isSuccess: true,
                errors: {},
            } as ToastifyOptionsProps),
        );

        expect(toast.success).toHaveBeenCalledTimes(1);
        expect(toast.success).toHaveBeenCalledWith(
            'Changes saved successfully.',
        );
    });
});
