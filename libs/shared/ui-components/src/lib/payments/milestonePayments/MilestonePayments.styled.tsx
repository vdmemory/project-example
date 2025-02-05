import styled from '@emotion/styled';
import { colors, fonts } from '@breef/shared/assets/variables';

export const StyledMilestonePayments = styled.div`
    display: flex;
    flex-direction: column;

    .payment-buttons-wrapper {
        display: flex;
        margin-left: 10px;
    }
    .action-button {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        border: none;
        outline: none;
        padding: 0;
        cursor: pointer;
        > svg {
            width: 25px;
            height: 25px;

            path:first-of-type {
                fill: ${colors.mainOrange};
            }
            path:last-of-type {
                stroke: ${colors.mainOrange};
            }
        }
        :disabled {
            cursor: auto;
            > svg {
                path:first-of-type {
                    fill: ${colors.strokeGray};
                }
                path:last-of-type {
                    stroke: ${colors.strokeGray};
                }
            }
        }
    }

    .button-up {
        > svg {
            transform: rotate(180deg);
        }
    }

    .button-down {
    }

    .delete-button {
        margin-left: 20px;
        font-size: 12px;
        font-family: ${fonts.accent};
        letter-spacing: 0.015em;
        text-transform: uppercase;
        line-height: 120%;
    }

    .basket-button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        outline: none;
        background-color: transparent;
        border: none;
        :disabled {
            cursor: auto;
            > svg {
                path,
                line {
                    stroke: ${colors.strokeGray};
                }
            }
        }
    }
`;
