import { colors, fonts } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';
import { keyframes, css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

interface StyledLoaderProps {
    completeDelay?: number;
}

export const StyledDelayPageLoader = styled(motion.div)<StyledLoaderProps>`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 101;
    background-color: ${colors.mainPurple};

    &.complete {
        opacity: 0;
        transition: opacity ${({ completeDelay }) => completeDelay || 1000}ms
            ease;
        z-index: -1;
    }

    .header {
        position: fixed;
        height: 100px;
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: flex-start;
        padding-left: 37px;
        @media (${mediaScreen.tablet}) {
            padding-left: 23px;
        }

        svg {
            height: 50px;
            width: 50px;
            @media (${mediaScreen.tablet}) {
                height: 30px;
                width: 30px;
            }
        }
    }

    .content {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        flex: 1;
        text-transform: uppercase;
        font-family: ${fonts.default};
        font-size: 30px;
        gap: 30px;
        padding: 22px;

        .preview {
            font-family: ${fonts.biroScriptPlus};
            font-size: 40px;
            font-family: BiroScriptPlusRegular;
            text-transform: lowercase;
        }

        .loader-screen {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
            position: relative;

            .counter {
                font-size: 14px;
                font-family: ${fonts.accent};
                color: ${colors.mainOrange};
            }
        }
    }

    .error-message {
        font-size: 14px;
        font-family: ${fonts.accent};
        color: ${colors.mainOrange};
    }
`;

interface StyledDelayPageLoaderProps {
    isCurrentScreen?: boolean;
}

const screenEnter = keyframes`
    from {
        transform: scale(1.1);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
`;

const animation = ({ isCurrentScreen }: StyledDelayPageLoaderProps) => {
    if (isCurrentScreen)
        return css`
            animation: 0.45s cubic-bezier(0.42, 0, 0, 1) ${screenEnter};
        `;
    return css`
        opacity: 0;
    `;
};

export const StyledDynamicContent = styled.div`
    position: ${(props: StyledDelayPageLoaderProps) =>
        props.isCurrentScreen ? 'relative' : 'absolute'};
    ${animation};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;

    .image {
        height: 162px;
        @media (${mediaScreen.tablet}) {
            height: 93px;
        }
    }

    .description {
        text-align: center;
        line-height: 24px;
        @media (${mediaScreen.tablet}) {
            font-size: 16px;
        }
    }
`;
