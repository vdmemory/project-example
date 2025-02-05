import { renderHook, act } from '@testing-library/react-hooks';
import { ListType } from '@breef/shared/types';
import { useDocumentController } from './useDocumentController';

describe('useDocumentController', () => {
    const initialDocuments: ListType[] = [
        {
            id: 1,
            title: 'Document 1',
            link: 'https://example.com/doc1',
            type: 'link',
        },
        {
            id: 2,
            title: 'Document 2',
            link: 'https://example.com/doc2',
            type: 'link',
        },
    ];

    it('saveDocument - should add a new document when no currentFileId is provided', () => {
        const onChangeMock = jest.fn();

        const { result } = renderHook(() =>
            useDocumentController({
                documentsValue: initialDocuments,
                onChange: onChangeMock,
            }),
        );

        const newDocument: ListType[] = [
            {
                id: 3,
                title: 'Document 3',
                link: 'https://example.com/doc3',
                type: 'link',
            },
        ];

        act(() => {
            result.current.saveDocument(newDocument);
        });

        expect(onChangeMock).toHaveBeenCalledWith({
            target: {
                value: [...initialDocuments, ...newDocument],
            },
        });
    });
    it('handleDeleteLink - should remove a document with the specified id', () => {
        const onChangeMock = jest.fn();

        const { result } = renderHook(() =>
            useDocumentController({
                documentsValue: initialDocuments,
                onChange: onChangeMock,
            }),
        );

        act(() => {
            result.current.handleDeleteLink(1);
        });

        expect(onChangeMock).toHaveBeenCalledWith({
            target: {
                value: [initialDocuments[1]],
            },
        });
    });
    it('handleEditLink - should update a document with the specified id, title, and link', () => {
        const onChangeMock = jest.fn();

        const { result } = renderHook(() =>
            useDocumentController({
                documentsValue: initialDocuments,
                onChange: onChangeMock,
            }),
        );

        const updatedTitle = 'Updated Document 1';
        const updatedLink = 'https://example.com/updated-doc1';

        act(() => {
            result.current.handleEditLink(1, updatedTitle, updatedLink);
        });

        expect(onChangeMock).toHaveBeenCalledWith({
            target: {
                value: [
                    {
                        ...initialDocuments[0],
                        title: updatedTitle,
                        link: updatedLink,
                    },
                    initialDocuments[1],
                ],
            },
        });
    });
    it('handleAddLink - should add a new document with the specified title and link', () => {
        const onChangeMock = jest.fn();

        const { result } = renderHook(() =>
            useDocumentController({
                documentsValue: initialDocuments,
                onChange: onChangeMock,
            }),
        );

        const newTitle = 'New Document 321';
        const newLink = 'https://example.com';

        act(() => {
            result.current.handleAddLink({ title: newTitle, link: newLink });
        });

        expect(onChangeMock).toBeCalled();
    });
});
