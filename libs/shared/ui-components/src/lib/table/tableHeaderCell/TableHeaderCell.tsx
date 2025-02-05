import React from 'react';

import { StyledTableHeaderCell } from './TableHeaderCell.styled';
import { IconQuestion } from '@breef/shared/assets';
import { Placement } from '@floating-ui/react-dom-interactions';
import Tooltip from '../../tooltip/Tooltip';

interface TableHeaderCellProps {
    label: string;
    tooltipText?: string;
    tooltipPosition?: Placement;
}

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
    label,
    tooltipText,
    tooltipPosition,
}) => {
    return (
        <StyledTableHeaderCell>
            <div className="cell-content-wrapper">
                <span className="text">{label}</span>
                {tooltipText && (
                    <Tooltip
                        label={tooltipText}
                        placement={tooltipPosition}
                        strategy="fixed"
                    >
                        <IconQuestion />
                    </Tooltip>
                )}
            </div>
        </StyledTableHeaderCell>
    );
};
export default TableHeaderCell;
