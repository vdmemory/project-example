import { getPromiseImage } from '@breef/shared/utils';
import { useState } from 'react';

export const useGetLoadingImage = (maxCalls = 6, delayCalls = 2500) => {
    const [image, setImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    let count = 0;

    const getImage = async (url: string) => {
        if (count > maxCalls) return setError('Image not found');
        // url = decodeURI(url);
        setLoading(true);
        try {
            await getPromiseImage(url);
            setImage(url);
        } catch (error) {
            setError(error as string);
            setTimeout(() => {
                count++;
                getImage(url);
            }, delayCalls);
        } finally {
            setLoading(false);
        }
    };

    return { image, error, loading, getImage };
};
