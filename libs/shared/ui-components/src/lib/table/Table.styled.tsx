import styled from '@emotion/styled';
import { colors, horizontalScrollbar } from '@breef/shared/assets';
import { css } from '@emotion/react';

interface StyledTableProps {
    isLoading: boolean;
}

const checkIsLoading = ({ isLoading }: StyledTableProps) =>
    isLoading &&
    css`
        * {
            pointer-events: none;
        }
        table {
            opacity: 0.2;
        }
    `;

export const StyledTable = styled.div`
    width: 100%;
    position: relative;
    overflow: hidden;

    .table-wrapper {
        overflow-y: auto;
        padding-bottom: 60px;
        ${horizontalScrollbar};
    }

    .loader {
        position: absolute;
        top: calc(50% - 30px);
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
    }

    table {
        width: 100%;
        border-spacing: 0;
        border-collapse: collapse;
    }

    th,
    td {
        padding: 0 20px 0 30px;
        height: 60px;
        white-space: nowrap;
    }

    tbody,
    thead {
        border: 1px solid ${colors.mainBlack};

        tr:nth-of-type(odd) {
            background-color: ${colors.mainWhite};
        }

        tr {
            border-top: 1px solid ${colors.mainBlack};

            td + td {
                border-left: 1px solid ${colors.mainBlack};
            }
        }
    }

    tfoot {
        th {
            border: 1px solid ${colors.mainBlack};
        }
    }

    .custom-dropdown {
        margin: 0 -20px 0 -30px;
        height: 100%;
        position: relative;

        .drop-button {
            padding: 0;
            display: flex;
            flex: 1;
            width: 68px;

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

    button.small {
        width: 68px;
        padding: 0 15px;
        margin: 0 -20px 0 -30px;
    }

    .button {
        &-link {
            white-space: nowrap;
            font-size: 16px;
            line-height: 25px;
            width: fit-content;
            height: 100%;
            padding: 0 25px;
            margin: 0 -20px 0 -30px;
            :disabled {
                color: ${colors.mainOrange};
                text-decoration: underline;
                opacity: 0.2;
                cursor: not-allowed;
                pointer-events: none;
            }
        }
        &-icon {
            outline: none;
            border: none;
            background-color: transparent;
            cursor: pointer;
            height: 100%;
            width: 64px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 -20px 0 -30px;

            :disabled {
                opacity: 0.2;
                cursor: not-allowed;
            }

            svg {
                min-width: 37px;
            }
        }
    }

    .width-cell-content {
        width: 0.1%;
        white-space: nowrap;
    }

    ${checkIsLoading};
`;

interface StyledTableRowProps {
    isEditableRow: boolean;
    editableRow: number | null;
}

const checkIsEditableRow = ({
    isEditableRow,
    editableRow,
}: StyledTableRowProps) => {
    if (editableRow) {
        if (isEditableRow) {
            return css`
                background-color: ${colors.mainPurple}!important;
            `;
        } else {
            return css`
                pointer-events: none;
                background-color: ${colors.mainWhite};
                > * {
                    opacity: 0.2;
                }
            `;
        }
    }
    return null;
};

export const StyledTableRow = styled.tr`
    ${checkIsEditableRow};
`;

export const StyledGradient = styled.div`
    background: linear-gradient(
        270deg,
        #f9f7f4 38.99%,
        rgba(248, 248, 244, 0) 91.89%
    );
    width: 181px;
    height: calc(100% - 60px);
    position: absolute;
    top: 0;
    pointer-events: none;

    &.gradient {
        &-left {
            left: -75px;
            transform: rotate(180deg);
        }
        &-right {
            right: -75px;
        }
    }
`;
