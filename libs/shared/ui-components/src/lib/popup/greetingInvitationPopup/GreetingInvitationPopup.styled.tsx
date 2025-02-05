import { colors, mediaScreen } from '@breef/shared/assets/variables';
import styled from '@emotion/styled';

export const StyledGreetingInvitationPopup = styled.div`
    width: 990px;

    @media (${mediaScreen.laptop}) {
        width: 100%;
    }

    .header-modal {
        position: relative;
        border-bottom: 1px solid ${colors.mainBlack};
        background-color: ${colors.mainPurple};
        padding: 0 70px 0;
        display: flex;
        justify-content: space-between;
        @media (${mediaScreen.tablet}) {
            padding: 0 15px 0;
        }

        .header-right-container {
            margin-left: 40px;
            position: relative;
            min-width: 288px;
            width: 288px;
            img {
                position: absolute;
                top: -21px;
            }
            @media (${mediaScreen.tablet}) {
                display: none;
            }
        }

        .header-left-container {
            display: flex;
            flex-direction: column;
            padding-top: 45px;
            padding-bottom: 35px;
            .label {
                font-size: 48px;
                text-transform: uppercase;
                letter-spacing: 0.002em;
            }
            .note {
                font-size: 18px;
                line-height: 28.8px;
                margin-top: 8px;
                letter-spacing: 0.02em;
                margin-bottom: 0;
            }
        }
    }

    .content-modal {
        display: flex;

        .tips-wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 1px;
            > * {
                outline: 1px solid black;
                width: calc(50% - 0.5px);
            }
        }
    }

    .footer-modal {
        border-top: 1px solid ${colors.mainBlack};
        button {
            text-transform: uppercase;
        }
    }
`;
