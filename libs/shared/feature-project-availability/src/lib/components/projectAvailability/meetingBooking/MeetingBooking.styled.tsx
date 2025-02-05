import { simpleAnimation } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';
import { colors } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const StyledMeetingBooking = styled.div`
    display: flex;
    flex: 1;

    .timezone-dropdown-wrapper .dropdown {
        padding: 0 55px;
    }

    .left-section {
        display: flex;
        border-right: 1px solid ${colors.black};
        align-items: flex-start;
        flex-direction: column;
        max-width: 452px;

        .screen-tip {
            max-width: 100%;
            padding: 48px 0 5px 75px;
        }

        .spinner-loader {
            flex: none;
            margin: 0 auto;
            width: 451px;
            height: 287px;
            border-bottom: 1px solid ${colors.black};
        }
    }

    .right-section {
        display: flex;
        width: 100%;
        align-items: flex-start;
        flex-direction: column;
    }

    @media (${mediaScreen.maxMobile}) {
        flex-direction: column;
        align-items: center;

        & .title-section {
            display: none;
        }

        & .timezone-dropdown-wrapper .dropdown {
            padding: 0 16px 0 0;
        }

        &.group-availability .days {
            width: 100%;
        }

        & .calendar {
            width: 100%;
        }

        &.group-availability .screen-tip.tip-card {
            padding: 25px 16px;
            width: 100%;
            max-width: unset;

            .title-card {
                margin-bottom: 10px;
            }
            .description {
                margin-bottom: 5px;
            }
        }
    }

    ${simpleAnimation}
`;
