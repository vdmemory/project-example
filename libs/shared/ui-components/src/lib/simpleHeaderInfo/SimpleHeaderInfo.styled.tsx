import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

interface StyledSimpleHeaderInfoProps {
    backgroundImageUrl: string;
}
export const StyledSimpleHeaderInfo = styled.div`
    display: flex;
    min-height: 311px;
    background-color: ${colors.mainPurple};
    background-image: url(${({
        backgroundImageUrl,
    }: StyledSimpleHeaderInfoProps) => backgroundImageUrl});
    background-size: cover;
    background-position: center;
    justify-content: center;
    min-width: 100%;
    outline: 1px solid ${colors.mainBlack};

    .header-info-wrapper {
        max-width: 740px;
        margin-left: 15px;
        margin-right: 15px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 10px;

        > h1 {
            font-size: 72px;
            text-transform: uppercase;
            font-weight: 450;
            line-height: 72px;
            margin: 0;
        }

        > span {
            margin-top: 18px;
            font-size: 24px;
            line-height: 1.2;
            letter-spacing: 0.015em;
            white-space: pre-wrap;
            > a {
                color: ${colors.mainOrange};
            }
        }
    }
    @media (${mediaScreen.tablet}) {
        min-height: auto;
        .header-info-wrapper {
            margin-bottom: 0;
            padding: 45px 0 45px;

            > h1 {
                font-size: 32px;
                line-height: 110%;
                letter-spacing: 0.002em;
            }
            > span {
                font-size: 18px;
            }
        }
    }
`;
