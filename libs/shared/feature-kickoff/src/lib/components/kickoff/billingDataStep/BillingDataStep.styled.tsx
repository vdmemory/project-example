import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

export const StyledBillingDataStep = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    background-color: ${colors.mainPurple};

    .step-main-content-wrapper {
        display: flex;
        flex-direction: column;
        margin-bottom: 120px;
    }

    @media screen and (${mediaScreen.tablet}) {
        .step-main-content-wrapper {
            margin-bottom: 105px;
            padding: 0 15px;
        }
    }
`;
