import { SIGN_IN_ROUTE } from '@breef/shared/constants';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export default function IndexPage() {
    const router = useRouter();
    const routerRef = useRef(router);

    useEffect(() => {
        routerRef.current.push(SIGN_IN_ROUTE).then(() => null);
    }, []);

    return <></>;
}
