import { StyledChipSelect } from './ChipSelect.styled';
import Chip from '../../chip/Chip';
import { OptionsType, useSelectControl } from '../useSelectControl';

interface CardSelectProps {
    multiple?: boolean;
    initialOptions: OptionsType[];
    initialSelected?: OptionsType[];
    handleSelect: (selectedList: OptionsType[]) => void;
}

export const ChipSelect = ({
    multiple = false,
    initialOptions,
    initialSelected,
    handleSelect,
}: CardSelectProps) => {
    const { handleChange, selectedList, optionsList } = useSelectControl({
        initialOptions,
        initialSelected,
        handleSelect,
        multiple,
    });

    return (
        <StyledChipSelect
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="chips-wrapper">
                {optionsList?.map((data, key) => (
                    <Chip
                        key={key}
                        name={data.name}
                        onClick={() => handleChange(data.id, data.name)}
                        isChecked={selectedList.some(
                            item => item.id === data.id,
                        )}
                    />
                ))}
            </div>
        </StyledChipSelect>
    );
};

export default ChipSelect;
