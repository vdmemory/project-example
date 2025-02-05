import React, { useState } from 'react';
import {
    useFormContext,
    Controller,
    UseFieldArrayReturn,
    ChangeHandler,
} from 'react-hook-form';
import { replaceExtraBreakSpaces } from '@breef/shared/utils';
import { BasketIcon, UploadIcon } from '@breef/shared/assets';
import { StyledMilestonePayments } from './MilestonePayments.styled';
import ConfirmDeletePopup from './confirmDeletePopup/ConfirmDeletePopup';
import {
    ControlTypePaymentsForm,
    MilestonePaymentType,
} from '@breef/shared/types';
import { defaultMilestonePaymentValue } from './defaultValues';
import HeaderReview from '../../headerReview/HeaderReview';
import LinkButton from '../../button/linkButton/LinkButton';
import {
    DefaultInnerInput,
    InnerDatePicker,
    InnerFieldsBox,
    InnerFieldWrapper,
    InnerNumberFormat,
} from '../../innerFiledsBox';
import { usePopup } from '../../popup/usePopup';
import { useMediaContext } from '@breef/shared/hooks';

interface MilestonePaymentsProps {
    title?: string;
    fieldMethods: UseFieldArrayReturn<
        ControlTypePaymentsForm,
        'paymentsMilestone'
    >;
    isCheckConfirmToDelete?: boolean;
    isAbilityToDeleteLastOne?: boolean;
}

type PaymentActionType = 'moveUp' | 'moveDown' | 'remove' | 'append';

export const MilestonePayments: React.FC<MilestonePaymentsProps> = ({
    title,
    fieldMethods: { fields, move, append, remove },
    isCheckConfirmToDelete = true,
    isAbilityToDeleteLastOne = false,
}) => {
    const { isMobile } = useMediaContext();
    const confirmDeletePopupControl = usePopup();
    const [targetDeletePaymentId, setTargetDeletePaymentId] = useState(0);
    const { control, watch } = useFormContext<ControlTypePaymentsForm>();
    const watchFieldArray = watch('paymentsMilestone');
    const controlledFields = fields.map((field, index) => {
        return {
            ...field,
            ...watchFieldArray[index],
        };
    });
    const isDisabledDeleteButton =
        fields.length === 1 && !isAbilityToDeleteLastOne;

    const actionController = (index: number, action: PaymentActionType) => {
        switch (action) {
            case 'append':
                return append({
                    ...defaultMilestonePaymentValue,
                } as MilestonePaymentType);
            case 'remove':
                return remove(index);
            case 'moveDown':
                return move(index, index + 1);
            case 'moveUp':
                return move(index, index - 1);
            default:
                return null;
        }
    };

    const handleDeletePayment = (index: number) => {
        if (isCheckConfirmToDelete) {
            setTargetDeletePaymentId(index);
            confirmDeletePopupControl.open();
        } else {
            actionController(index, 'remove');
        }
    };

    return (
        <StyledMilestonePayments>
            {confirmDeletePopupControl.isOpen && (
                <ConfirmDeletePopup
                    acceptFunction={() =>
                        actionController(targetDeletePaymentId, 'remove')
                    }
                    close={confirmDeletePopupControl.close}
                />
            )}
            {title && <HeaderReview title={title + '/\none time'} />}
            {controlledFields.map((item, index) => (
                <React.Fragment key={item.id}>
                    <HeaderReview title={`Milestone ${index + 1}`}>
                        <div className="payment-buttons-wrapper">
                            <button
                                className="action-button button-up"
                                onClick={() =>
                                    actionController(index, 'moveUp')
                                }
                                disabled={!index}
                            >
                                <UploadIcon />
                            </button>
                            <button
                                className="action-button button-down"
                                onClick={() =>
                                    actionController(index, 'moveDown')
                                }
                                disabled={index === fields.length - 1}
                            >
                                <UploadIcon />
                            </button>
                            {!isMobile ? (
                                <LinkButton
                                    onClick={() => handleDeletePayment(index)}
                                    name="Delete"
                                    size="big"
                                    className="delete-button"
                                    line
                                    disabled={isDisabledDeleteButton}
                                />
                            ) : (
                                <button
                                    className="delete-button basket-button"
                                    onClick={() => handleDeletePayment(index)}
                                    disabled={isDisabledDeleteButton}
                                >
                                    <BasketIcon />
                                </button>
                            )}
                        </div>
                    </HeaderReview>
                    <InnerFieldsBox>
                        <Controller
                            control={control}
                            name={
                                `paymentsMilestone.${index}.deliverable` as const
                            }
                            defaultValue={''}
                            render={({ field }) => (
                                <InnerFieldWrapper labelText="Deliverable">
                                    <DefaultInnerInput
                                        value={field.value}
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
                        <Controller
                            control={control}
                            name={
                                `paymentsMilestone.${index}.invoiceDate` as const
                            }
                            defaultValue={''}
                            render={({ field, fieldState: { error } }) => (
                                <InnerFieldWrapper
                                    labelText="est. delivery / invoice date"
                                    toolTipText="The date is an estimation and non-binding"
                                    tooltipOffset={30}
                                    isCursorPointer
                                    error={
                                        error &&
                                        (error.type === 'important' ||
                                            error.type === 'min')
                                            ? error.message
                                            : undefined
                                    }
                                >
                                    <InnerDatePicker
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </InnerFieldWrapper>
                            )}
                        />
                        <Controller
                            control={control}
                            name={`paymentsMilestone.${index}.amount` as const}
                            defaultValue={null}
                            render={({ field, fieldState: { error } }) => (
                                <InnerFieldWrapper
                                    labelText="Amount"
                                    toolTipText={
                                        '15% of total milestone amounts will be deducted from the 1st payment as part of Breef’s fee.\nPlease ensure your 1st milestone is at least 25% of your total milestone payments.'
                                    }
                                    tooltipOffset={30}
                                    error={
                                        error && error.type === 'important'
                                            ? error.message
                                            : undefined
                                    }
                                >
                                    <InnerNumberFormat
                                        value={field.value}
                                        onChange={
                                            field.onChange as ChangeHandler
                                        }
                                        placeholder="USD"
                                    />
                                </InnerFieldWrapper>
                            )}
                        />
                    </InnerFieldsBox>
                </React.Fragment>
            ))}
            <LinkButton
                className="add-milestone-button"
                name="Milestone"
                onClick={() => actionController(0, 'append')}
                icon="plus"
                size="big"
            />
        </StyledMilestonePayments>
    );
};

export default MilestonePayments;
