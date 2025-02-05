import { CheckSmallIcon, VerticalArrowIcon } from '../../../icons/svg';
import { StyledItem } from './Item.styled';

interface ItemProps {
    label: string;
    isActive?: boolean;
    isCompleted?: boolean;
    className?: string;
    order: number;
}

export const Item = ({
    label,
    isActive,
    isCompleted,
    className,
    order,
}: ItemProps) => {
    const isShowArrow = order !== 1;

    return (
        <StyledItem
            isActive={isActive}
            isCompleted={isCompleted}
            className={className}
        >
            {isShowArrow && <VerticalArrowIcon className="arrow" />}
            <div className="order">{isCompleted && <CheckSmallIcon />}</div>
            <div className="label">{label}</div>
        </StyledItem>
    );
};
