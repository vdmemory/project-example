import styled from '@emotion/styled';
import { colors, fonts } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledPaymentScheduleInfoCard = styled.div`
    display: flex;
    background-color: ${colors.mainPurple};
    border: 1px solid ${colors.mainBlack};

    > * {
        padding: 40px 40px 30px;
    }

    .accent-label {
        font-family: ${fonts.accent};
        font-size: 12px;
        line-height: 16px;
        text-transform: uppercase;
    }

    .accent-color {
        color: ${colors.mainOrange}!important;
    }

    @media screen and (${mediaScreen.tablet}) {
        flex-direction: column;
        > * {
            padding: 25px 20px 15px;
        }
        .accent-label {
            font-size: 10px;
            letter-spacing: 0.05em;
        }
    }
`;
