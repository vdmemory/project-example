import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';

export const StyledActionQuestion = styled.div`
    margin: -4.5px 0;

    span {
        margin-right: 12px;
        ${mixinTypography.text.tMd.textMdMedium};
    }

    a {
        color: ${colors.primary.primary500};
        -webkit-text-stroke-color: ${colors.primary.primary500};
        -webkit-text-stroke-width: 0.3px;
        text-decoration: underline;
        text-underline-offset: 2.8px;
        cursor: pointer;

        :hover {
            color: ${colors.primary.primary300};
            -webkit-text-stroke-color: ${colors.primary.primary300};
        }
    }
`;
