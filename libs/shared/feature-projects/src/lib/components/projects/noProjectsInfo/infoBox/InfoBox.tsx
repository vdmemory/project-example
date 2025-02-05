import { StyledInfoBox } from './InfoBox.styled';
import { ReactNode } from 'react';

interface InfoBoxProps {
    children: ReactNode;
    label: string;
    note: string;
}

export function InfoBox({ children, label, note }: InfoBoxProps) {
    return (
        <StyledInfoBox>
            {children}
            <span className="label">{label}</span>
            <span className="note">{note}</span>
        </StyledInfoBox>
    );
}
