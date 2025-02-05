import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { motion } from 'framer-motion';

interface StyledFieldErrorProps {
    warning?: boolean;
}

export const StyledFieldError = styled(motion.p)`
    color: ${(props: StyledFieldErrorProps) =>
        props.warning ? colors.mainOrange : colors.mainRed};
    margin: 0;
    font-size: 14px;
    padding: 10px 0 0 0;
    top: 100%;
    min-height: 27px;
    line-height: 1.3;
    a {
        color: ${colors.mainBlack};
        letter-spacing: 0;
    }
`;
