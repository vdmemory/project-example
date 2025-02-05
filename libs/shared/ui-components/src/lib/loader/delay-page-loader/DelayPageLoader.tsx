import { twoFists, okHand, dollarsFly, BreefLogo } from '@breef/shared/assets';
import { RoleFormNames } from '@breef/shared/constants';
import { RoleType } from '@breef/shared/types';
import { redirectToApp } from '@breef/shared/utils';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import TextLoader from '../text-loader/TextLoader';
import {
    StyledDelayPageLoader,
    StyledDynamicContent,
} from './DelayPageLoader.styled';

export interface DelayPageLoaderProps {
    errorMessage?: string;
    allowRedirect?: string;
    delayScreen?: number;
    delayRedirect?: number;
    delayHideLoader?: number;
    hideLoader?: (hide: boolean) => void;
    userType?: RoleType;
    isEmpty?: boolean;
    isDashboard?: boolean;
    loadingText?: string;
}

const configBrands = [
    {
        image: twoFists.src,
        description: 'CONNECTING YOU WITH THE BEST AGENCIES',
    },
    {
        image: okHand.src,
        description: 'MAKING PROJECT SCOPING EASY',
    },
    {
        image: dollarsFly.src,
        description: 'SIMPLIFYING PAYMENTS',
    },
];

const configAgencies = [
    {
        image: twoFists.src,
        description: 'CONNECTING YOU WITH THE BEST BRANDS',
    },
    {
        image: okHand.src,
        description: 'MAKING PROJECT SCOPING EASY',
    },
    {
        image: dollarsFly.src,
        description: 'SIMPLIFYING PAYMENTS',
    },
];

export function DelayPageLoader({
    userType = '',
    delayScreen = 1000,
    delayRedirect = 3000,
    delayHideLoader = 300,
    errorMessage,
    isEmpty = false,
    isDashboard = false,
    hideLoader,
    allowRedirect,
    loadingText,
}: DelayPageLoaderProps) {
    const [count, setCount] = useState(0);
    const [isHideLoader, setIsHideLoader] = useState(false);

    const getConfig = () => {
        if (userType === RoleFormNames.COMPANY) return configBrands;
        if (userType === RoleFormNames.AGENCY) return configAgencies;
        return null;
    };
    const config = getConfig();

    const isDisplayDynamicContent = isDashboard && !!config;

    useEffect(() => {
        if (!config) return;
        const timeoutCounter = setTimeout(() => {
            if (count < config.length - 1) return setCount(count + 1);
            setIsHideLoader(true);
        }, delayScreen);

        return () => clearTimeout(timeoutCounter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [config, count, delayScreen]);

    useEffect(() => {
        if (!isHideLoader) return;
        setTimeout(() => {
            hideLoader && hideLoader(isHideLoader);
        }, delayHideLoader);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHideLoader, delayHideLoader]);

    useEffect(() => {
        if (!allowRedirect) return;
        setTimeout(() => {
            redirectToApp(allowRedirect);
        }, delayRedirect);
    }, [allowRedirect, delayRedirect]);

    useEffect(() => {
        const body = document.body;
        body.style.overflow = 'hidden';
        return () => {
            body.style.overflow = 'auto';
        };
    }, []);

    const renderLoader = () => {
        if (errorMessage) return <ErrorLoader errorMessage={errorMessage} />;
        if (isEmpty) return null;
        if (isDisplayDynamicContent)
            return <LoaderScreen config={config} count={count} />;
        return <DefaultLoader loadingText={loadingText} />;
    };

    return ReactDOM.createPortal(
        <StyledDelayPageLoader
            className={`loader-container ${isHideLoader ? 'complete' : ''}`}
            data-testid={'delay-page-loader'}
        >
            <div className="header">
                <BreefLogo />
            </div>
            {renderLoader()}
        </StyledDelayPageLoader>,
        document.body,
    );
}

export function LoaderScreen({
    count,
    config,
}: {
    count: number;
    config: { image: string; description: string }[];
}) {
    const totalQuantity = config.length;
    const currentScreen = count % totalQuantity;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            exit={{ opacity: 0 }}
            className="content"
        >
            <div className="preview">we are</div>

            <div className="loader-screen">
                {config.map(({ image, description }, key) => {
                    return (
                        <DynamicScreen
                            key={`screen-${key}`}
                            image={image}
                            description={description}
                            isCurrentScreen={currentScreen === key}
                        />
                    );
                })}
                <div className="counter">{`DASHBOARD IN ${
                    totalQuantity - count
                }..`}</div>
            </div>
        </motion.div>
    );
}

export function DynamicScreen({
    image,
    description,
    isCurrentScreen,
}: {
    image: string;
    description: string;
    isCurrentScreen?: boolean;
}) {
    return (
        <StyledDynamicContent isCurrentScreen={isCurrentScreen}>
            <img className="image" src={image} alt="Icon Loader" />
            <div className="description">{description}</div>
        </StyledDynamicContent>
    );
}

export function ErrorLoader({ errorMessage }: { errorMessage: string }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="content"
        >
            <div className="error-message">Error: {errorMessage}</div>
        </motion.div>
    );
}

export function DefaultLoader({ loadingText }: { loadingText?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            exit={{ opacity: 0 }}
            className="content"
        >
            <TextLoader loadingText={loadingText} />
        </motion.div>
    );
}
