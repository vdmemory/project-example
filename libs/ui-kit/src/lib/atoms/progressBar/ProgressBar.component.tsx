import { Item } from './item/Item.component';
import { type ProgressBarType } from './item/Item.types';
import { StyledProgressBar } from './ProgressBar.styled';

interface ProgressBarProps {
    items: ProgressBarType;
    className?: string;
    active?: number | null;
    isCompleted?: boolean;
    isVertical?: boolean;
}

const ProgressBar = ({
    items,
    className,
    active,
    isCompleted,
    isVertical = false,
}: ProgressBarProps) => {
    const getCompleted = (order: number) => {
        if (active && active > order) return true;
        if (active && active === order && isCompleted) return true;
        return false;
    };
    const getActive = (order: number) => active === order;

    return (
        <StyledProgressBar
            className={className}
            isVertical={isVertical}
            data-testid={'progress-bar'}
        >
            {items.map((item, index) => (
                <Item
                    key={item}
                    order={index + 1}
                    label={item}
                    isActive={getActive(index + 1)}
                    isCompleted={getCompleted(index + 1)}
                />
            ))}
        </StyledProgressBar>
    );
};

export { ProgressBar, type ProgressBarType };
