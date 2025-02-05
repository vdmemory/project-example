import { FC } from 'react';
import { StyledTabChevron } from './TabChevron.styled';

interface NextStepArrowProps {
    title: string | JSX.Element;
    isActive?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}
export const TabChevron: FC<NextStepArrowProps> = ({
    title,
    isActive,
    onClick,
    disabled,
    className,
}) => {
    return (
        <StyledTabChevron
            data-testid="tab-chevron-wrapper"
            className={className}
            isActive={isActive}
            isClickable={!!onClick}
            onClick={!disabled ? onClick : undefined}
            disabled={disabled}
        >
            <div className="left-part" />
            <div className="right-part" />
            <span>{title}</span>
        </StyledTabChevron>
    );
};
