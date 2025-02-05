import { ReactNode } from 'react';
import { StyledCardSelect, StyledLoading } from './CardSelect.styled';
import CardController from './cardController/CardController';
import Spinner from '../../spinner/Spinner';
import { OptionsType, useSelectControl } from '../useSelectControl';

interface CardSelectProps {
    multiple?: boolean;
    initialOptions: OptionsType[];
    initialSelected?: OptionsType[];
    handleSelect: (selectedList: OptionsType[]) => void;
    cardType?: string;
    children?: ReactNode;
    cardPreset?: 'big' | 'small';
    isNotSelection?: boolean;
    isLoading?: boolean;
}

export const CardSelect = ({
    multiple = false,
    initialOptions,
    initialSelected,
    handleSelect,
    cardType,
    children,
    cardPreset,
    isNotSelection = false,
    isLoading = false,
}: CardSelectProps) => {
    const { handleChange, selectedList, optionsList } = useSelectControl({
        initialOptions,
        initialSelected,
        handleSelect,
        multiple,
    });

    const getOptionById = (data: Array<OptionsType>, id: number | string) =>
        data.find(option => id === option.id);

    if (isLoading) {
        return (
            <StyledLoading data-testid="preloader-wrapper">
                <Spinner />
            </StyledLoading>
        );
    }

    return (
        <StyledCardSelect
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {optionsList?.map((data, key) => (
                <CardController
                    key={'card-' + key}
                    cardNumber={key + 1}
                    data={data}
                    type={multiple ? 'checkbox' : 'radio'}
                    onChange={e =>
                        handleChange(e.target.id, e.target.name, isNotSelection)
                    }
                    cardType={cardType}
                    isChecked={!!getOptionById(selectedList, data.id)}
                    preset={cardPreset}
                />
            ))}
            {children}
        </StyledCardSelect>
    );
};

export default CardSelect;
