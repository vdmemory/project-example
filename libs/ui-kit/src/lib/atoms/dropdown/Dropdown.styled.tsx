import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface StyledDropdownProps {
    isError?: boolean;
    isSearchable?: boolean;
    isShow?: boolean;
    isOverflowsPage?: boolean;
    disabled?: boolean;
}

export const StyledDropdown = styled.div<StyledDropdownProps>`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;

    ${({ isSearchable }) =>
        !isSearchable &&
        css`
            cursor: pointer;
        `};

    ${({ disabled }) =>
        disabled &&
        css`
            cursor: not-allowed;
        `};

    .input-wrapper {
        position: relative;
        width: 100%;

        input {
            padding-right: 44px;
        }
    }

    .chevron {
        position: absolute;
        top: 50%;
        width: 16px;
        height: auto;
        right: 13px;
        transform: translateY(-50%) scale(1, 1);
        transform-origin: center;
        transition: transform 0.2s ease-in-out;
        z-index: 10;

        ${({ isShow }) =>
            isShow &&
            css`
                transform: translateY(-50%) scale(1, -1);
            `};
    }

    .dropdown-list-wrapper {
        z-index: 1;
        top: 52px;
        left: 0;
        right: 0;
        position: absolute;

        ${({ isOverflowsPage }) =>
            isOverflowsPage &&
            css`
                bottom: calc(100% + 4px) !important;
                top: auto !important;
            `}
    }
`;
