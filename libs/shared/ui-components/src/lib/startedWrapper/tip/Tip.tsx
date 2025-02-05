import { StyledTip } from './Tip.styled';
import { ReactNode } from 'react';

interface NextStepProps {
    icon: ReactNode;
    label: string;
    note: string;
}

export function Tip({ icon, label, note }: NextStepProps) {
    return (
        <StyledTip>
            <div className="icon-wrapper">{icon}</div>
            <span className="label-tip">{label}</span>
            <span className="note-tip">{note}</span>
        </StyledTip>
    );
}
