import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';

export const LinkItemStyled = styled.a`
    display: flex;
    width: fit-content;
    max-width: 100%;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    cursor: pointer;
    color: ${colors.primary.primary600};

    :hover {
        text-decoration: underline;
        color: ${colors.primary.primary300};
    }

    > svg {
        min-width: 16px;
        width: 16px;
    }

    > span {
        ${mixinTypography.text.tSmall.textSmallMedium};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: -4px 0;
    }
`;
