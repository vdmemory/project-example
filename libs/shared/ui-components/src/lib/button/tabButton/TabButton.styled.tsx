import styled from '@emotion/styled';
import { colors, fonts, mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';

interface StyledTabButtonProps {
    isActive: boolean;
    disabled: boolean;
}

const checkIsNotActive = ({ isActive }: StyledTabButtonProps) =>
    !isActive &&
    css`
        height: 64px;
        padding: 0 45px;
        margin-bottom: 9px;
        background-color: ${colors.mainPurple};
        color: ${colors.mainGray};
        .icon-wrapper {
            margin-left: 0;
            width: 0;
        }
        @media (${mediaScreen.tablet}) {
            height: 51px;
        }
    `;

export const StyledTabButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 200ms ease;
    font-family: ${fonts.accent}, sans-serif;
    background-color: ${colors.mainWhite};
    text-transform: uppercase;
    font-size: 12px;
    height: 73px;
    padding: 0 30px;
    z-index: 1;
    border: 1px solid ${colors.mainBlack};
    color: ${colors.mainBlack};
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
    @media (${mediaScreen.tablet}) {
        padding: 0 36px;
        height: 60px;
    }
    .icon-wrapper {
        display: flex;
        margin-left: 5px;
        height: 25px;
        width: 25px;
        transition: all 200ms ease;
    }
    .arrow {
        stroke: ${colors.mainBlack};
        height: 100%;
        width: 100%;
        path {
            stroke-width: 3;
        }
        @media (${mediaScreen.tablet}) {
            display: none;
        }
    }
    .arrow-bottom {
        transform: rotate(90deg);
    }
    ${checkIsNotActive}
`;
