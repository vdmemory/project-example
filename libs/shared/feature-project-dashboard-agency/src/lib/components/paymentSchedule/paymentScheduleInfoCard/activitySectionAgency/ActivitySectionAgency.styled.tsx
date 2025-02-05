import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';

export const StyledActivitySectionAgency = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.4;

    .footer-activity-section {
        display: flex;
        margin-top: auto;

        .payment-terms {
            margin-right: 25px;
            .payment-terms-val {
                white-space: nowrap;
            }
        }

        .download-link {
            white-space: nowrap;
            color: ${colors.mainOrange};

            display: flex;
            svg {
                height: 15px;
                width: 15px;
                margin-right: 10px;
            }
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        padding: 20px 20px 25px;
    }
`;
