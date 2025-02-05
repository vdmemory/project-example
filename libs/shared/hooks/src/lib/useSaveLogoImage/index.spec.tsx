import { renderHook, act } from '@testing-library/react-hooks';
import { useSaveLogoImage } from './useSaveLogoImage';
import {
    useCreateObjectFilesMutation,
    useSetFilesMutation,
} from '@breef/shared/data-access-upload';

jest.mock('@breef/shared/data-access-upload', () => ({
    useCreateObjectFilesMutation: jest.fn(),
    useSetFilesMutation: jest.fn(),
}));

const mockSetFile = jest.fn();
const mockCreateObjectFile = jest.fn();

beforeAll(() => {
    (useSetFilesMutation as jest.Mock).mockImplementation(() => [mockSetFile]);
    (useCreateObjectFilesMutation as jest.Mock).mockImplementation(() => [
        mockCreateObjectFile,
    ]);
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('useSaveLogoImage', () => {
    it('should upload cropped image and set objectImage', async () => {
        const mockPayload = {
            id: 1,
            name: 'project-company-logo.jpg',
            uploadUrl: 'fake-upload-url',
            readUrl: 'fake-read-url',
        };
        const croppedImage = new Blob();

        mockCreateObjectFile.mockReturnValue({ unwrap: () => mockPayload });
        mockSetFile.mockReturnValue({ unwrap: () => croppedImage });

        (useCreateObjectFilesMutation as jest.Mock).mockReturnValue([
            mockCreateObjectFile,
        ]);
        (useSetFilesMutation as jest.Mock).mockReturnValue([mockSetFile]);

        const { result, waitForNextUpdate } = renderHook(() =>
            useSaveLogoImage(),
        );

        act(() => {
            result.current.uploadCroppedImage(croppedImage);
        });

        await waitForNextUpdate();

        expect(result.current.isLoading).toBe(false);

        expect(result.current.objectImage).toEqual([
            {
                id: 1,
                name: 'project-company-logo.jpg',
                url: 'fake-read-url',
            },
        ]);

        expect(mockCreateObjectFile).toHaveBeenCalledWith({
            name: 'project-company-logo.jpg',
        });
        expect(mockSetFile).toHaveBeenCalledWith({
            path: 'fake-upload-url',
            file: croppedImage,
        });
    });

    it('should upload cropped image and set objectImage on error', async () => {
        mockCreateObjectFile.mockReturnValue({
            unwrap: () => new Error('Failed to create object file'),
        });
        const { result, waitForNextUpdate } = renderHook(() =>
            useSaveLogoImage(),
        );

        const croppedImage = new Blob();

        act(async () => {
            await result.current.uploadCroppedImage(croppedImage);
        });

        await waitForNextUpdate();

        expect(result.current.isLoading).toBe(false);
    });
});
