import { StyledChip } from './Chip.styled';

interface ChipButtonProps {
    name: string;
    isChecked: boolean;
    onClick: (event: React.SyntheticEvent) => void;
}

export const Chip = ({ name, onClick, isChecked }: ChipButtonProps) => {
    return (
        <StyledChip isChecked={isChecked}>
            <input
                data-testid="input-checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={onClick}
            />
            {name}
        </StyledChip>
    );
};

export default Chip;
