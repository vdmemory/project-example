import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

export const StyledDefaultPopup = styled.form`
    width: 990px;

    @media (${mediaScreen.laptop}) {
        width: 100%;
    }

    .header-popup {
        padding: 49px 69px;
        border-bottom: 1px solid ${colors.mainBlack};
        background-color: ${colors.mainPurple};
        font-size: 48px;
        line-height: 53px;
        text-transform: uppercase;
        letter-spacing: 0.002em;

        .accent-color {
            color: ${colors.mainOrange};
        }

        @media (${mediaScreen.tablet}) {
            padding: 20px 40px 20px 15px;
            font-size: 32px;
            line-height: 30px;
        }
    }

    > label {
        .label-name {
            text-transform: inherit;
        }
    }

    .footer-popup {
        border-top: 1px solid ${colors.mainBlack};

        > button {
            text-transform: inherit;
        }
    }
    button.button-uppercase {
        text-transform: uppercase !important;
    }
`;
