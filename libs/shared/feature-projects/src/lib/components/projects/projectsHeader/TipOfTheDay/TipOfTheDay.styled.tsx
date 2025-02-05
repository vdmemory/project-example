import styled from '@emotion/styled';
import { colors, fonts, mediaScreen } from '@breef/shared/assets/variables';
import { motion } from 'framer-motion';

export const StyledTipOfTheDay = styled(motion.div)`
    display: flex;
    flex: 0.245;
    min-width: 300px;
    background-color: ${colors.mainBlack};
    color: white;
    overflow: hidden;
    position: relative;

    :before {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 0;
        height: 0;
        border-top: 30px solid ${colors.mainWhite};
        border-right: 30px solid ${colors.mainPurple};
    }
    @media (max-width: 1280px) {
        flex: 1;
        min-height: 300px;
    }
    @media (${mediaScreen.tablet}) {
        flex: 0.245;
        min-height: 300px;
        height: 300px;

        :before {
            border-right: 30px solid ${colors.darkPurple};
        }
    }

    .tip-of-the-day-wrapper {
        display: flex;
        flex-direction: column;
        padding: 28px 30px;
        @media (${mediaScreen.tablet}) {
            width: 300px;
        }
        .label-tip-of-the-day {
            font-family: ${fonts.accent};
            text-transform: uppercase;
            opacity: 0.4;
            font-size: 12px;
            line-height: 16px;
            letter-spacing: 0.05em;
            margin-bottom: 28px;
        }
        .text-tip-of-the-day {
            font-size: 18px;
            line-height: 29px;
        }
        .sign-off-tips-of-the-day {
            margin-top: auto;
            font-size: 14px;
            color: #d96e34;
            line-height: 30px;
            display: flex;

            span {
                font-size: 28px;
            }
        }
    }
`;
