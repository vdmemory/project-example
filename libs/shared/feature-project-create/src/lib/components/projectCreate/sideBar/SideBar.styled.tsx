import { colors, mixinTypography } from '@breef/ui-kit';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { fonts } from '@breef/shared/assets';
import { motion } from 'framer-motion';
import { AnimationOpacity } from '@breef/shared/ui-components';

export const StyledSideBar = styled(AnimationOpacity)`
    display: flex;
    align-items: baseline;
    justify-content: start;
    flex-direction: column;
    width: 300px;
    padding: 34px 48px 34px 19px;
    border-left: 1px solid ${colors.grey.grey100};
    background-color: ${colors.beige};

    .card-tip {
        border: 0.001em solid rgba(47, 47, 47, 0.3);
        box-shadow: 0px 4px 10px 0px #0000001a;
        padding: 16.3px;
        background-color: ${colors.white};
        border-radius: 3.26px;

        h3 {
            display: block;
            font-family: ${fonts.accent};
            font-size: 10px;
            font-weight: 400;
            line-height: 13px;
            letter-spacing: -0.02em;
            margin: -3px 0;
            text-transform: uppercase;
            color: ${colors.grey.grey500};
        }

        p {
            display: inline-block;
            font-size: 11px;
            font-weight: 450;
            line-height: 15px;
            letter-spacing: 0.025em;
            margin: -3px 0;
            padding: 16px 0 30px;
        }
    }

    .lead-info-wrapper {
        display: flex;
        gap: 20px;

        img {
            width: 65px;
            height: 65px;
            object-fit: cover;
            border-radius: 50%;
        }

        .lead-info {
            display: flex;
            flex-direction: column;
            gap: 6.5px;
            justify-content: center;

            .lead-name {
                font-family: ${fonts.biroScriptPlus};
                font-size: 18px;
                font-weight: 400;
                line-height: 18px;
                letter-spacing: 0;
            }

            .lead-position {
                font-size: 10px;
                font-weight: 450;
                line-height: 7px;
                letter-spacing: 0.01em;
                text-align: left;
                color: ${colors.grey.grey500};
            }
        }
    }
`;

interface StyledTipContentProps {
    isActive: boolean;
}
export const StyledTipContent = styled(motion.div)<StyledTipContentProps>``;
