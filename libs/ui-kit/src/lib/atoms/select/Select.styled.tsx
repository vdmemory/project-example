import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface StyledSelectProps {
    isOpen: boolean;
    isDisabled?: boolean;
    isSearchable?: boolean;
    isOverflowsPage?: boolean;
}
export const StyledSelect = styled.div`
    display: flex;
    flex-direction: column;

    .drop-arrow {
        min-width: 24px;
        width: 24px;
        pointer-events: none;
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        path {
            stroke-width: 1px;
        }
    }

    input {
        padding-right: 44px;
        ${({ isSearchable }: StyledSelectProps) =>
            !isSearchable &&
            css`
                cursor: pointer;
            `};
    }

    .input-wrapper {
        position: relative;
    }

    .dropdown-list-wrapper {
        z-index: 1;
        top: 52px;
        left: 0;
        right: 0;
        position: absolute;

        ${({ isOverflowsPage }: StyledSelectProps) =>
            isOverflowsPage &&
            css`
                bottom: calc(100% + 4px);
                top: auto;
            `}
    }

    ${({ isOpen }: StyledSelectProps) =>
        isOpen &&
        css`
            .drop-arrow {
                transform: translateY(-50%) rotate(180deg);
            }
        `};
`;
