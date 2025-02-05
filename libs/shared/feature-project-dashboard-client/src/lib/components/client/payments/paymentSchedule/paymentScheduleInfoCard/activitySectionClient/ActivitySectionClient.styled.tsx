import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledActivitySectionAgency = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.4;
    padding: 0;

    .activity-content-wrapper {
        padding: 40px 40px 0;
        display: flex;
        flex-direction: column;

        .payments-activity {
            margin-top: 20px;
            font-size: 18px;
            line-height: 20px;
            max-width: 390px;
            margin-bottom: 22px;

            span {
                display: inline-flex;
                align-items: center;
            }

            .tooltip {
                display: inline-flex;
                align-items: center;
            }

            svg {
                margin-left: 11px;
                path {
                }
            }
        }
    }

    .footer-activity-section {
        display: flex;
        margin-top: auto;
    }

    button {
        height: 50px !important;
        margin: auto 0 0;
        border-top: 1px solid ${colors.mainBlack};
        .main-content {
            width: auto;
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        .activity-content-wrapper {
            padding: 20px 20px 0;

            .payments-activity {
                margin-bottom: 27px;
            }
        }
    }
`;
