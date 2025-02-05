import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import Link from 'next/link';

export const StyledLinkMore = styled(Link)`
    display: flex;
    align-items: center;
    ${mixinTypography.text.tLg.textLgMedium};
    color: ${colors.primary.primary500};
    gap: 4px;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    width: fit-content;

    :hover {
        border-bottom: 1px solid ${colors.primary.primary500};
    }
`;
