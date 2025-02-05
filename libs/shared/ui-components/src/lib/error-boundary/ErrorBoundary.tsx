import { NextPage } from 'next';
import { StyledErrorBoundary } from './StyledErrorBoundary';
import { heartBreakImage } from '@breef/shared/assets';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { notFoundUrl } from './notFound';
import { useRouteControl } from '@breef/shared/hooks';

/* eslint-disable-next-line */
export interface ErrorBoundaryProps {
    message?: string;
}

export const ErrorBoundary: NextPage<ErrorBoundaryProps> = ({
    message = "Something's not right at all",
}) => {
    const router = useRouter();
    const { changePage } = useRouteControl();
    const { asPath, route } = router;

    const checkIsOldRoutes = () => {
        const routesLength = notFoundUrl.length - 1;
        const pattern = /^\/projects\/[a-z]+/;
        const regex = new RegExp(pattern, 'g');
        if (regex.exec(asPath)?.length) {
            return changePage('/');
        }
        for (let i = 0; i <= routesLength; i++) {
            if (asPath.includes(notFoundUrl[i])) {
                return changePage('/');
            }
        }
        return;
    };

    useEffect(() => {
        if (route === '/404') {
            checkIsOldRoutes();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route, asPath]);

    return (
        <StyledErrorBoundary>
            <div className="error">
                <img src={heartBreakImage.src} alt="Heart Break" />
                <h1>{message}</h1>
            </div>
        </StyledErrorBoundary>
    );
};

export default ErrorBoundary;
