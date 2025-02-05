import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

export const StyledPaymentScheduleAgency = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background: ${colors.mainPurple};
    padding-top: 40px;
    > * {
        padding: 0 75px;
    }
    .table-payment,
    .retainer-block {
        margin-bottom: 40px;
    }
    .schedule-body {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 20px;
    }

    @media (max-width: 1128px) {
        padding-top: 40px;
        > * {
            padding: 0 35px;
        }
    }

    @media (${mediaScreen.tablet}) {
        padding-top: 24px;
        > * {
            padding: 0 15px;
        }
    }
`;
