import styled from '@emotion/styled';
import { colors, mediaScreen } from '@breef/shared/assets/variables';

export const StyledPaymentScheduleStep = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    background-color: ${colors.mainPurple};

    .step-main-content-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;

        .payments-sections-wrapper {
            display: flex;
            flex-direction: column;
            gap: 1px;

            .add-milestone-button {
                margin: 45px auto 5px;
                text-transform: uppercase;
            }
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        .step-main-content-wrapper {
            .payments-sections-wrapper {
                .add-milestone-button {
                    margin: 30px auto 0;
                }
            }
        }
    }
`;
