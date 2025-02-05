import React, { FC, ReactNode } from 'react';
import { StyledLabel } from './Label.styled';

interface LabelProps {
    id?: string;
    forId?: string;
    text?: string;
    labelSubComponent?: ReactNode;
    subtext?: string;
    isOptional?: boolean;
    isDisabled?: boolean;
    children?: ReactNode;
    className?: string;
}
export const Label: FC<LabelProps> = ({
    id,
    forId,
    text,
    labelSubComponent,
    subtext,
    isOptional = false,
    isDisabled = false,
    children,
    className,
}) => {
    return (
        <StyledLabel
            id={id}
            htmlFor={forId}
            isDisabled={isDisabled}
            className={className}
        >
            {text && (
                <span>
                    <span className="label-text">{text}</span>
                    {isOptional && (
                        <span className="optional-text">&nbsp;(optional)</span>
                    )}
                    {labelSubComponent ?? null}
                </span>
            )}
            {subtext && <span className="label-subtext">{subtext}</span>}
            {children}
        </StyledLabel>
    );
};

export default Label;
