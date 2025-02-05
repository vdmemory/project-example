import styled from '@emotion/styled';
import { colors, fonts, mediaScreen } from '@breef/shared/assets/variables';
import { card_bg_9 } from '@breef/shared/assets';

export const StyledReviewStep = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    background-color: ${colors.mainPurple};

    .header-step {
        line-height: 72px;
        font-size: 72px;
        font-weight: 450;
        white-space: pre-wrap;
        text-transform: uppercase;
        width: 100%;
        padding: 35px 75px 30px;
        outline: 1px solid ${colors.mainBlack};
        background-color: ${colors.darkPurple};
        background-image: url(${card_bg_9.src});
        background-position: center;
        background-size: cover;
    }

    .step-main-content-wrapper {
        display: flex;
        flex-direction: column;
        margin-bottom: 120px;
        width: 100%;
        padding: 0 75px;
    }

    .form-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 40px;
        > * {
            font-size: 12px;
            line-height: 120%;
            letter-spacing: 0.015em;
            font-family: ${fonts.accent};
            text-transform: uppercase;

            a {
                color: ${colors.mainOrange}!important;
            }
        }
    }

    .field-checkbox {
        align-items: center;

        span {
            font-size: 12px;
            line-height: 120%;
            letter-spacing: 0.015em;
            text-transform: uppercase;
            font-family: ${fonts.accent};
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        .header-step {
            padding: 30px 15px;
            font-size: 48px;
            line-height: 110%;
            letter-spacing: 0.002em;
        }
        .step-main-content-wrapper {
            padding: 0 15px;
            margin-bottom: 60px;
        }

        .form-wrapper {
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: 20px;
        }
    }
`;
