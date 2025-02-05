import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';
import { motion } from 'framer-motion';

export const StyledStepWrapper = styled(motion.div)`
    display: flex;
    flex: 1;
    min-width: 525px;

    textarea {
        height: 125px;
    }

    .content-wrapper {
        display: flex;
        flex-direction: column;
        flex: 1;

        > h2 {
            margin: 0 0 24px;
            font-size: 56px;
            font-weight: 450;
            line-height: 64px;
            letter-spacing: 0;
            text-align: left;
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        min-width: auto;
        .content-wrapper {
            padding: 24px 16px 0;
            margin: 0;

            > h2 {
                ${mixinTypography.display.dSm.displaySmMedium};
                margin-bottom: 33px;
            }

            .divider {
                display: none;
            }
        }
    }
`;
