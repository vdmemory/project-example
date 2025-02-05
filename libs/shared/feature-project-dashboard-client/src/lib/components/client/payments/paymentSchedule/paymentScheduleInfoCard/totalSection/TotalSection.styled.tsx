import styled from '@emotion/styled';
import { card_bg_2, colors, fonts } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledTotalSection = styled.div`
    display: flex;
    flex-direction: column;
    background-image: url(${card_bg_2.src});
    flex: 0.6;
    background-size: cover;
    background-position: center;
    border-right: 1px solid ${colors.mainBlack};

    .total-values-wrapper {
        display: flex;
        align-items: flex-end;
        margin-bottom: 20px;
        .total-col {
            display: flex;
            flex-direction: column;
        }
        .total-col-value {
            margin-top: 18px;
            font-size: 40px;
            line-height: 44px;
            font-family: ${fonts.default};
            color: ${colors.strokeGray};
        }
    }

    .team-take-wrapper {
        margin-top: auto;
        padding-top: 7px;
    }

    @media screen and (${mediaScreen.tablet}) {
        border-right: none;
        border-bottom: 1px solid ${colors.mainBlack};

        .total-values-wrapper {
            margin-bottom: 13px;
            overflow: hidden;
            .accent-label {
                white-space: pre-wrap;
                word-break: break-word;
            }
            .total-col-value {
                font-size: 32px;
                line-height: 110%;
                margin-top: 10px;
                white-space: pre-wrap;
                word-break: break-word;
            }
        }
        .team-take-wrapper {
            padding-top: 3px;
        }
    }
`;
