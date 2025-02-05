import { colors } from '@breef/shared/assets';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const StyledSkillsSelect = styled(motion.section)`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${colors.mainBlack};
    padding-bottom: 30px;
`;
