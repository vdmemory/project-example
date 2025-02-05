import { useRouter } from 'next/router';
import { useCallback, useRef } from 'react';

export const useRedirectTo = () => {
    const router = useRouter();
    const routerRef = useRef(router);
    const { pathname } = router;
    const queryParams = router.query;

    const redirectTo = useCallback(
        (queryParamValue: string, queryParamName?: string) => {
            if (
                router.query !== undefined &&
                'nextPath' in router.query &&
                !queryParamValue
            ) {
                routerRef.current
                    .push(
                        {
                            pathname,
                            query: {
                                nextPath: `${queryParams['nextPath']}`,
                            },
                        },
                        undefined,
                        {
                            shallow: true,
                        },
                    )
                    .then(() => null);
            } else if (!queryParamValue) {
                routerRef.current
                    .push({ pathname }, undefined, {
                        shallow: true,
                    })
                    .then(() => null);
            } else {
                routerRef.current
                    .push(
                        {
                            pathname,
                            query: {
                                ...queryParams,
                                [queryParamName || queryParamValue]:
                                    queryParamValue,
                            },
                        },
                        undefined,
                        {
                            shallow: true,
                        },
                    )
                    .then(() => null);
            }
        },
        [pathname, queryParams],
    );
    return redirectTo;
};
