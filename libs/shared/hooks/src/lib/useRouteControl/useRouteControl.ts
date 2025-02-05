import { useRouter } from 'next/router';

export const useRouteControl = () => {
    const router = useRouter();
    const pathname = router.pathname;
    const queryParams = router.query;
    const asPath = router.asPath;
    const isReady = router.isReady;
    const basePath = router.basePath;

    const clearHistoryQueryParams = async () => {
        window.history.pushState(null, '', `/client${asPath.split('?')[0]}`);
    };

    const updateHistoryQueryParams = async (queryParams: object) => {
        window.history.pushState(
            null,
            '',
            `${basePath}${asPath.split('?')[0]}?${new URLSearchParams(
                queryParams as any,
            ).toString()}`,
        );
    };

    const clearHistoryQueryParamsBasePath = async () => {
        const updatedUrl = `${basePath}${asPath.split('?')[0]}`;
        window.history.replaceState(
            { ...window.history.state, as: updatedUrl, url: updatedUrl },
            '',
            updatedUrl,
        );
    };

    const changeQueryParams = async (
        queryParams: object,
        isReplace?: boolean,
    ) => {
        const { replace, push } = router;
        const action = !isReplace ? push : replace;
        await action(
            {
                pathname: router.pathname,
                query: { ...queryParams },
            },
            undefined,
            { shallow: true },
        );
    };
    const changePage = async (path: string, queryParams?: object) => {
        if (queryParams) {
            await router.push(
                { pathname: path, query: { ...queryParams } },
                undefined,
                { shallow: true },
            );
            return;
        }

        await router.push(path, undefined, { shallow: true });
    };
    return {
        clearHistoryQueryParams,
        clearHistoryQueryParamsBasePath,
        changeQueryParams,
        updateHistoryQueryParams,
        changePage,
        router,
        pathname,
        queryParams,
        asPath,
        isReady,
        basePath,
    };
};
