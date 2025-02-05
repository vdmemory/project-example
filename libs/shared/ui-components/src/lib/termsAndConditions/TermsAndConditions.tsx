import React, { FC, RefObject } from 'react';
import { FieldCheckBox } from '../checkbox/fieldCheckbox/FieldCheckBox';
import { TERMS_OF_USE_STANDARD_ROUTE } from '@breef/shared/constants';
import { StyledTermsAndConditions } from './TermsAndConditions.styled';

interface TermsAndConditionsProps {
    className?: string;
    onChange: (checked: boolean) => void;
    value: boolean;
    ref?: RefObject<HTMLSpanElement>;
}
export const TermsAndConditions: FC<TermsAndConditionsProps> = ({
    className,
    ref,
    value,
    onChange,
}) => {
    return (
        <StyledTermsAndConditions className={className}>
            <FieldCheckBox
                className="terms-checkbox"
                onChange={onChange}
                value={value}
            >
                <span ref={ref}>
                    I accept the&nbsp;
                    <a
                        href={`/client${TERMS_OF_USE_STANDARD_ROUTE}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        terms and conditions
                    </a>
                </span>
            </FieldCheckBox>
        </StyledTermsAndConditions>
    );
};

export default TermsAndConditions;
