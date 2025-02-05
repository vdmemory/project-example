import styled from '@emotion/styled';
import { colors, fonts } from '@breef/shared/assets';

export const StyledTermsAndConditions = styled.div`
    .terms-checkbox {
        font-size: 12px;
        line-height: 120%;
        letter-spacing: 0.015em;
        align-items: center;
        text-transform: uppercase;
        font-family: ${fonts.accent};

        a {
            color: ${colors.mainOrange}!important;
        }
    }
`;
