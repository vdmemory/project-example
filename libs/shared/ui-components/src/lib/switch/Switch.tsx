import React from 'react';
import { SwitchStyled } from './Switch.styled';

type TypeSwitch = {
    active: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onMouseDown?: (e: React.MouseEvent<HTMLInputElement>) => void;
};

export default function Switch({
    active,
    ...rest
}: TypeSwitch): React.ReactElement {
    return (
        <SwitchStyled>
            <label className={active ? 'switch switch--active' : 'switch'}>
                <input
                    data-testid="switch-checkbox"
                    type="checkbox"
                    checked={active}
                    {...rest}
                />
                <span />
            </label>
        </SwitchStyled>
    );
}
