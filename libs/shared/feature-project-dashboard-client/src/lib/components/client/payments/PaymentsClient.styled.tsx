import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

export const StyledPaymentsClient = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background: ${colors.mainPurple};
    padding-top: 40px;

    .answers {
        padding: 0 75px;
        margin: 0 -20px -40px;
    }

    .schedule-body {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
        max-width: 1130px;
        margin: 0 auto 20px;
    }

    .tab {
        > nav {
            border-top: unset;
            border-bottom: unset;
            margin-bottom: 41px;
            padding: 0;
            > ul {
                > li {
                    font-weight: 450;
                    font-size: 48px;
                    line-height: 110%;
                    letter-spacing: 0.002em;
                    text-transform: uppercase;
                    color: ${colors.strokeGray};
                    &.selected {
                        color: ${colors.mainBlack};
                        opacity: 1;
                    }

                    .underline {
                        display: none;
                    }
                }
            }
        }
    }

    @media (max-width: 1128px) {
        padding-top: 40px;
    }
    @media (${mediaScreen.tablet}) {
        padding-top: 24px;

        .answers {
            padding: 0 16px;
        }

        .terms-and-contracts-mobile {
            margin-top: 15px;
            margin-bottom: -5px;
        }
    }
`;

export const StyledLoaderWrapper = styled.div`
    top: 50%;
    left: 50%;
    display: flex;
    transform: translate(-50%, -50%);
    width: 130px;
    height: 100px;
    position: absolute;

    .loader-container {
        height: 100%;
    }
`;
