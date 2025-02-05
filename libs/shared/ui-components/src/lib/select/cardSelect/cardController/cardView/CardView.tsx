import { IconQuestion } from '@breef/shared/assets';
import React from 'react';
import Tooltip from '../../../../tooltip/Tooltip';
import { StyledCardView } from './CardView.styled';
import { useMediaContext } from '@breef/shared/hooks';

type CardViewType = {
    label?: string;
    description?: string;
    className?: string;
    children?: React.ReactNode;
    tooltip?: string;
    id?: string;
    onEdit?: () => void;
};

const CardView: React.FC<CardViewType> = ({
    label,
    description,
    className,
    children,
    tooltip,
    id,
    onEdit,
}) => {
    const { isMobile } = useMediaContext();

    return (
        <StyledCardView
            data-testid="card-view-wrapper"
            className={
                onEdit ? className || '' : `card-notEdit ${className || ''}`
            }
            onClick={onEdit ? onEdit : undefined}
            id={id}
        >
            <div className="card-label">
                {label && <span className="card-label--item">{label}</span>}
                {tooltip && (
                    <Tooltip placement="top" label={tooltip}>
                        <IconQuestion data-testid="tooltip-icon" />
                    </Tooltip>
                )}
            </div>
            {description && (
                <div className="card-description">{description}</div>
            )}
            {children && <div className="card-children">{children}</div>}
            {onEdit && !isMobile && <span className="edit-label">Edit</span>}
        </StyledCardView>
    );
};

export { CardView, StyledCardView };
