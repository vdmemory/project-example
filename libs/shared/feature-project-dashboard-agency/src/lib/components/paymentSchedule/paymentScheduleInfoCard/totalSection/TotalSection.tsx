import React, { FC } from 'react';
import { StyledTotalSection } from './TotalSection.styled';

interface TotalSectionProps {
    totalPaid: string;
    totalValue: string;
    totalTeamTake?: string;
}
export const TotalSection: FC<TotalSectionProps> = ({
    totalPaid,
    totalValue,
    totalTeamTake,
}) => {
    return (
        <StyledTotalSection>
            <div className="total-values-wrapper">
                <div className="total-col">
                    <span className="accent-label">Total paid</span>
                    <span className="total-col-value accent-color">
                        {totalPaid}
                    </span>
                </div>
                <span className="total-col-value">&nbsp;/&nbsp;</span>
                <div className="total-col">
                    <span className="accent-label">Total project value</span>
                    <span className="total-col-value">{totalValue}</span>
                </div>
            </div>
            {totalTeamTake !== undefined && (
                <div className="team-take-wrapper">
                    <span className="accent-label">Team Take:&nbsp;</span>
                    <span className="accent-label accent-color">
                        {totalTeamTake}
                    </span>
                </div>
            )}
        </StyledTotalSection>
    );
};
