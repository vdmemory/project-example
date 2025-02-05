import { StyledSwitch } from './Switch.styled';

interface SwitchProps {
    label: string;
    isOn: boolean;
    onToggle: () => void;
}

export function Switch({ label, isOn, onToggle }: SwitchProps) {
    return (
        <StyledSwitch className="switch">
            <div className="wrapper">
                <input
                    className="input"
                    type="checkbox"
                    id="toggle-btn"
                    checked={isOn}
                    onChange={onToggle}
                />
                <label className="toggle" htmlFor="toggle-btn"></label>
            </div>
            <div className="label">{label}</div>
        </StyledSwitch>
    );
}
