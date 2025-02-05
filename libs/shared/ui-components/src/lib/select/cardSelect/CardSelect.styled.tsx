import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const StyledLoading = styled.span`
    position: relative;
    display: flex;
    flex: 1;

    .spinner {
        right: 50%;
        top: 46%;
        transform: translate(50% -50%);
    }
`;

export const StyledCardSelect = styled(motion.section)`
    display: flex;
    flex-wrap: wrap;
    gap: 1px;
    flex: 1;
`;
