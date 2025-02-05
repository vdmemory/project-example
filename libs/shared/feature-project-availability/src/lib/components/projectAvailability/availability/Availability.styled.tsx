import { simpleAnimation } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';
import { colors } from '@breef/ui-kit';
import styled from '@emotion/styled';

export const StyledAvailability = styled.div`
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

        @media screen and (max-width: 1280px) {
            max-width: 100%;
        }
    }
    .right-section {
        display: flex;
        width: 100%;
        align-items: flex-start;
        flex-direction: column;
    }
    .placeholder-mobile {
        display: none;
    }

    @media screen and (max-width: 1280px) {
        flex-direction: column;

        &.group-availability .days {
            width: 100%;
        }

        & .calendar {
            width: 100%;
        }

        & .arrow-pick {
            display: none;
        }

        & .placeholder {
            margin: 3% auto 5% auto;
        }
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

        .placeholder-mobile {
            margin: 8% auto;
            display: flex;
        }

        &.group-availability input.dropdown-input {
            padding: 19px 27px 19px 16px;
        }
    }

    ${simpleAnimation}
`;
