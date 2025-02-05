import React from 'react';
import { StyledSpinner } from './Spinner.styled';

interface SpinnerProps {
    position?: 'center' | 'right';
    className?: string;
}

export const Spinner = ({ position = 'center', className }: SpinnerProps) => {
    return (
        <StyledSpinner
            data-testid="spinner"
            position={position}
            className={className ? `${className} spinner` : 'spinner'}
        >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </StyledSpinner>
    );
};

export default Spinner;
