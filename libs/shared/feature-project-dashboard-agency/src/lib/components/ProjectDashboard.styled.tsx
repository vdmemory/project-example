import styled from '@emotion/styled';
import { colors } from '@breef/ui-kit';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledDashboard = styled.section`
    display: flex;
    flex-direction: column;
    flex: 1;
    animation: fadeIn 1s;
    background-color: ${colors.beige};

    .review-project {
        padding: 30px 45px 100px;

        .review-scope {
            width: 100%;
            margin: 0 auto;
        }

        .button-share {
            margin-left: auto;
            margin-bottom: 20px;
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        .review-project {
            padding: 20px 0 0;

            .button-share {
                margin: 0 16px 20px auto;
            }
        }
    }
`;

export const StyledDashboardContent = styled.div`
    animation: fadeIn 1s;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    padding-top: 70px;
    padding-bottom: 70px;
    .accordion + .accordion {
        margin-top: 25px;
    }
`;
