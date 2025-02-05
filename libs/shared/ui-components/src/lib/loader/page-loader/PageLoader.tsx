import { StyledLoader } from './PageLoader.styled';
import { useEffect, useRef, useState } from 'react';
import { redirectToApp } from '@breef/shared/utils';
import Spinner from '../../spinner/Spinner';

export interface PageLoaderProps {
    errorMessage?: string;
    allowRedirect?: string;
    delay?: number;
    isLoading?: boolean;
    setIsShowLoader?: (isShow: boolean) => void;
    isEmpty?: boolean;
}

export function PageLoader({
    errorMessage,
    allowRedirect = '',
    delay = 5000,
    isLoading,
    setIsShowLoader,
    isEmpty = false,
}: PageLoaderProps) {
    const [isHideAnimation, setIsHideAnimation] = useState(false);
    const loaderEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isLoading && setIsShowLoader) {
            setIsHideAnimation(isLoading);
            setTimeout(() => {
                setIsShowLoader(!isLoading);
            }, 1200);
        }
    }, [isLoading, setIsShowLoader]);

    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                if (!loaderEl.current) return;
                loaderEl.current.style.opacity = '0';
            }, 300);
        }
        if (allowRedirect) {
            setTimeout(() => {
                redirectToApp(allowRedirect);
            }, delay);
        }
    }, [allowRedirect, delay, errorMessage]);

    return (
        <StyledLoader
            data-testid="page-loader"
            className={
                isHideAnimation
                    ? 'loader-container loader-container-complete'
                    : 'loader-container'
            }
        >
            {!isEmpty ? (
                <div ref={loaderEl} className="loader-image">
                    <Spinner />
                </div>
            ) : null}

            {errorMessage ? <span>Error: {errorMessage}</span> : null}
        </StyledLoader>
    );
}
