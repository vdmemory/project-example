import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '../../styles/colors';
import { mixinTypography } from '../../styles/mixins/typography.styled';

interface StyledDropDownProps {
    isError?: boolean;
    isSearchable?: boolean;
    isShow?: boolean;
    small?: boolean;
    isGrouped?: boolean;
    isDefaultView?: boolean;
}

const groupedCss = css`
    .options.grouped {
        top: 63px;

        .group {
            padding: 0;

            .group-name {
                font-weight: 700;
                font-size: 15px;
                line-height: 20px;
                text-transform: uppercase;
                margin: 0;
                padding: 10px 20px 5px;
            }

            .group-list {
                padding: 0;
                margin: 0;

                .group-item {
                    padding: 10px 30px;
                    list-style: none;
                }
            }
        }
    }

    .error {
        position: absolute;
    }
`;

const smallDropDownCss = css`
    input.dropdown-input {
        padding: 10px 22px 10px 20px;
        font-size: 18px;
        line-height: 28px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border: none;
    }

    .chevron {
        right: 0px;
    }

    .options {
        top: 47px;
        width: 90%;
        left: 50%;
        transform: translate(-50%, 0);
        max-height: 200px;

        li {
            font-size: 16px;
            line-height: 20px;

            &:first-of-type {
                padding-top: 20px;
            }

            &:last-of-type {
                padding-bottom: 20px;
            }
        }
    }
`;

const defaultViewsDropDownCss = css`
    input.dropdown-input {
        padding: 13px 40px 13px 12px;
        ${mixinTypography.text.tMd.textMdMedium};
        height: 48px;
        border-radius: 4px;
    }

    .error {
        position: absolute;
        ${mixinTypography.text.tXs.textXsRegular};
        color: ${colors.error.error700};
        margin-top: 12px;
    }

    .chevron {
        top: 50%;
        transform: translateY(-50%);
    }

    .options {
        transition: none;
        max-height: 200px;
        top: 0;
        left: 0;
        li {
            font-size: 16px;
            line-height: 20px;

            &:first-of-type {
                padding-top: 20px;
            }

            &:last-of-type {
                padding-bottom: 20px;
            }
        }
    }
`;

const searchableCss = css`
    cursor: pointer;
`;

const errorInputCss = css`
    border-color: ${colors.error.error500};
    color: ${colors.error.error500};
`;
const errorInputDefaultCss = css`
    border-color: ${colors.error.error700};
    color: ${colors.error.error700};
`;

const errorChevronCss = css`
    path {
        stroke: ${colors.error.error500};
    }
`;
const errorChevronDefaultCss = css`
    path {
        stroke: ${colors.error.error700};
    }
`;

const errorCss = css`
    height: 15px;
    opacity: 1;
`;

const showListCss = css`
    max-height: 240px;
    border: 1px solid ${colors.black};
    height: auto;
    opacity: 1;
    z-index: 11;
`;

const chevronWhenShowListCss = css`
    transform: translateY(-50%) scale(1, -1);
`;

export const StyledDropDown = styled.div<StyledDropDownProps>`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    transition: background-color 0.2s ease-in-out;

    :hover {
        background-color: ${colors.secondary.secondary200};
    }

    ${({ isSearchable }) => !isSearchable && searchableCss}

    .options {
        position: absolute;
        top: 46px;
        left: 0;
        width: 100%;
        background: ${colors.white};
        z-index: 9;
        height: auto;
        max-height: 240px;
        overflow-y: auto;
        opacity: 0;
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        transition: all 0.1s ease-in-out;
        overscroll-behavior: contain;

        ${({ isShow }) => isShow && showListCss}

        li {
            padding: 10px 20px;
            width: 100%;
            font-size: 22px;
            line-height: 27px;
            cursor: pointer;

            &:hover,
            &.selected {
                background: ${colors.secondary.secondary200};
            }
        }
    }

    .input-wrapper {
        position: relative;
        width: 100%;

        ${({ isShow }) =>
            isShow &&
            css`
                z-index: 999;
            `}
    }

    input.dropdown-input {
        border: 1px solid ${colors.black};
        box-sizing: border-box;
        padding: 10px 40px 10px 20px;
        font-size: 24px;
        line-height: 29px;
        width: 100%;
        outline: none;
        transition: border-color 0.2s ease-in-out;
        height: 60px;
        position: relative;
        z-index: 10;
        background: transparent;
        text-transform: unset;
        border-radius: 0;
        cursor: pointer;

        ${({ isShow }) =>
            isShow &&
            css`
                box-shadow: none !important;
            `}

        &:focus {
            border-color: ${colors.black};
        }

        ${({ isError }) => isError && errorInputCss};
        ${({ isError, isDefaultView }) => {
            if (!isError) return;
            if (isDefaultView) return errorInputDefaultCss;
            return errorInputCss;
        }};
    }

    .chevron {
        position: absolute;
        top: 30px;
        right: 13px;
        height: 22px;
        transform: translateY(-50%) scale(1, 1);
        transition: transform 0.2s ease-in-out;
        z-index: 10;

        ${({ isShow }) => isShow && chevronWhenShowListCss};
        ${({ isError, isDefaultView }) => {
            if (!isError) return;
            if (isDefaultView) return errorChevronDefaultCss;
            return errorChevronCss;
        }};
    }

    .error {
        color: ${colors.error.error500};
        font-size: 14px;
        line-height: 20px;
        margin-top: 5px;
        height: 0;
        opacity: 0;

        ${({ isError }) => isError && errorCss}
        transition: height 0.2s ease-in-out;
    }

    ${({ small }) => small && smallDropDownCss}
    ${({ isDefaultView }) => isDefaultView && defaultViewsDropDownCss}
    ${({ isGrouped }) => isGrouped && groupedCss}
`;
