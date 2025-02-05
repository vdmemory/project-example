import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';
import { motion } from 'framer-motion';

interface StyledActionTipProps {
    top?: number;
    right?: number;
    bottom?: number;
}
export const StyledActionTip = styled(motion.div)`
    border: 1px solid ${colors.mainBlack};
    display: flex;
    flex-direction: column;
    flex: 0.51;
    background-color: ${colors.mainPurple};

    @media (max-width: 1280px) {
        min-width: 100%;
        height: 300px;
    }

    @media (${mediaScreen.tablet}) {
        min-width: 330px;
        width: 330px;
        max-height: 300px;
        flex: 0.51;
    }

    .content-action-tip-wrapper {
        display: flex;
        padding: 22px 28px;
        flex: 1;
        position: relative;
        h2 {
            font-weight: normal;
            text-transform: uppercase;
            line-height: 53px;
            font-size: 48px;
            margin: 0;
            width: 60%;
            @media (${mediaScreen.tablet}) {
                line-height: 110%;
                letter-spacing: 0.002em;
                font-size: 32px;
            }
        }
        img {
            position: absolute;
            top: ${({ top }: StyledActionTipProps) =>
                top !== undefined ? top + 'px' : 'auto'};
            bottom: ${({ bottom }: StyledActionTipProps) =>
                bottom !== undefined ? bottom + 'px' : 'auto'};
            right: ${({ right }: StyledActionTipProps) =>
                right !== undefined ? right + 'px' : 'auto'};
            @media (${mediaScreen.tablet}) {
                width: calc(60% - 30px);
            }
        }
    }

    .footer-action-tip-wrapper {
        border-top: 1px solid ${colors.mainBlack};
        button {
            text-transform: uppercase;
        }
        @media (${mediaScreen.tablet}) {
            min-height: 78px;
            height: 78px;

            > button {
                height: 100%;
            }
        }
    }
`;
