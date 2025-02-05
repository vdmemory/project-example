import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledChipSelect = styled(motion.section)`
    display: flex;

    .chips-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        flex: 1;
    }

    @media screen and (${mediaScreen.tablet}) {
        overflow-x: auto;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
        }

        .chips-wrapper {
            min-width: 748px;
            padding: 0 10px;
        }
    }
`;
