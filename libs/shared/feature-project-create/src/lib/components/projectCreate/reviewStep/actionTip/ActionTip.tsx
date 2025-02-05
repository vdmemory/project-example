import { StyledActionTip } from './ActionTip.styled';
import { FC, ReactNode } from 'react';

interface ActionTipProps {
    className?: string;
    icon: ReactNode;
    title: string;
    description: string;
    children: ReactNode;
}

export const ActionTip: FC<ActionTipProps> = ({
    icon,
    description,
    title,
    children,
    className,
}) => (
    <StyledActionTip className={className}>
        <div className="title-row">
            {icon}
            <h3>{title}</h3>
        </div>
        <p className="description">{description}</p>
        {children}
    </StyledActionTip>
);
