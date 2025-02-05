import { TeammateType } from '@breef/shared/types';
import { Pill } from '@breef/ui-kit';
import { StyledTeammatesList } from './TeammatesList.styled';

interface TeammatesListProps {
    label?: string;
    list: TeammateType[];
    onClick?: (email: string) => void;
    isSuggestions?: boolean;
    variant?: 'primary' | 'secondary';
}

export const TeammatesList = ({
    label,
    list,
    onClick,
    isSuggestions,
    variant = 'primary',
}: TeammatesListProps) => {
    const typeButton = isSuggestions ? 'add' : 'remove';

    const getLabel = (item: TeammateType) => {
        if (item.firstName) {
            return `${item.firstName} ${item.lastName}`;
        }

        return item.email;
    };

    return (
        <StyledTeammatesList>
            {label && <h3>{label}</h3>}
            <div className="list">
                {list.map(item => {
                    const { email } = item;
                    return (
                        <Pill
                            className={variant}
                            key={email}
                            onClick={() => onClick?.(email)}
                            label={getLabel(item)}
                            iconType={typeButton as 'add' | 'remove'}
                            iconSide="left"
                        />
                    );
                })}
            </div>
        </StyledTeammatesList>
    );
};
