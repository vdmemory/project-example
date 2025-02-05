import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';

export const StyledTermsOfUseStandard = styled.div`
    padding: 144px 0 100px 75px;
    background: ${colors.mainPurple};
    > h2 {
        font-weight: 450;
        font-size: 48px;
        line-height: 110%;
        letter-spacing: 0.002em;
        text-transform: uppercase;
        margin: 0 0 25px;
    }

    > div {
        max-width: 820px;
        > h3 {
            font-weight: 450;
            font-size: 32px;
            line-height: 110%;
            letter-spacing: 0.002em;
            text-transform: uppercase;
            padding-top: 16px;
            margin: 0 0 21px;
        }
        > h4 {
            font-weight: 450;
            font-size: 24px;
            line-height: 120%;
            letter-spacing: 0.015em;
            margin: 0 0 21px;
        }
        > p {
            font-weight: 450;
            font-size: 18px;
            line-height: 160%;
            letter-spacing: 0.002em;
            margin: 0 0 22px;

            > a {
                color: ${colors.mainOrange};
                text-decoration: none;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
        > ol {
            font-weight: 450;
            font-size: 18px;
            line-height: 160%;
            letter-spacing: 0.002em;
            padding-left: 26px;
        }
    }
`;
