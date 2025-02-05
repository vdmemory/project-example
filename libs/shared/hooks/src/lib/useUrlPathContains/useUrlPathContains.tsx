import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useUrlPathContains = ({ pathNames }: { pathNames: string[] }) => {
    const router = useRouter();
    const [hasMatchedPath, setHasMatchedPath] = useState(false);

    const checkIsContainsUrlPath = () => {
        const containsPath = pathNames.some(pathName =>
            router.pathname.includes(pathName),
        );
        setHasMatchedPath(containsPath);
    };

    useEffect(() => {
        if (pathNames.length) {
            checkIsContainsUrlPath();
        }
        //eslint-disable-next-line
    }, [pathNames]);

    return { hasMatchedPath };
};
