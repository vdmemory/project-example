import { Item } from './item/Item.component';
import { ProgressType } from './item/Item.types';
import { StyledProgress } from './Progress.styled';
import { ProgressItem, ProgressState } from '@breef/shared/types';

interface ProgressProps {
    items: ProgressItem[];
    className?: string;
}

const Progress = ({ items, className }: ProgressProps) => {
    return (
        <StyledProgress className={className}>
            {items.map((item, index) => (
                <Item
                    key={item.name}
                    label={item.name}
                    order={index + 1}
                    isActive={item.status === ProgressState.inProgress}
                    isCompleted={item.status === ProgressState.done}
                />
            ))}
        </StyledProgress>
    );
};

export { Progress, type ProgressType };
