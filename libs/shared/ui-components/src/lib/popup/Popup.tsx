import { IS_CLIENT_PLATFORM } from '@breef/shared/constants';
import React, {
    ComponentType,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';
import ReactDOM from 'react-dom';
import HeaderPopup from './headerPopup/HeaderPopup';
import {
    StyledPopup,
    StyledPopupWindow,
    getDefaultStylesPopupPreset,
} from './Popup.styled';
import { SerializedStyles } from '@emotion/react';

const openModalClassName = 'open-modal';

type PopupRestProps = {
    children: ReactNode;
};
export interface PopupProps {
    close?: () => void;
    style?: React.CSSProperties;
    styleCss?: SerializedStyles;
    isClosable?: boolean;
    isLightCross?: boolean;
}

export const Popup = ({
    close,
    style,
    styleCss,
    children,
    isClosable = true,
    isLightCross = false,
}: PopupProps & PopupRestProps) => {
    const [windowInnerHeight, setWindowInnerHeight] = useState(
        window.innerHeight,
    );
    const popupRef = useRef<HTMLDivElement>(null);
    const [contentPopupHeight, setContentPopupHeight] = useState(0);
    const reCalculateWindowInnerHeight = () =>
        setWindowInnerHeight(window.innerHeight);

    useEffect(() => {
        const documentMainElem = document.getElementsByTagName('main')[0];
        document.body.classList.add(openModalClassName);
        if (documentMainElem) {
            documentMainElem.classList.add(openModalClassName);
        }
        return () => {
            document.body.classList.remove(openModalClassName);
            if (documentMainElem) {
                documentMainElem.classList.remove(openModalClassName);
            }
        };
    }, []);

    useEffect(() => {
        if (popupRef.current) {
            const height = popupRef.current.scrollHeight;
            setContentPopupHeight(height);
        }
    }, []);

    useEffect(() => {
        if (IS_CLIENT_PLATFORM) {
            reCalculateWindowInnerHeight();
            window.addEventListener('resize', reCalculateWindowInnerHeight);
        }
        return () => {
            window.removeEventListener('resize', reCalculateWindowInnerHeight);
        };
    }, []);

    return ReactDOM.createPortal(
        <StyledPopup
            className="popup-wrapper"
            windowHeight={windowInnerHeight}
            contentPopupHeight={contentPopupHeight}
            isLightCross={isLightCross}
        >
            <StyledPopupWindow
                ref={popupRef}
                style={style}
                css={styleCss}
                className="modal-pop"
                role="dialog"
                aria-modal="true"
            >
                {isClosable && close && <HeaderPopup onClose={close} />}
                {children}
            </StyledPopupWindow>
            <div
                className="modal-overlay"
                role="button"
                tabIndex={0}
                onClick={isClosable ? close : undefined}
            ></div>
        </StyledPopup>,
        document.body,
    );
};

export const withPopup = <P extends object>(
    WrappedComponent: ComponentType<P>,
    stylePreset?: React.CSSProperties,
    isClosable = true,
) => {
    return (props: P & PopupProps) => {
        const { close, style } = props;
        return (
            <Popup
                close={close}
                style={style ?? stylePreset}
                isClosable={isClosable}
            >
                <WrappedComponent {...props} />
            </Popup>
        );
    };
};

export { getDefaultStylesPopupPreset };
