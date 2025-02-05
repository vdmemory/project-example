import { useRouter } from 'next/router';
import { useRef } from 'react';

export const useRouterParams = () => {
    const router = useRouter();
    const routerRef = useRef(router);
    const pathname = router.pathname;
    const query: {
        stepper?: number;
        step?: number;
        success?: string;
        viewType?: string;
    } = router.query;
    return { router, routerRef, query, pathname };
};
