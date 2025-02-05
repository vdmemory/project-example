import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors, mixinTypography } from '../../styles';

interface StyledSearchProps {
    isOverflowsPage?: boolean;
}
export const StyledSearch = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: relative;

    .dropdown-list-wrapper {
        z-index: 1;
        top: 52px;
        left: 0;
        right: 0;
        position: absolute;

        ${({ isOverflowsPage }: StyledSearchProps) =>
            isOverflowsPage &&
            css`
                bottom: calc(100% + 4px) !important;
                top: auto !important;
            `}
    }

    .add-item-button {
        border: none;
        outline: none;
        padding: 12px 20px;
        ${mixinTypography.text.tMd.textMdMedium};
        line-height: 24px;
        list-style-type: none;
        cursor: pointer;
        width: 100%;
        background-color: ${colors.white};
        text-align: left;

        :hover {
            background-color: ${colors.secondary.secondary200};
        }
    }
`;
