import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';

interface StyledCustomDropdownProps {
    isOpen: boolean;
    idxLayer: number;
}

const showListCss = css`
    height: auto;
    padding: 30px 40px;
    outline: 1px solid ${colors.mainBlack};

    @media (${mediaScreen.tablet}) {
        padding: 30px 20px;
    }
`;

export const StyledChipDropdown = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding-top: 12px;

    .drop-button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: auto;
        width: 100%;

        .group-button {
            display: flex;
            flex-wrap: wrap;
            width: auto;
            gap: 10px;

            .drop-placeholder {
                opacity: 0.2;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 24px;
                border: none;
                letter-spacing: 0.002em;
                cursor: pointer;

                position: absolute;
                top: 46px;
                z-index: 0;
                @media (${mediaScreen.tablet}) {
                    font-size: 22px;
                }
            }
        }

        .wrap-icon {
            display: flex;
            height: 100%;
            justify-content: flex-end;
            align-items: center;
            flex-grow: 1;
            width: 15%;
            cursor: pointer;

            height: 22px;
            z-index: 1;

            .dropdown-icon {
                margin-left: 20px;
                transform-origin: center;
                min-width: 16px;
                transform: scale(
                    1,
                    ${({ isOpen }: StyledCustomDropdownProps) =>
                        isOpen ? '-1' : '1'}
                );
                transition: 200ms;
            }
        }
    }

    .drop-list {
        display: flex;
        height: 0;
        padding: 0 40px;
        overflow: hidden;
        transition: all 200ms;
        outline: none;

        flex-wrap: wrap;
        margin: 0;
        background-color: ${colors.mainWhite};
        list-style-type: none;
        z-index: ${({ idxLayer }: StyledCustomDropdownProps) => 100 - idxLayer};
        background-color: ${colors.mainPurple};
        gap: 10px;
        width: 100%;

        position: relative;
        top: 18px;

        width: calc(100% + 40px);
        margin-left: -20px;
        margin-right: -20px;

        @media (${mediaScreen.tablet}) {
            padding: 0 20px;
            width: calc(100% + 40px);
            margin-left: -20px;
            margin-right: -20px;
        }

        ${({ isOpen }: StyledCustomDropdownProps) => isOpen && showListCss};
    }
`;
