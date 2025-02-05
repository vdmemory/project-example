import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';

export const StyledPaymentScheduleStep = styled.table`
    border: 1px solid ${colors.mainBlack};
    border-collapse: collapse;
    width: 100%;

    tr {
        font-weight: 450;
        font-size: 18px;
        line-height: 160%;
        letter-spacing: 0.002em;
        border-top: 1px solid ${colors.mainBlack};

        td {
            min-height: 70px;
            padding: 5px 25px 5px 40px;

            & + td {
                border-left: 1px solid ${colors.mainBlack};
            }
        }
        td.main-table-row-edit {
            padding: 5px 10px 5px 10px;
            text-align: center;
            &:hover {
                cursor: pointer;
            }
        }
    }

    tr:nth-of-type(odd) {
        background-color: ${colors.mainWhite};
    }

    @media screen and (max-width: 1168px) {
        tr {
            td,
            th {
                padding: 5px 15px 5px 20px;
            }
        }
    }

    @media screen and (max-width: 1024px) {
        display: flex;
        flex-direction: column;
        gap: 10px;
        border: none;

        .mobile-payment-block {
            display: flex;
            flex-direction: column;
            border: 1px solid ${colors.mainBlack};

            .payment-header {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding: 20px;
                font-size: 22px;
                line-height: 120%;
                letter-spacing: 0.015em;
                border-bottom: 1px solid ${colors.mainBlack};
                &-title {
                    display: flex;
                    flex-direction: column;
                }
            }
        }
    }
`;

export const StyledMobileRowItem = styled.div``;
