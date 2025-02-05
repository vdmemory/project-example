// Import necessary testing libraries
import { renderHook, act } from '@testing-library/react-hooks';
import {
    useCreateObjectFilesMutation,
    useSetFilesMutation,
} from '@breef/shared/data-access-upload';

// Import the hook you want to test
import { useSaveDocument } from './useSaveDocument';

// Mock the useCreateObjectFilesMutation and useSetFilesMutation hooks
jest.mock('@breef/shared/data-access-upload', () => ({
    useCreateObjectFilesMutation: jest.fn(),
    useSetFilesMutation: jest.fn(),
}));

const mockCreateObjectFile = jest.fn();
const mockSetFile = jest.fn();

const mockFile = new File(['test content'], 'test_document.txt', {
    type: 'text/plain',
});

const mockPayload = {
    id: 1,
    name: 'test_document.txt',
    uploadUrl: 'https://example.com/upload',
    readUrl: 'https://example.com/read',
    thumbnail: 'https://example.com/thumbnail',
};

beforeAll(() => {
    (useSetFilesMutation as jest.Mock).mockImplementation(() => [mockSetFile]);
    (useCreateObjectFilesMutation as jest.Mock).mockImplementation(() => [
        mockCreateObjectFile,
    ]);
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('useSaveDocument', () => {
    it('should upload a document and call saveDocument', async () => {
        mockCreateObjectFile.mockReturnValue({ unwrap: () => mockPayload });
        mockSetFile.mockReturnValue({ unwrap: () => mockFile });
        const mockSaveDocument = jest.fn();

        const { result } = renderHook(() =>
            useSaveDocument({ saveDocument: mockSaveDocument }),
        );

        await act(async () => {
            await result.current.uploadDocument(mockFile, 2, 3);
        });

        expect(mockCreateObjectFile).toHaveBeenCalledWith({
            name: 'test_document.txt',
        });

        expect(mockSetFile).toHaveBeenCalledWith({
            path: 'https://example.com/upload',
            file: mockFile,
        });

        expect(mockSaveDocument).toHaveBeenCalledWith(
            [
                {
                    id: 1,
                    title: 'test_document.txt',
                    link: 'https://example.com/read',
                    thumbnail: 'https://example.com/thumbnail',
                    type: 'file',
                    loading: false,
                },
            ],
            2,
        );
    });

    it('should call deleteDocument on error', async () => {
        mockCreateObjectFile.mockReturnValue({
            unwrap: () =>
                new Promise((resolve, reject) => reject({ error: 'message' })),
        });

        const mockDeleteDocument = jest.fn();

        const { result } = renderHook(() =>
            useSaveDocument({
                saveDocument: jest.fn(),
                deleteDocument: mockDeleteDocument,
            }),
        );

        await act(async () => {
            await result.current.uploadDocument(
                new File(['test content'], 'test.txt'),
                2,
                3,
            );
        });

        expect(mockDeleteDocument).toHaveBeenCalled();
    });
});
