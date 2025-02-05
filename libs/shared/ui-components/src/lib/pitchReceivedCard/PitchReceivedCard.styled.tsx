import styled from '@emotion/styled';
import { colors, mediaScreen, fonts } from '@breef/shared/assets/variables';
import { motion } from 'framer-motion';

export interface StyleCard {
    rowCount: number;
}

export interface StyleCardPitch {
    isPadding: boolean;
}

export const StyledPitchCards = styled.div`
    background: ${colors.mainPurple};
    flex: 1;
    padding: ${({ isPadding }: StyleCardPitch) =>
        isPadding ? '0 75px 65px' : '0'};
    .pitchReceived {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        background: ${colors.mainBlack};
        gap: 1px 0;
        border: 1px solid ${colors.mainBlack};

        @media (${mediaScreen.tablet}) {
            flex-direction: column;
        }
    }
    .share {
        display: flex;
        .button-share {
            font-family: ${fonts.accent};
            font-weight: 400;
            font-size: 12px;
            line-height: 120%;
            letter-spacing: 0.015em;
            text-decoration-line: underline;
            text-transform: uppercase;
        }
        > svg {
            width: 34px;
            height: 34px;
        }

        &-footer {
            margin: 46px auto 0;
            justify-content: center;
        }
    }

    .average-budget {
        font-style: normal;
        font-weight: 450;
        font-size: 24px;
        line-height: 120%;
        display: flex;
        align-items: center;
        text-align: right;
        letter-spacing: 0.015em;
    }

    @media (${mediaScreen.tablet}) {
        padding: ${({ isPadding }: StyleCardPitch) =>
            isPadding ? '0 15px 30px' : '0'};
    }
`;

export const StyledPitchReceivedCard = styled.div`
    position: relative;
    width: ${({ rowCount }: StyleCard) =>
        ` calc(100% / ${rowCount || 3} - 0.5px)`};
    display: flex;
    align-items: flex-start;
    justify-content: start;
    padding: 49px 40px;
    background: ${colors.mainPurple};
    &:hover {
        cursor: default;
    }
    .card {
        &-img {
            min-width: 50px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 20px;
            > img {
                width: inherit;
                height: inherit;
            }
        }
        &-item {
            max-width: 280px;
            overflow: hidden;
            &--title {
                font-style: normal;
                font-weight: 450;
                font-size: 32px;
                line-height: 110%;
                letter-spacing: 0.002em;
                text-transform: uppercase;
                margin: 0;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            &--location {
                font-style: normal;
                font-weight: 450;
                font-size: 18px;
                line-height: 160%;
                letter-spacing: 0.002em;
                margin: 0;
            }
            &--empty {
                position: absolute;
                top: -3px;
                left: 0;
                width: 100%;
                display: flex;
                justify-content: center;
            }
        }
    }
    @media (${mediaScreen.tablet}) {
        width: 100%;
        padding: 25px 10px;
        min-height: 100px;
        .card {
            &-item {
                max-width: 280px;
                &--title {
                    font-size: 24px;
                    line-height: 22px;
                    letter-spacing: 0.015em;
                }
            }
        }
    }
`;

export const StyledCardView = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 100%;
    height: 100%;
    background: ${colors.mainPink};
    padding: 40px 43px;

    @media (${mediaScreen.maxMobile}) {
        flex-direction: row;
        justify-content: flex-start;
        gap: 10px;
    }

    &:hover {
        cursor: pointer;
    }
    .card-view {
        &-title {
            font-style: normal;
            font-weight: 450;
            font-size: 32px;
            line-height: 110%;
            letter-spacing: 0.002em;
            text-transform: uppercase;
            color: ${colors.mainOrange};
        }
    }
    > svg {
        min-width: 37px;
        min-height: 37px;
        > path {
            stroke: ${colors.mainOrange};
        }
    }
`;
