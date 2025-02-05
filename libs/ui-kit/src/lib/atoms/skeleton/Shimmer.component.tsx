import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const StyledShimmer = styled(motion.div)<{ background?: string }>`
    position: absolute;
    background: rgba(255, 255, 255, 0.3);
    top: 0;
    left: 0;
    width: 30%;
    height: 100%;

    ${({ background }) => background && `background: ${background};`}
`;

export const Shimmer = ({ background }: { background?: string }) => {
    return (
        <StyledShimmer
            data-testid="shimmer"
            background={background}
            initial={{ x: -600 }}
            animate={{ x: 1300 }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1,
            }}
            className="shimmer"
        />
    );
};
