import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';
import { colors } from '@breef/ui-kit';

interface StyledCustomDropdownProps {
    isOpen: boolean;
    isParentRef: boolean;
    isAction: boolean;
    width: number;
    itemsListViewType?: 'small';
}

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
            border-left: 1px solid ${colors.black};
        }
    }

    &.custom-dropdown.menu {
        width: 65px;
        align-items: center;
        justify-content: center;

        &.open {
            display: flex;

            .drop-list-wrapper {
                position: absolute;
                top: calc(100% + 1px);
                right: 0;
                min-width: ${({ width }: StyledCustomDropdownProps) =>
                    width + 'px'};
                height: calc(100vh - 60px);
                overflow: hidden;
                background-color: ${colors.beige};

                .drop-list {
                    top: 0 !important;
                    min-width: inherit;
                    right: 0;
                    display: flex;
                    max-height: 100%;
                    border-bottom: none;
                    z-index: 95;

                    outline: none;

                    .list-item {
                        font-family: 'SuisseIntlMono';
                        font-weight: 450;
                        font-size: 16px;
                        line-height: 24px;
                        letter-spacing: 0.015em;
                        text-transform: initial;
                        padding: 10px 40px;
                        border-bottom: 1px solid ${colors.black};
                        text-transform: uppercase;

                        height: 92px;
                    }
                }
            }
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
        background-color: ${colors.beige};
        top: calc(100% + 1px);
        list-style-type: none;
        z-index: 0;
        max-height: 200px;
        min-width: 280px;
        overflow-y: auto;
        font-size: 24px;
        outline: 1px solid ${colors.black};

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
            justify-content: center;

            .accent-red {
                color: ${colors.error.error500};
            }

            :first-of-type {
                padding-top: 10px;
            }

            :last-of-type {
                padding-bottom: 10px;
            }

            :active {
                background-color: ${colors.secondary.secondary200};
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
`;
