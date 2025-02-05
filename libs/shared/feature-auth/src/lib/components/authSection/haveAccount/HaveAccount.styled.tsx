import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledAlreadyHaveAccount = styled.div`
    text-align: center;
    font-size: 14px;
    font-weight: 450;
    line-height: 16.02px;
    letter-spacing: 0;
    color: ${colors.grey.grey800};

    a {
        color: ${colors.primary.primary500};
        text-decoration: none;
    }
`;
