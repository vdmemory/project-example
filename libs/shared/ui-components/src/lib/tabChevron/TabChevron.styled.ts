import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';

interface StyledTabChevronProps {
    isActive?: boolean;
    isClickable?: boolean;
    disabled?: boolean;
}

const concatMiddlePart = css`
    .left-part {
        :before,
        :after {
            border-right: none;
            width: calc(100% + 15px);
        }
    }
    .right-part {
        :before,
        :after {
            border-left: none;
        }
    }
`;

export const StyledTabChevron = styled.div<StyledTabChevronProps>`
    display: flex;
    flex: 1;
    align-items: center;
    position: relative;
    ${mixinTypography.text.tSmall.textSmallMedium};
    font-weight: bolder;
    height: 51px;
    transition: all 0.3s;

    ${({ isClickable, disabled }) => {
        if (disabled) {
            return css`
                cursor: not-allowed;
                opacity: 0.5;
            `;
        }
        if (isClickable) {
            return css`
                cursor: pointer;
            `;
        }
        return;
    }};

    ${({ isActive, disabled, isClickable }) => {
        const colorBorder = isActive ? '#E1895F' : '#d3d3d3';
        const colorBackground = isActive ? '#FBF0EB' : colors.white;
        const colorBackgroundHover = isActive ? '#FBF0EB' : '#f8f8f8';

        const hoverStyles = css`
            :hover {
                .left-part,
                .right-part {
                    :before,
                    :after {
                        background-color: ${colorBackgroundHover};
                    }
                }
            }
        `;

        return css`
            .left-part,
            .right-part {
                width: 50%;
                height: 100%;

                :before,
                :after {
                    content: '';
                    display: block;
                    border-left: 1px solid ${colorBorder};
                    border-right: 1px solid ${colorBorder};
                    background-color: ${colorBackground};
                    width: 100%;
                    height: calc(50% - 1px);
                }
                :before {
                    border-top: 1px solid ${colorBorder};
                    transform: skewX(30deg);
                }
                :after {
                    border-bottom: 1px solid ${colorBorder};
                    transform: skewX(-30deg);
                }
            }
            ${!isActive && !disabled && isClickable && hoverStyles};
        `;
    }};

    ${concatMiddlePart};

    span {
        position: absolute;
        margin-left: 24px;
        margin-right: 10px;
        z-index: 2;
    }

    :first-of-type .left-part,
    :last-of-type .right-part {
        :before,
        :after {
            transform: skewX(0.00000001deg);
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        height: 37px;
    }
`;
