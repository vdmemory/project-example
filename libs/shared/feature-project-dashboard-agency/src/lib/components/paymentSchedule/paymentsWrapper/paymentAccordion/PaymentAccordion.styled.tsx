import styled from '@emotion/styled';
import { colors, fonts } from '@breef/shared/assets';
import { css } from '@emotion/react';

interface StyledPaymentAccordionProps {
    isOpen: boolean;
    isEditable: boolean;
    editableRow?: number | null;
}
const checkIsEditableRow = ({
    isEditable,
    editableRow,
}: StyledPaymentAccordionProps) => {
    if (editableRow) {
        if (isEditable) {
            return css`
                background-color: ${colors.mainPurple}!important;
            `;
        } else {
            return css`
                pointer-events: none;
                background-color: ${colors.mainWhite};
                > * > * {
                    opacity: 0.2;
                }
            `;
        }
    }
    return null;
};
export const StyledPaymentAccordion = styled.div`
    outline: 1px solid ${colors.mainBlack};
    .accordion {
        &-header {
            padding: 20px 27px 20px 20px;
            outline: 1px solid ${colors.mainBlack};
            display: flex;
            align-items: center;
            overflow: hidden;

            .payment-short-info-wrapper {
                display: flex;
                flex-direction: column;
                font-size: 16px;
                line-height: 160%;
                letter-spacing: 0.002em;
                gap: 1px;
                margin-right: 20px;
                width: 100px;
                span {
                    width: 100%;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
            }
            .chevron-icon-wrapper {
                margin-left: auto;
                padding-left: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                .chevron-icon {
                    min-width: 15px;
                    width: 15px;
                    transition: 200ms ease;
                    transform-origin: center;
                    transform: rotate(180deg);
                    ${({ isOpen }: StyledPaymentAccordionProps) =>
                        isOpen &&
                        css`
                            transform: rotate(0);
                        `}
                }
            }
        }
        &-content {
            overflow: hidden;

            .payment-body-wrapper {
                display: flex;
                padding: 30px 4px 25px 20px;
                flex: 1;

                .rows-content-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    flex: 0.8;
                }

                .actions-button-wrapper {
                    display: flex;
                    flex: 0.2;
                    height: fit-content;
                    margin-top: -25px;
                    min-width: 60px;
                    justify-content: flex-end;

                    .custom-dropdown {
                        height: 60px;
                        padding: 0 18px;
                        position: relative;

                        .drop-button {
                            padding: 0;
                            display: flex;
                            flex: 1;

                            .button-dots {
                                margin: 0 auto;
                                max-width: 24px;
                                min-width: 24px;
                                box-sizing: content-box;
                                padding: 0;
                                height: auto;
                                display: flex;
                                flex: 1;
                                border-left: none;
                            }
                        }
                    }
                }
            }

            .link-button {
                font-family: ${fonts.accent};
                text-transform: uppercase;
                font-size: 10px;
                line-height: 16px;
                letter-spacing: 0.05em;
                margin-top: 5px;
                width: fit-content;
            }

            button.small {
                border-top: 1px solid ${colors.mainBlack};
                font-size: 20px;
            }
        }
    }
    ${checkIsEditableRow};

    .access-denied-wrapper.link-button-wrapper {
        width: max-content;
    }
`;

export const StyledRowPaymentData = styled.div`
    display: flex;
    flex: 1;

    .row-title {
        flex: 0.6;
        display: inline-flex;
        align-items: center;
        white-space: nowrap;
        > span {
            font-family: ${fonts.accent};
            text-transform: uppercase;
            font-size: 10px;
            line-height: 16px;
            letter-spacing: 0.05em;
        }
        .tooltip {
            margin-left: 8px;
            margin-top: 1px;

            svg {
                width: 12px;
                height: auto;
            }
        }
        .Tooltip {
            display: inline;
        }
    }
    .row-value {
        flex: 0.4;
        font-size: 12px;
        letter-spacing: 0.002em;
        line-height: 160%;
    }
`;
