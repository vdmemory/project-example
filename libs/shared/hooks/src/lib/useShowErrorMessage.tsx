import { useEffect, useState } from 'react';

export const useShowErrorMessage = (daley: number) => {
    const [isShowError, setIsShowError] = useState(false);

    const showError = () => setIsShowError(true);

    useEffect(() => {
        if (!isShowError) return;

        const timeout = setTimeout(() => {
            setIsShowError(false);
        }, daley);
        return () => clearTimeout(timeout);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShowError]);

    return { isShowError, showError };
};
