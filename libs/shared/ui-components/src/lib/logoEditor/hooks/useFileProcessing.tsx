import { useEffect, useState } from 'react';
import { getValidationMessage } from '../utils';

export const useFileProcessing = () => {
    const [error, setError] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setError('');
        }, 3000);
    }, [error]);

    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const processingFile = async (fileList: FileList | null) => {
        const fileListExist = fileList?.length && fileList?.length > 0;
        const errorMessage = fileListExist
            ? getValidationMessage(fileList)
            : '';
        if (errorMessage) setError(errorMessage);
        if (!errorMessage && fileListExist) {
            setError('');
            setImageSrc(URL.createObjectURL(fileList[0]));
        }
    };

    return {
        imageSrc,
        error,
        processingFile,
    };
};
