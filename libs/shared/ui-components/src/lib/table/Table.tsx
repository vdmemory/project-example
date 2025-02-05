import React, { FC, ReactNode, useRef } from 'react';
import { StyledGradient, StyledTable, StyledTableRow } from './Table.styled';
import TableHeaderCell from './tableHeaderCell/TableHeaderCell';
import { useScrollTableState } from './useScrollTableState';

export type TableColumnType = {
    header: string;
    accessor: string;
    tooltip?: string;
};
export type TableColumnsConfigType = TableColumnType[];

interface TableProps {
    columns: TableColumnsConfigType;
    rows: { id: number | string; [key: string]: ReactNode }[];
    footerRow?: { [key: string]: string };
    editableRow?: number | null;
    isLoading?: boolean;
}

export const Table: FC<TableProps> = ({
    columns,
    rows,
    footerRow,
    editableRow = null,
    isLoading = false,
}) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const { isScrollbar, isLeftGradient, isRightGradient } =
        useScrollTableState(wrapperRef);

    return (
        <StyledTable isLoading={isLoading}>
            <div className="table-wrapper" ref={wrapperRef}>
                {isScrollbar && isLeftGradient && (
                    <StyledGradient className="gradient-left" />
                )}
                {isLoading && <span className="loader">Loading...</span>}
                <table>
                    <thead>
                        <tr>
                            {columns.map((column, idx) => (
                                <TableHeaderCell
                                    key={idx}
                                    label={column.header}
                                    tooltipText={column.tooltip}
                                    tooltipPosition="top"
                                />
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, idx) => (
                            <StyledTableRow
                                key={idx}
                                id={`table-row-${row.id}`}
                                isEditableRow={row.id === editableRow}
                                editableRow={editableRow}
                            >
                                {columns.map((column, idx) => (
                                    <td
                                        key={idx}
                                        className={
                                            !column.header
                                                ? 'width-cell-content'
                                                : ''
                                        }
                                    >
                                        {row[column.accessor]}
                                    </td>
                                ))}
                            </StyledTableRow>
                        ))}
                    </tbody>
                    {footerRow && (
                        <tfoot>
                            <tr>
                                {columns.map((column, idx) =>
                                    footerRow[column.accessor] ? (
                                        <TableHeaderCell
                                            key={idx}
                                            label={footerRow[column.accessor]}
                                        />
                                    ) : (
                                        <td key={idx} />
                                    ),
                                )}
                            </tr>
                        </tfoot>
                    )}
                </table>
                {isScrollbar && isRightGradient && (
                    <StyledGradient className="gradient-right" />
                )}
            </div>
        </StyledTable>
    );
};
