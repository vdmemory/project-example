import {
    useCreateObjectFilesMutation,
    useSetFilesMutation,
} from '@breef/shared/data-access-upload';
import { useState } from 'react';
import { ObjectImageType } from '@breef/shared/types';

export const useSaveLogoImage = () => {
    const [createObjectFile] = useCreateObjectFilesMutation();
    const [setFile] = useSetFilesMutation();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [objectImage, setObjectImage] = useState<ObjectImageType[] | null>(
        null,
    );

    const uploadCroppedImage = async (croppedImage: Blob) => {
        setIsLoading(true);
        try {
            const payload = await createObjectFile({
                name: 'project-company-logo.jpg',
            }).unwrap();
            await setFile({
                path: payload.uploadUrl,
                file: croppedImage,
            }).unwrap();

            setObjectImage([
                {
                    id: payload.id,
                    name: payload.name,
                    url: payload.readUrl,
                },
            ]);
            setIsLoading(false);
        } catch (error) {
            console.error('rejected', error);
            setIsLoading(false);
        }
    };

    return { uploadCroppedImage, objectImage, isLoading };
};
