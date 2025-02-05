import { ReactNode } from 'react';
import { StyledCard } from './Card.styled';

export const Card = ({
    label,
    children,
    renderFooter,
}: {
    label: string;
    children: ReactNode;
    renderFooter?: ReactNode;
}) => {
    return (
        <StyledCard>
            <div className="header">
                <div data-testid="label" className="label">
                    {label}
                </div>
            </div>
            <div className="content">{children}</div>
            {renderFooter}
        </StyledCard>
    );
};
