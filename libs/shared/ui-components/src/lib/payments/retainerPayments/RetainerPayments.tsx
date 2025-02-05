import React, { ReactNode, useRef } from 'react';
import { ChangeHandler, Controller, useFormContext } from 'react-hook-form';
import { replaceExtraBreakSpaces } from '@breef/shared/utils';
import { StyledRetainerPayments } from './RetainerPayments.styled';
import { useGetList } from '@breef/shared/hooks';
import {
    ControlTypePaymentsForm,
    RetainerPaymentType,
} from '@breef/shared/types';
import { defaultRetainerPaymentValue } from './defaultValues';
import HeaderReview from '../../headerReview/HeaderReview';
import LinkButton from '../../button/linkButton/LinkButton';
import { AnimationOpacity } from '../../animation/AnimationOpacity';
import {
    DefaultInnerInput,
    InnerDatePicker,
    InnerFieldsBox,
    InnerFieldWrapper,
    InnerNumberFormat,
} from '../../innerFiledsBox';
import { CustomDropdown } from '../../customDropdown/customDropdown';

interface RetainerPaymentsProps {
    title: string;
    paymentsRetainerValue: RetainerPaymentType | null;
    existPaymentsRetainerValue?: RetainerPaymentType | null;
    deleteTitle?: string | ReactNode;
    isShowActionButton?: boolean;
    isHideOnNullValue?: boolean;
    numberOfExistPayments?: string;
    isOngoingRetainerExist?: boolean;
}

export const RetainerPayments: React.FC<RetainerPaymentsProps> = ({
    title,
    paymentsRetainerValue,
    existPaymentsRetainerValue,
    isShowActionButton = false,
    isHideOnNullValue = false,
    deleteTitle = 'Skip for Now',
    numberOfExistPayments,
    isOngoingRetainerExist = false,
}) => {
    const fieldPaymentFrequencyRef = useRef<HTMLLabelElement>(null);
    const fieldNumberOfMonthsRef = useRef<HTMLLabelElement>(null);
    const { control, setValue, trigger } =
        useFormContext<ControlTypePaymentsForm>();
    const listPaymentFrequency =
        (useGetList('paymentFrequency') as [
            { value: string; label: string },
        ]) || [];
    const listNumberOfPayments =
        (useGetList(
            isOngoingRetainerExist
                ? 'numberOfPaymentsWithoutOngoing'
                : 'numberOfPayments',
        ) as [{ value: string; label: string }]) || [];

    const onClickShowRetainer = () => {
        if (paymentsRetainerValue) {
            setValue('paymentsRetainer', null);
        } else {
            setValue(
                'paymentsRetainer',
                existPaymentsRetainerValue
                    ? { ...existPaymentsRetainerValue }
                    : { ...defaultRetainerPaymentValue },
            );
        }
        trigger('paymentsRetainer');
    };

    if (isHideOnNullValue && paymentsRetainerValue === null) return null;

    return (
        <StyledRetainerPayments data-testid="styled-retainer-wrapper">
            <HeaderReview title={title + '/\nretainer'}>
                {isShowActionButton && (
                    <LinkButton
                        name={
                            paymentsRetainerValue ? deleteTitle : 'Add Retainer'
                        }
                        className="retainer-action-button"
                        onClick={onClickShowRetainer}
                        line={!!paymentsRetainerValue}
                        icon={!paymentsRetainerValue ? 'plus' : undefined}
                        size="big"
                    />
                )}
            </HeaderReview>
            {paymentsRetainerValue && (
                <AnimationOpacity>
                    <InnerFieldsBox>
                        <Controller
                            control={control}
                            name="paymentsRetainer.deliverable"
                            defaultValue={''}
                            render={({ field }) => (
                                <InnerFieldWrapper
                                    labelText="Deliverable"
                                    isReadOnly={!!numberOfExistPayments}
                                >
                                    <DefaultInnerInput
                                        value={field.value || ''}
                                        onChange={e => {
                                            field.onChange(
                                                replaceExtraBreakSpaces(
                                                    e.target.value,
                                                ),
                                            );
                                        }}
                                        placeholder="Add details of the project"
                                        maxLength={100}
                                    />
                                </InnerFieldWrapper>
                            )}
                        />
                        <div className="inner-fields-row">
                            <Controller
                                control={control}
                                name="paymentsRetainer.amount"
                                defaultValue={null}
                                render={({ field }) => (
                                    <InnerFieldWrapper
                                        labelText="Amount"
                                        toolTipText={
                                            '15% of each retainer amount will go towards Breef’s fee.'
                                        }
                                        isReadOnly={!!numberOfExistPayments}
                                    >
                                        <InnerNumberFormat
                                            value={field.value || null}
                                            onChange={
                                                field.onChange as ChangeHandler
                                            }
                                            placeholder="USD"
                                        />
                                    </InnerFieldWrapper>
                                )}
                            />
                            <Controller
                                control={control}
                                name="paymentsRetainer.paymentFrequency"
                                defaultValue={''}
                                render={({ field }) => (
                                    <InnerFieldWrapper
                                        labelText="Payment frequency"
                                        setRef={fieldPaymentFrequencyRef}
                                        isCursorPointer
                                        isReadOnly={!!numberOfExistPayments}
                                    >
                                        <CustomDropdown
                                            value={field.value || ''}
                                            onChange={
                                                field.onChange as ChangeHandler
                                            }
                                            placeholder="Please select"
                                            dropdownList={listPaymentFrequency}
                                            parentRef={fieldPaymentFrequencyRef}
                                        />
                                    </InnerFieldWrapper>
                                )}
                            />
                        </div>
                        <div className="inner-fields-row">
                            {!!numberOfExistPayments && (
                                <InnerFieldWrapper
                                    labelText="Original Number of Payments"
                                    isReadOnly
                                >
                                    <span>{numberOfExistPayments}</span>
                                </InnerFieldWrapper>
                            )}
                            <Controller
                                control={control}
                                name="paymentsRetainer.numberOfPayments"
                                defaultValue={''}
                                render={({ field }) => (
                                    <InnerFieldWrapper
                                        labelText={
                                            numberOfExistPayments
                                                ? 'Additional Retainer Payments'
                                                : 'Number of payments'
                                        }
                                        setRef={fieldNumberOfMonthsRef}
                                        isCursorPointer
                                    >
                                        <CustomDropdown
                                            value={field.value || ''}
                                            onChange={
                                                field.onChange as ChangeHandler
                                            }
                                            placeholder="Please select"
                                            dropdownList={
                                                listNumberOfPayments as [
                                                    {
                                                        value: string;
                                                        label: string;
                                                    },
                                                ]
                                            }
                                            parentRef={fieldNumberOfMonthsRef}
                                        />
                                    </InnerFieldWrapper>
                                )}
                            />
                        </div>
                        <Controller
                            control={control}
                            name="paymentsRetainer.invoiceDate"
                            defaultValue={''}
                            render={({ field, fieldState: { error } }) => (
                                <InnerFieldWrapper
                                    labelText="est. delivery / invoice date"
                                    isCursorPointer
                                    isReadOnly={!!numberOfExistPayments}
                                    error={
                                        error && error.type === 'min'
                                            ? error.message
                                            : undefined
                                    }
                                >
                                    <InnerDatePicker
                                        value={field.value || ''}
                                        onChange={field.onChange}
                                    />
                                </InnerFieldWrapper>
                            )}
                        />
                    </InnerFieldsBox>
                </AnimationOpacity>
            )}
        </StyledRetainerPayments>
    );
};
export default RetainerPayments;
