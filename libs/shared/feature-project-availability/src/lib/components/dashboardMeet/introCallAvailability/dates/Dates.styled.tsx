import { colors, mixinTypography } from '@breef/ui-kit';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledDates = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid ${colors.grey.grey100};
    border-radius: 4px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
    height: 322px;
    overflow: auto;
`;

interface StyledDateProps {
    isEditable: boolean;
}

const hoverStyles = css`
    cursor: pointer;

    .group .label:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        width: 11px;
        height: 11px;
        background-color: ${colors.primary.primary400};

        @media (max-width: 768px) {
            content: none;
        }
    }

    p {
        color: ${colors.primary.primary400};
    }
`;

export const StyledDate = styled.div<StyledDateProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 20px;
    height: 64px;
    border-bottom: 1px solid ${colors.grey.grey100};
    transition: all 0.3s ease;
    position: relative;

    :last-child {
        border-bottom: none;
    }

    .group {
        display: flex;
        align-items: center;
        gap: 12px;

        .label {
            ${mixinTypography.text.tSmall.textSmallMedium};
            font-size: 14px;
            line-height: 18px;
            color: ${colors.grey.grey900};
            position: relative;
            width: 16px;
            height: 16px;

            @media (max-width: 768px) {
                border: 1px solid ${colors.grey.grey200};
            }

            svg {
                margin-top: -1.5px;
                margin-left: 1px;

                path {
                    stroke-width: 2;
                }
            }
        }

        .date {
            font-weight: 600;
            cursor: pointer;
            font-size: 14px;

            @media (max-width: 768px) {
                font-size: 14px;
                line-height: 18px;
            }
        }
    }

    p {
        ${mixinTypography.text.tSmall.textSmallMedium};
        font-size: 14px;
        line-height: 18px;
        margin: 0;
        color: ${colors.grey.grey600};
        transition: all 0.3s ease;
        word-break: normal;
    }

    :hover {
        cursor: default;
        ${({ isEditable }) => !isEditable && hoverStyles}
    }

    ${({ isEditable }) =>
        isEditable &&
        css`
            height: auto;
            padding: 29px 20px;

            .remove {
                position: absolute;
                top: 1px;
                left: 1px;
                width: 166px;
                height: 99%;
                border-radius: 4px;
                cursor: pointer;
                z-index: 1;

                @media (max-width: 768px) {
                    top: 5px;
                    height: 34%;
                }
            }

            .group {
                position: relative;
            }

            @media (max-width: 768px) {
                flex-direction: column;
                align-items: baseline;
                gap: 20px;
            }

            @media (max-width: 768px) {
                .wrapper-time-slots {
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 12px;

                    .add-slot {
                        margin-right: 20px;

                        :hover {
                            background-color: transparent;
                            color: ${colors.primary.primary400};

                            svg line {
                                stroke: ${colors.primary.primary400};
                            }
                        }
                    }
                }
            }
        `}
`;

export const StyledDatesTimeSlots = styled.div`
    display: flex;
    align-items: center;
    gap: 44px;

    @media (max-width: 1120px) {
        gap: 16px;
    }

    .timeSlots {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
    }

    .add-slot {
        height: 28px;
        border-radius: 2px;
        min-width: auto;
        padding: 0 8px 0 4px;
        color: ${colors.primary.primary400};

        .label {
            gap: 4px;
        }

        svg line {
            stroke: ${colors.primary.primary400};
        }

        &:hover {
            background-color: ${colors.primary.primary300};
            color: ${colors.white};

            svg line {
                stroke: ${colors.white};
            }
        }
    }
`;

export const StyledSlot = styled.div`
    display: flex;
    flex-direction: column;

    .group-slot {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .error.common {
        font-size: 11px;
        line-height: 18px;
        color: ${colors.error.error400};
        margin-top: 4px;
    }

    .dropdown.date {
        .dropdown-input {
            height: 28px;
            color: ${colors.grey.grey900};
            border: 1px solid ${colors.grey.grey100};
            border-radius: 2px;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
            font-size: 14px;
            line-height: 18px;
            width: 102px;
            padding: 0 30px 0 12px;

            &:focus {
                border: 1px solid ${colors.primary.primary500};
            }
        }

        .chevron {
            top: 14px;
            right: 7px;

            path {
                stroke: ${colors.grey.grey900};
            }
        }

        .options {
            top: 36px;
            width: 100%;
            border: 1px solid ${colors.grey.grey100};
            border-radius: 2px;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
            max-height: 244px;
            border-top-color: transparent;

            li.no-options,
            li.item {
                display: flex;
                align-items: center;
                font-size: 16px;
                line-height: 24px;
                padding: 4px 15px 3px;

                &.selected {
                    background-color: transparent;
                    border: 1px solid ${colors.primary.primary500};
                }
            }

            li.no-options {
                font-size: 12px;
                line-height: 16px;
            }
        }
    }

    .trash-button {
        display: flex;
        border: none;
        background-color: transparent;
        padding: 0;
        cursor: pointer;

        svg {
            width: 19px;

            line {
                transition: all 0.3s ease;
                stroke: ${colors.error.error600};
            }
            path {
                transition: all 0.3s ease;
                stroke: ${colors.error.error600};
            }
        }

        &:hover svg {
            line {
                stroke: ${colors.grey.grey200};
            }
            path {
                stroke: ${colors.grey.grey200};
            }
        }
    }
`;
