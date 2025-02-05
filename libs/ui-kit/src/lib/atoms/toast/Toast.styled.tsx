import styled from '@emotion/styled';
import { colors, mixinTypography } from '../../styles';
import { css, keyframes } from '@emotion/react';
import { ToastSentimentType } from '@breef/shared/types';

interface StyledToastProps {
    sentiment: ToastSentimentType;
    autoClose?: number | false;
}

export const progressDelay = 700;

const neutralToast = css`
    background-color: ${colors.secondary.secondary50};
    .progress-bar > span {
        background-color: ${colors.secondary.secondary500};
    }
`;
const positiveToast = css`
    background-color: ${colors.success.success50};
    .progress-bar > span {
        background-color: ${colors.success.success500};
    }
`;
const negativeToast = css`
    background-color: ${colors.error.error50};
    .progress-bar > span {
        background-color: ${colors.error.error500};
    }
`;
const attentiveToast = css`
    background-color: ${colors.warning.warning50};
    .progress-bar > span {
        background-color: ${colors.warning.warning500};
    }
`;
const informativeToast = css`
    background-color: ${colors.blue.blue50};
    .progress-bar > span {
        background-color: ${colors.blue.blue500};
    }
`;

const getToastSentiment = ({ sentiment }: StyledToastProps) => {
    switch (sentiment) {
        case 'neutral':
            return neutralToast;
        case 'positive':
            return positiveToast;
        case 'negative':
            return negativeToast;
        case 'attentive':
            return attentiveToast;
        case 'informative':
            return informativeToast;
    }
};

const animationProgress = keyframes`
    0% {
        transform: scaleY(1);
    }
    100%{
        transform: scaleY(0);
    }
`;

export const StyledToast = styled.div<StyledToastProps>`
    display: flex;
    width: 240px;
    padding: 12px 12px 12px 20px;
    gap: 8px;
    border: 1px solid ${colors.grey.grey900};
    overflow: hidden;
    position: relative;

    .progress-bar {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 6px;
        border-right: 1px solid ${colors.grey.grey900};
        background-color: ${colors.white};

        > span {
            transform-origin: bottom;
            display: block;
            width: 100%;
            height: 100%;
            animation: ${animationProgress} linear 1 forwards
                ${(props: StyledToastProps) => props.autoClose || 0}ms
                ${progressDelay}ms;
        }
    }

    .icon-notify-wrapper {
        width: 24px;
        svg {
            width: inherit;
            height: auto;
        }
    }

    .content-wrapper {
        display: flex;
        flex-direction: column;
        gap: 8px;
        color: ${colors.grey.grey900};
        overflow: hidden;

        h3 {
            ${mixinTypography.text.tMd.textMdMedium};
            margin: 0;
            word-break: break-word;
        }
        p {
            ${mixinTypography.text.tSmall.textSmallRegular};
            margin: 0;
            word-break: break-word;
        }

        a {
            display: flex;
            align-items: center;
            color: ${colors.primary.primary500};
            ${mixinTypography.text.tXs.textXsMedium};
            text-decoration: none;
            max-width: 100%;
            white-space: nowrap;

            span {
                text-overflow: ellipsis;
                overflow: hidden;
            }

            svg {
                min-width: 24px;
                width: 24px;
                height: auto;
                path {
                    stroke: ${colors.primary.primary500};
                }
            }
        }
    }

    .button-close {
        display: flex;
        margin-left: auto;
        border: none;
        outline: none;
        background-color: transparent;
        padding: 0;
        cursor: pointer;
        height: fit-content;
        svg {
            min-width: 24px;
            width: 24px;
            height: auto;
        }
    }

    ${getToastSentiment};
`;
