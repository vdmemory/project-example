import React from 'react';
import { useRouter } from 'next/router';
import Page404 from '../pages/404';

export const withDynamicPathIds = (
    WrappedComponent: (props: React.ReactNode | JSX.Element) => JSX.Element,
    queryParams: ('projectId' | 'pitchId' | 'paymentId')[],
) => {
    const InnerComponent = (props): JSX.Element => {
        const query = useRouter().query;
        const isSomeIdNaN = queryParams.some(item =>
            isNaN(Number(query[item])),
        );
        if (isSomeIdNaN) {
            return <Page404 />;
        }
        return <WrappedComponent {...props} />;
    };
    InnerComponent.displayName = 'withDynamicPathIds(InnerComponent)';

    return InnerComponent;
};
