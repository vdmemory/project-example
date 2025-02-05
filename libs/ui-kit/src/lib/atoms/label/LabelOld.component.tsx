import { FC, ReactNode } from 'react';
import { StyledLabelOld } from './LabelOld.styled';

interface LabelProps {
    id?: string;
    forId?: string;
    text: string;
    labelSubComponent?: ReactNode;
    subtext?: string;
    isOptional?: boolean;
    isDisabled?: boolean;
    children?: ReactNode;
    className?: string;
}
export const LabelOld: FC<LabelProps> = ({
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
        <StyledLabelOld
            id={id}
            htmlFor={forId}
            isDisabled={isDisabled}
            className={className}
        >
            <span>
                <span className="label-text">{text}</span>
                {isOptional && (
                    <span className="optional-text">&nbsp;(optional)</span>
                )}
                {labelSubComponent ?? null}
            </span>
            {subtext && <span className="label-subtext">{subtext}</span>}
            {children}
        </StyledLabelOld>
    );
};

export default LabelOld;
