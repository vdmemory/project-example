import styled from '@emotion/styled';
import { colors, mediaScreen, fonts } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';

interface StyledPaymentScheduleHeaderProps {
    isKickoffView: boolean;
}

export const StyledPaymentScheduleHeader = styled.div`
    display: flex;
    justify-content: space-between;
    button.small {
        padding: 0 60px;
    }
    .header {
        flex: 1;
        &-title {
            font-weight: 450;
            font-size: 36px;
            line-height: 110%;
            letter-spacing: 0.002em;
            color: ${colors.mainBlack};
            text-transform: capitalize;
            margin: 0;
        }

        &-buttons {
            display: flex;
            align-items: center;
            @media (${mediaScreen.tablet}) {
                flex-direction: column;
            }
        }

        &-btn {
            display: flex;
            align-items: center;

            > button {
                font-style: normal;
                font-weight: 450;
                font-size: 24px;
                line-height: 120%;
                letter-spacing: 0.015em;
            }

            &-edit {
                margin-left: 37px;
            }
        }
    }
    @media (${mediaScreen.tablet}) {
        ${({ isKickoffView }: StyledPaymentScheduleHeaderProps) =>
            isKickoffView
                ? css`
                      flex-direction: column;
                      align-items: baseline;
                      .header-title {
                          margin-bottom: 13px;
                      }
                  `
                : css`
                      align-items: center;
                      min-height: 35px;
                      margin-bottom: 5px;
                      .header-title {
                          margin-bottom: 0;
                      }
                  `}

        .header {
            &-title {
                font-size: 24px;
                line-height: 22px;
                letter-spacing: 0.015em;
            }
            &-btn {
                &-edit {
                    margin-left: 0;
                    margin-top: 15px;
                }
            }
            &-buttons {
                button.small {
                    height: 36px;
                    padding: 0 25px;
                }
            }
        }
    }
`;
