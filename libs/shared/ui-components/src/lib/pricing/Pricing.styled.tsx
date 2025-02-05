import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledPricing = styled.div`
    padding: 80px 0 144px 75px;
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
            padding-top: 21px;
            margin: 0 0 7px;
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
            margin: 0;
            white-space: pre-wrap;

            > a {
                color: ${colors.mainOrange};
                text-decoration: none;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        padding: 20px 20px 40px;

        > h2 {
            font-size: 32px;
        }

        > div {
            > h3 {
                font-size: 24px;
            }
        }
    }
`;
