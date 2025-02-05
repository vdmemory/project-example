import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

export const StyledConfirmDeletePopup = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${colors.mainPurple};
    width: 800px;

    .info-wrapper {
        padding: 65px 100px 90px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h2 {
            margin: 0 0 15px;
            font-weight: 450;
            line-height: 53px;
            letter-spacing: 0.002em;
            text-transform: uppercase;
            font-size: 48px;
        }

        span {
            font-size: 24px;
            line-height: 29px;
            letter-spacing: 0.015em;
        }
    }

    .footer-wrapper {
        display: flex;
        gap: 1px;
        background-color: ${colors.mainBlack};
        border-top: 1px solid ${colors.mainBlack};
    }

    @media screen and (${mediaScreen.tablet}) {
        width: auto;
        text-align: center;

        .info-wrapper {
            padding: 20px 20px 30px;

            h2 {
                font-size: 32px;
                line-height: 110%;
                margin-bottom: 10px;
            }
            span {
                font-size: 22px;
                line-height: 120%;
            }
        }

        .footer-wrapper {
            flex-direction: column;
        }
    }
`;
