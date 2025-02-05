// Import required testing libraries
import { renderHook, act } from '@testing-library/react-hooks';
import { useGetLoadingImage } from './useGetLoadingImage'; // Update the import path based on your project structure
import { getPromiseImage } from '@breef/shared/utils';

jest.mock('@breef/shared/utils', () => ({
    getPromiseImage: jest.fn(),
}));

afterEach(() => {
    jest.clearAllMocks();
});
describe('useGetLoadingImage', () => {
    it('fetches the image successfully', async () => {
        (getPromiseImage as jest.Mock).mockResolvedValue('');

        const url = 'https://example.com/image.jpg';

        const { result, waitForNextUpdate } = renderHook(() =>
            useGetLoadingImage(3, 100),
        );

        expect(result.current.image).toBeNull();
        expect(result.current.error).toBeNull();
        expect(result.current.loading).toBe(false);

        act(() => {
            result.current.getImage(url);
        });

        expect(result.current.loading).toBe(true);

        await waitForNextUpdate();

        expect(result.current.loading).toBe(false);

        expect(result.current.image).toBe(url);

        expect(result.current.error).toBeNull();

        expect(getPromiseImage).toHaveBeenCalledWith(url);
    });
});

describe('useGetLoadingImage failure', () => {
    it('sets an error if image fetching fails after maxCalls retries', async () => {
        (getPromiseImage as jest.Mock).mockRejectedValue('Image not found');

        const url = 'https://example.com/nonexistent.jpg';

        const { result, waitForNextUpdate } = renderHook(() =>
            useGetLoadingImage(3, 100),
        );

        act(() => {
            result.current.getImage(url);
        });

        await waitForNextUpdate();

        expect(result.current.loading).toBe(false);

        expect(result.current.error).toBe('Image not found');

        expect(result.current.image).toBeNull();

        expect(getPromiseImage).toHaveBeenCalled();
    });
});
