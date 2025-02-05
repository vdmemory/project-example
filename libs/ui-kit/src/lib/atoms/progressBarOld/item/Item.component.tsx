import { SelectedIcon } from '../../../icons/svg';
import { StyledItem } from './Item.styled';

interface ItemProps {
    label: string;
    order: number;
    isActive?: boolean;
    isCompleted?: boolean;
    className?: string;
}

export const Item = ({
    label,
    order,
    isActive,
    isCompleted,
    className,
}: ItemProps) => {
    return (
        <StyledItem
            isActive={isActive}
            isCompleted={isCompleted}
            className={className}
        >
            <div className="order">
                {isCompleted ? (
                    <SelectedIcon data-testid="selected-icon" />
                ) : (
                    order
                )}
            </div>
            <div className="label">{label}</div>
        </StyledItem>
    );
};
