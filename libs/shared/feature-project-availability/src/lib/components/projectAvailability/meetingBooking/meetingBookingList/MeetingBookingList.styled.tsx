import { simpleAnimation } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';
import { colors } from '@breef/ui-kit';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const StyledMeetingBookingList = styled(motion.div)`
    display: flex;
    flex-direction: column;
    width: 100%;

    .booking-slot {
        display: flex;
        height: 100px;
        border: none;
        background-color: ${colors.white};
        padding-left: 75px;
        align-items: center;
        cursor: pointer;
        justify-content: start;
        border-bottom: 1px solid ${colors.black};

        @media (${mediaScreen.maxMobile}) {
            padding-left: 16px;
        }

        &:hover {
            background-color: ${colors.secondary.secondary100};
        }

        & .time-from-to {
            font-size: 24px;
            line-height: 29px;
            color: ${colors.grey.grey900};

            @media (${mediaScreen.maxMobile}) {
                font-size: 22px;
                line-height: 27px;
                color: ${colors.grey.grey900};
            }
        }

        & .check-icon {
            width: 0;
            opacity: 0;
            transition: all 0.3s ease;
        }

        &.selected {
            background-color: ${colors.secondary.secondary500};

            & .time-from-to {
                color: ${colors.primary.primary500};
            }

            .check-icon {
                width: 37px;
                opacity: 1;
                margin-right: 10px;
            }
        }

        ${simpleAnimation}
    }
`;
