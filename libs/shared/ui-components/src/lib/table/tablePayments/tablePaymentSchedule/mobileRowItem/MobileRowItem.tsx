import React from 'react';
import { StyledMobileRowItem } from './MobileRowItem.styled';
import { Placement } from '@floating-ui/react-dom-interactions';
import { IconQuestion } from '@breef/shared/assets';
import Tooltip from '../../../../tooltip/Tooltip';

interface MobileRowItemProps {
    title: string;
    value: string;
    tooltipText?: string;
    tooltipPosition?: Placement;
}

export const MobileRowItem: React.FC<MobileRowItemProps> = ({
    title,
    value,
    tooltipText,
    tooltipPosition,
}) => {
    return (
        <StyledMobileRowItem className="mobile-row-item">
            <div className="title-row-wrapper">
                <span className="title-row-text">{title}</span>
                {tooltipText && (
                    <Tooltip label={tooltipText} placement={tooltipPosition}>
                        <IconQuestion />
                    </Tooltip>
                )}
            </div>
            <span className="value-row-text">{value}</span>
        </StyledMobileRowItem>
    );
};
export default MobileRowItem;
