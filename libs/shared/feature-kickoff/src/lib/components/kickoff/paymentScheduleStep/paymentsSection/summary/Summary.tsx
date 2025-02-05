import { StyledSummary } from './Summary.styled';
import { ChangeHandler, UseControllerReturn } from 'react-hook-form';
import {
    CustomDropdown,
    InnerFieldsBox,
    InnerFieldWrapper,
    InnerNumberFormat,
} from '@breef/shared/ui-components';
import React, { useRef } from 'react';
import { useGetList } from '@breef/shared/hooks';
import { ControlTypePaymentsForm } from '@breef/shared/types';

interface SummaryProps {
    fieldPaymentTerms: UseControllerReturn<
        ControlTypePaymentsForm,
        'paymentTerms'
    >;
    total: number;
    teamTake: number;
}

export const Summary: React.FC<SummaryProps> = ({
    fieldPaymentTerms: { field },
    total,
    teamTake,
}) => {
    const paymentTermsFieldRef = useRef<HTMLLabelElement>(null);
    const listPaymentTerms = (useGetList('paymentTerms') || []) as {
        value: string;
        label: string;
    }[];

    return (
        <StyledSummary>
            <InnerFieldsBox>
                <InnerFieldWrapper
                    labelText="Payment terms"
                    setRef={paymentTermsFieldRef}
                    isCursorPointer
                >
                    <CustomDropdown
                        value={field.value}
                        onChange={field.onChange as ChangeHandler}
                        dropdownList={listPaymentTerms}
                        placeholder="Please select"
                        parentRef={paymentTermsFieldRef}
                    />
                </InnerFieldWrapper>
                <div className="inner-fields-row read-only-wrapper">
                    <InnerFieldWrapper labelText="Total Client Payment">
                        <InnerNumberFormat value={total} isReadOnly />
                    </InnerFieldWrapper>
                    <InnerFieldWrapper labelText="Team take">
                        <InnerNumberFormat value={teamTake} isReadOnly />
                    </InnerFieldWrapper>
                </div>
            </InnerFieldsBox>
        </StyledSummary>
    );
};
export default Summary;
