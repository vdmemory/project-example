import styled from '@emotion/styled';
import { simpleAnimation } from '@breef/shared/assets';
import { colors, mediaScreen } from '@breef/shared/assets/variables';
import { colors as colorsUiKit } from '@breef/ui-kit';
import { css } from '@emotion/react';

interface StyledPopupProps {
    windowHeight: number;
    contentPopupHeight?: number;
    isLightCross: boolean;
}

export const getDefaultStylesPopupPreset = (
    isMobile: boolean,
    innerHeight: string,
) => {
    return {
        height: isMobile ? innerHeight : '95vh',
        maxHeight: isMobile ? innerHeight : 'unset',
        minHeight: isMobile ? innerHeight : 'unset',
        padding: isMobile ? '60px 16px 40px' : '60px 80px 80px',
        background: colorsUiKit.beige,
        margin: '0',
        minWidth: isMobile ? '100vw' : '1000px',
        maxWidth: isMobile ? '100vw' : '1000px',
        borderLeft: isMobile ? 'none' : '1px solid black',
        borderRight: isMobile ? 'none' : '1px solid black',
        borderTop: isMobile ? 'none' : '1px solid black',
        borderBottom: isMobile ? 'none' : '1px solid black',
        borderRadius: '4px',
    };
};

const checkIsNeedsScroll = (props: StyledPopupProps) => {
    if (
        props.contentPopupHeight &&
        props.windowHeight - 30 < props.contentPopupHeight
    ) {
        return css`
            overflow-y: auto !important;
            max-height: calc(${props.windowHeight}px - 30px);
        `;
    }
    return;
};

const checkIsLightCloseIcon = ({ isLightCross }: StyledPopupProps) =>
    isLightCross &&
    css`
        .close-icon line {
            stroke: ${colors.mainWhite};
        }
    `;

export const StyledPopup = styled.div`
    height: ${({ windowHeight }: StyledPopupProps) => windowHeight}px;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 20px 16px;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal-pop {
        margin: auto;
        position: relative;
        font-size: 18px;
        max-height: 50rem;
        max-width: 100vw;
        z-index: 999;
        background-color: white;
        color: inherit;
        min-width: 48rem;
        border: 1px solid black;
        ${simpleAnimation};
        overflow-y: auto;
        overflow-x: hidden;
        ${checkIsNeedsScroll};
        ${checkIsLightCloseIcon};

        @media (max-width: 1024px) {
            overflow-y: auto;
        }
    }
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 99;
        background: rgba(249, 247, 243, 0.8);
    }

    @media screen and (${mediaScreen.tablet}) {
        .modal-pop {
            max-width: calc(100vw - 30px);
            max-height: 100%;
            min-width: 100%;
        }
    }
`;

export const StyledPopupWindow = styled.div``;
