import { renderHook, act } from '@testing-library/react-hooks';
import { useMethodControl } from './useMethodControl';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSendSelectedAgencyMutation } from '@breef/shared/data-access-project';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
    },
}));

jest.mock('@breef/shared/data-access-project', () => ({
    useSendSelectedAgencyMutation: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;
const mockToastError = toast.error as jest.Mock;
const mockUseSendSelectedAgencyMutation =
    useSendSelectedAgencyMutation as jest.Mock;

describe('useMethodControl hook', () => {
    const setStepper = jest.fn();
    const stepper = { mainStep: 1, subStep: 1 };

    beforeEach(() => {
        mockUseRouter.mockReturnValue({
            query: { projectId: '1' },
            push: jest.fn(),
        });

        mockUseSendSelectedAgencyMutation.mockReturnValue([
            jest.fn(),
            { isLoading: false },
        ]);
    });

    it('should handle increment correctly when not on the final step', () => {
        const { result } = renderHook(() =>
            useMethodControl({ stepper, setStepper }),
        );

        act(() => {
            result.current.handleIncrement();
        });

        expect(setStepper).toHaveBeenCalledWith({
            mainStep: 2,
            subStep: 2,
        });
    });

    it('should update selectedItem state when an agency is selected', () => {
        const { result } = renderHook(() =>
            useMethodControl({ stepper, setStepper }),
        );

        act(() => {
            result.current.handleSelectAgency(1);
        });

        expect(result.current.selectedItem).toEqual([1]);

        act(() => {
            result.current.handleSelectAgency(1);
        });

        expect(result.current.selectedItem).toEqual([]);
    });

    it('should handle loading state', () => {
        mockUseSendSelectedAgencyMutation.mockReturnValueOnce([
            jest.fn(),
            { isLoading: true },
        ]);

        const { result } = renderHook(() =>
            useMethodControl({ stepper, setStepper }),
        );

        expect(result.current.isLoading).toBe(true);
    });
});
