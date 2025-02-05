import { renderHook, act } from '@testing-library/react-hooks';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import {
    useDeleteCardsMutation,
    useGetCardsQuery,
    usePostProjectMutation,
    useSetCardsMutation,
} from '@breef/shared/data-access-payments';
import {
    useMediaContext,
    useRequiresActionStripe,
    useUpdateCardControl,
} from '@breef/shared/hooks';
import { useProjectPostSelector } from '../../store/hooks';
import {
    getDefaultCardData,
    transformListAccount,
} from '../../adapters/transformListAccount';
import { PaymentStatusNames } from '@breef/shared/constants';
import { useProjectPostControl } from '.';
import { CardScreen } from '../../types/projectInfoTypes';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
    },
}));

jest.mock('@breef/shared/data-access-payments', () => ({
    useDeleteCardsMutation: jest.fn(),
    useGetCardsQuery: jest.fn(),
    usePostProjectMutation: jest.fn(),
    useSetCardsMutation: jest.fn(),
}));

jest.mock('@breef/shared/hooks', () => ({
    useMediaContext: jest.fn(),
    useRequiresActionStripe: jest.fn(),
    useUpdateCardControl: jest.fn(),
}));

jest.mock('../../store/hooks', () => ({
    useProjectPostSelector: jest.fn(),
}));

jest.mock('../../adapters/transformListAccount', () => ({
    getDefaultCardData: jest.fn(),
    transformListAccount: jest.fn(),
}));

describe('useProjectPostControl', () => {
    const mockSetScreen = jest.fn();
    const mockHandleBack = jest.fn();
    const mockSetSelectedCard = jest.fn();

    const defaultProps = {
        setScreen: mockSetScreen,
        handleBack: mockHandleBack,
        setSelectedCard: mockSetSelectedCard,
        isSelectedCard: false,
        terms: true,
    };

    const mockRouter = {
        query: { projectId: 1 },
    };

    beforeEach(() => {
        jest.clearAllMocks();

        (useRouter as jest.Mock).mockReturnValue(mockRouter);

        (useMediaContext as jest.Mock).mockReturnValue({ isMaxMobile: false });
        (useRequiresActionStripe as jest.Mock).mockReturnValue({
            handleAction: jest.fn(),
            isLoadingAction: false,
        });
        (useUpdateCardControl as jest.Mock).mockReturnValue({
            handleUpdateCard: jest.fn(),
            isLoadingUpdateCard: false,
        });
        (useProjectPostSelector as jest.Mock).mockReturnValue({
            projectPost: { couponInfo: { code: 'DISCOUNT2024' } },
        });
        (useGetCardsQuery as jest.Mock).mockReturnValue({
            data: [],
            isLoading: false,
            isFetching: false,
            isSuccess: true,
            isError: false,
        });
        (usePostProjectMutation as jest.Mock).mockReturnValue([
            jest.fn(),
            { isLoading: false },
        ]);
        (useSetCardsMutation as jest.Mock).mockReturnValue([
            jest.fn(),
            { isLoading: false },
        ]);
        (useDeleteCardsMutation as jest.Mock).mockReturnValue([
            jest.fn(),
            { isLoading: false, isSuccess: false, isError: false },
        ]);

        (transformListAccount as jest.Mock).mockReturnValue([]);
        (getDefaultCardData as jest.Mock).mockReturnValue({
            token: 'card_123',
            paymentStatus: PaymentStatusNames.CARD_EXIST,
        });
    });

    it('should initialize with correct default values', () => {
        const { result } = renderHook(() =>
            useProjectPostControl(defaultProps),
        );

        expect(result.current.isLoadingPost).toBe(false);
        expect(result.current.isLoadingSetCard).toBe(false);
        expect(result.current.isLoadingGetCards).toBe(false);
        expect(result.current.isFetchingGetCards).toBe(false);
        expect(result.current.isSuccessGetCards).toBe(true);
        expect(result.current.successScreenData).toBe(null);
        expect(result.current.errorScreenData).toBe('');
    });

    it('should handle card fetching error correctly', () => {
        (useGetCardsQuery as jest.Mock).mockReturnValueOnce({
            data: [],
            isLoading: false,
            isFetching: false,
            isSuccess: false,
            isError: true,
        });

        renderHook(() => useProjectPostControl(defaultProps));

        expect(toast.error).toHaveBeenCalledWith(
            'Something went wrong when getting cards',
        );
    });

    it('should set default card if not selected and available', () => {
        (transformListAccount as jest.Mock).mockReturnValueOnce([
            { token: 'card_123', paymentStatus: PaymentStatusNames.CARD_EXIST },
        ]);
        (getDefaultCardData as jest.Mock).mockReturnValueOnce({
            token: 'card_123',
            paymentStatus: PaymentStatusNames.CARD_EXIST,
        });

        renderHook(() => useProjectPostControl(defaultProps));

        expect(mockSetSelectedCard).toHaveBeenCalledWith({
            token: 'card_123',
            paymentStatus: PaymentStatusNames.CARD_EXIST,
        });
    });

    it('should navigate to card form screen if no cards and not on mobile', () => {
        renderHook(() => useProjectPostControl(defaultProps));

        expect(mockSetScreen).toHaveBeenCalledWith(CardScreen.FORM);
    });

    it('should handle post project correctly', async () => {
        const mockPostProject = jest.fn().mockResolvedValue({
            amount: '100.00',
            transaction: 'txn_123',
        });

        (usePostProjectMutation as jest.Mock).mockReturnValueOnce([
            mockPostProject,
            { isLoading: false },
        ]);
        const { result } = renderHook(() =>
            useProjectPostControl(defaultProps),
        );

        await act(async () => {
            await result.current.handlePostProject(
                'token_123',
                PaymentStatusNames.CARD_EXIST,
                'John Doe',
                true,
            );
        });

        expect(mockSetScreen).toHaveBeenCalled();
        expect(mockSetScreen).toHaveBeenCalledTimes(2);
        expect(mockSetScreen).toHaveBeenCalledWith('FORM_PAY_CARD');
    });

    it('should handle card removal correctly', async () => {
        const mockRemoveCard = jest.fn().mockResolvedValue({});
        (useDeleteCardsMutation as jest.Mock).mockReturnValueOnce([
            mockRemoveCard,
            { isLoading: false, isSuccess: true, isError: false },
        ]);

        const { result } = renderHook(() =>
            useProjectPostControl(defaultProps),
        );

        await act(async () => {
            await result.current.removeActions.removeCard('card_123');
        });

        expect(mockRemoveCard).toHaveBeenCalledWith('card_123');
        expect(toast.error).not.toHaveBeenCalled();
    });

    // it('should handle card removal error correctly', async () => {
    //     const mockRemoveCard = jest
    //         .fn()
    //         .mockRejectedValue(new Error('Removal failed'));
    //     (useDeleteCardsMutation as jest.Mock).mockReturnValueOnce([
    //         mockRemoveCard,
    //         { isLoading: false, isSuccess: false, isError: true },
    //     ]);

    //     const { result } = renderHook(() =>
    //         useProjectPostControl(defaultProps),
    //     );

    //     await act(async () => {
    //         await result.current.removeActions.removeCard('card_123');
    //     });

    //     expect(mockRemoveCard).toHaveBeenCalledWith('card_123');
    //     expect(toast.error).toHaveBeenCalledWith(
    //         'An error happened when trying to remove the Credit Card',
    //     );
    // });
});
