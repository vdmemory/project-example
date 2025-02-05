import {
    useCreateObjectFilesMutation,
    useSetFilesMutation,
} from '@breef/shared/data-access-upload';
import { ListType } from '@breef/shared/types';
import { useState } from 'react';

interface Props {
    saveDocument: (fileLink: ListType[], currentFileId?: number) => void;
    deleteDocument?: (id: number | string) => void;
}

export const useSaveDocument = ({ saveDocument, deleteDocument }: Props) => {
    const [createObjectFile] = useCreateObjectFilesMutation();
    const [setFile] = useSetFilesMutation();

    const [uploading, setUploading] = useState(false);

    const uploadDocument = async (
        file: File,
        currentFileId?: number,
        currentTmpLoadingFileId?: number,
    ) => {
        try {
            setUploading(true);
            const payload = await createObjectFile({
                name: file.name,
            }).unwrap();
            await setFile({
                path: payload.uploadUrl,
                file: file,
            }).unwrap();
            const fileLink = [
                {
                    id: payload.id,
                    title: payload.name,
                    link: payload.readUrl,
                    thumbnail: payload.thumbnail,
                    type: 'file',
                    loading: false,
                },
            ];

            saveDocument(fileLink, currentFileId);
        } catch (error) {
            if (deleteDocument && currentTmpLoadingFileId) {
                deleteDocument(currentTmpLoadingFileId);
            } else {
                console.error('rejected', error);
            }
        } finally {
            setUploading(false);
        }
    };

    return { uploadDocument, uploading };
};
