import styled from '@emotion/styled';
import { mixinTypography } from '../../styles/mixins/typography.styled';
import { colors } from '../../styles/colors';
import { css } from '@emotion/react';

interface StyledListItemProps {
    isSelected: boolean;
}
export const StyledListItem = styled.li`
    padding: 12px 20px;
    ${mixinTypography.text.tMd.textMdMedium};
    line-height: 24px;
    list-style-type: none;
    cursor: pointer;
    :hover {
        background-color: ${colors.secondary.secondary200};
    }

    ${({ isSelected }: StyledListItemProps) =>
        isSelected &&
        css`
            background-color: ${colors.secondary.secondary500}!important;
        `}
`;
