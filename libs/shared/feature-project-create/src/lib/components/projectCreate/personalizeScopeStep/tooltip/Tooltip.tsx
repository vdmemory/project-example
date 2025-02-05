import styled from '@emotion/styled';
import { FC } from 'react';
import { motion } from 'framer-motion';
import { colors } from '@breef/ui-kit';
import { ANIMATION_DURATION } from '../../../../utils/constants';

interface TooltipProps {
    text: string;
}
export const Tooltip: FC<TooltipProps> = ({ text }) => {
    return (
        <StyledTooltip
            exit={{ opacity: 0 }}
            transition={{ duration: ANIMATION_DURATION }}
        >
            {text}
        </StyledTooltip>
    );
};

const StyledTooltip = styled(motion.div)`
    position: absolute;
    padding: 12px;
    right: -30px;
    bottom: calc(100% + 4px);
    color: ${colors.white};
    background-color: #2f3941;
    font-size: 14px;
    font-weight: 450;
    line-height: 16px;
    letter-spacing: 0;
    width: 158px;

    :after {
        position: absolute;
        content: '';
        top: calc(100% - 4px);
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        width: 8px;
        height: 8px;
        background-color: #2f3941;
    }
`;
