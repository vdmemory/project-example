import styled from '@emotion/styled';
import { mediaScreen } from '@breef/shared/assets/variables';
import { colors, mixinTypography } from '@breef/ui-kit';

export const StyledSignUpTerms = styled.p`
    font-size: 14px;
    font-weight: 450;
    line-height: 16.02px;
    letter-spacing: 0;
    color: rgba(104, 115, 125, 1);
    text-align: center;
    margin: 20px 0 0;

    > a {
        color: rgba(217, 110, 52, 1);
        text-decoration: none;
        white-space: nowrap;
    }

    @media screen and (${mediaScreen.tablet}) {
        margin: 18px 0 0;
    }
`;
