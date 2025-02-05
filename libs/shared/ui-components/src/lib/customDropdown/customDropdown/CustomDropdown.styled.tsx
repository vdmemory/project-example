import styled from '@emotion/styled';
import { colors, mediaScreen, fonts } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';

interface StyledCustomDropdownProps {
    isOpen: boolean;
    isDisabled: boolean;
    isParentRef: boolean;
    isAction: boolean;
    width: number;
    itemsListViewType?: 'small';
}

const showListCss = css`
    display: flex;
`;

export const StyledCustomDropdown = styled.div`
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;
    cursor: ${({ isAction }: StyledCustomDropdownProps) =>
        isAction ? 'pointer' : 'default'};

    &-hide {
        background: red;
    }

    .drop-button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 1px;

        .drop-placeholder {
            opacity: 0.2;
        }

        .drop-value,
        .drop-placeholder {
            margin-right: 15px;
            min-width: 30px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .dropdown-icon {
            transform-origin: center;
            min-width: 16px;
            transform: scale(
                1,
                ${({ isOpen }: StyledCustomDropdownProps) =>
                    isOpen ? '-1' : '1'}
            );
            transition: 200ms;
            &-hide {
                opacity: 0;
                &:hover {
                    cursor: default;
                }
            }
        }
        .button-dots {
            height: 58px;
            border-left: 1px solid ${colors.mainBlack};
        }
    }

    .drop-list {
        display: none;

        position: absolute;
        flex-direction: column;
        margin: 0;
        padding: 0;
        right: 0;
        left: auto;
        width: 100%;
        background-color: ${colors.mainWhite};
        top: calc(100% + 1px);
        list-style-type: none;
        z-index: 95;
        max-height: 200px;
        min-width: 280px;
        overflow-y: auto;
        font-size: 24px;
        outline: 1px solid ${colors.mainBlack};

        ${({ isOpen }: StyledCustomDropdownProps) => isOpen && showListCss};

        @media (${mediaScreen.tablet}) {
            font-size: 22px;
        }

        .list-item {
            padding: 0 40px;
            min-height: 50px;
            box-sizing: content-box;
            display: flex;
            align-items: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            .accent-red {
                color: ${colors.solidRed};
            }

            :first-of-type {
                padding-top: 10px;
            }

            :last-of-type {
                padding-bottom: 10px;
            }

            :hover {
                transition: 200ms ease;
                color: ${colors.mainOrange};
            }

            @media (${mediaScreen.tablet}) {
                padding: 0 20px;
            }
        }

        ${({ itemsListViewType }: StyledCustomDropdownProps) =>
            itemsListViewType === 'small' &&
            css`
                top: 70% !important;
                bottom: auto !important;
                right: 10%;
                min-width: auto;
                width: auto;

                .list-item {
                    font-size: 16px;
                    line-height: 120%;
                    min-height: 36px;
                    padding-left: 20px;
                    padding-right: 20px;
                }

                .list-item:first-of-type {
                    padding-top: 12px;
                }

                .list-item:last-of-type {
                    padding-bottom: 12px;
                }
            `}
    }
    .drop-list-wrapper {
        position: absolute;
        top: calc(100% + 1px);
        right: 0;
        min-width: ${({ width }: StyledCustomDropdownProps) => width + 'px'};
        height: calc(100vh - 60px);
        overflow: hidden;
        background: rgba(241, 234, 251, 0.9);

        .drop-list-header {
            top: 0 !important;
            min-width: inherit;
            right: 0;
            opacity: 1;
            bottom: auto !important;

            .list-item {
                font-family: ${fonts.defaultText};
                font-weight: 450;
                font-size: 24px;
                line-height: 120%;
                letter-spacing: 0.015em;
                text-transform: initial;
                padding: 10px 40px;
                &-logout {
                    color: ${colors.mainRed};
                }
            }
        }
    }

    ${({ isDisabled }: StyledCustomDropdownProps) =>
        isDisabled &&
        css`
            opacity: 0.5;
            cursor: not-allowed;
            .dropdown-icon {
                opacity: 0.3 !important;
            }
        `}
`;
