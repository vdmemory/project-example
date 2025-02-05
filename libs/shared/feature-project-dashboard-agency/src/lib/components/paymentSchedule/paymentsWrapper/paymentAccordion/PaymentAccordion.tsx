import React, { FC, ReactNode, useState } from 'react';
import {
    StyledPaymentAccordion,
    StyledRowPaymentData,
} from './PaymentAccordion.styled';
import {
    AccessDeniedButton,
    Button,
    CustomDropdown,
    LinkButton,
    TableColumnsConfigType,
    Tooltip,
} from '@breef/shared/ui-components';
import { ChevronIcon, IconQuestion } from '@breef/shared/assets';
import { AnimatePresence, motion } from 'framer-motion';

export type PaymentButtonsType = {
    actionsList?: {
        onClick: (action: string) => void;
        list: {
            value: string;
            label: string;
            component?: ReactNode;
        }[];
    };
    button?: {
        title: string;
        onClick: () => void;
        arrowRight?: boolean;
        disabled?: boolean;
    };
    link?: {
        title: string;
        onClick: () => void;
        disabled?: boolean;
    };
};

interface PaymentAccordionProps {
    columns: TableColumnsConfigType;
    data: {
        id: number | string;
        invoiceCode?: ReactNode;
        description?: ReactNode;
        status?: ReactNode;
        [key: string]: ReactNode;
    };
    buttons?: PaymentButtonsType;
    editableRow?: number | null;
    isEditable: boolean;
    isAccessDenied?: boolean;
}

const animationCollapsePreset = {
    initial: 'collapsed',
    animate: 'open',
    exit: 'collapsed',
    variants: {
        open: { opacity: 1, height: 'fit-content' },
        collapsed: { opacity: 0, height: 0 },
    },
};

export const PaymentAccordion: FC<PaymentAccordionProps> = ({
    data,
    columns,
    buttons,
    editableRow,
    isEditable,
    isAccessDenied,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const renderAccessDeniedWrapper = (
        children: ReactNode,
        message: string,
        position: 'top' | 'right' = 'top',
        className?: string,
    ) => {
        if (!isAccessDenied) return children;
        return (
            <AccessDeniedButton
                className={className ?? ''}
                placement={position}
                message={message}
            >
                {children}
            </AccessDeniedButton>
        );
    };

    return (
        <StyledPaymentAccordion
            id={`table-row-${data.id}`}
            isOpen={isOpen}
            editableRow={editableRow}
            isEditable={isEditable}
        >
            <div
                className="accordion-header"
                onClick={() => !isEditable && setIsOpen(!isOpen)}
            >
                <div className="payment-short-info-wrapper">
                    <span>{data.invoiceCode}</span>
                    <span>{data.description}</span>
                </div>
                <div>{data.status}</div>
                <div className="chevron-icon-wrapper">
                    <ChevronIcon className="chevron-icon" />
                </div>
            </div>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        className="accordion-content"
                        {...animationCollapsePreset}
                    >
                        <div className="payment-body-wrapper">
                            <div className="rows-content-wrapper">
                                {columns.map((item, idx) => (
                                    <RowPaymentData
                                        key={idx}
                                        title={item.header}
                                        value={data[item.accessor]}
                                        tooltip={item.tooltip}
                                    />
                                ))}
                                {buttons?.link &&
                                    renderAccessDeniedWrapper(
                                        <LinkButton
                                            className="link-button"
                                            name={buttons.link.title}
                                            onClick={buttons.link.onClick}
                                            disabled={
                                                buttons.link.disabled ||
                                                isAccessDenied
                                            }
                                            line
                                        />,
                                        'Invoice downloading is not enabled for your type of user. Please reach out to your company owner.',
                                        'right',
                                        'link-button-wrapper',
                                    )}
                            </div>
                            <div className="actions-button-wrapper">
                                {buttons?.actionsList?.list.length ? (
                                    <CustomDropdown
                                        type="dropdown"
                                        value=""
                                        customChange={
                                            buttons.actionsList.onClick
                                        }
                                        dropdownList={buttons.actionsList.list}
                                        dropdownButtonView="dots"
                                        itemsListViewType="small"
                                    />
                                ) : null}
                            </div>
                        </div>
                        {buttons?.button &&
                            renderAccessDeniedWrapper(
                                <Button
                                    {...buttons.button}
                                    className="small"
                                    disabled={
                                        buttons.button.disabled ||
                                        isAccessDenied
                                    }
                                />,
                                'Payment functionality is not enabled for your type of user. Please reach out to your company owner.',
                            )}
                    </motion.div>
                )}
            </AnimatePresence>
        </StyledPaymentAccordion>
    );
};

interface RowPaymentDataProps {
    title: string;
    value: ReactNode;
    tooltip?: string;
}
export const RowPaymentData: FC<RowPaymentDataProps> = ({
    title,
    value,
    tooltip,
}) => {
    return (
        <StyledRowPaymentData>
            <span className="row-title">
                <span>{title}</span>
                {tooltip && (
                    <Tooltip
                        label={tooltip}
                        placement="top"
                        strategy="absolute"
                        className="tooltip"
                    >
                        <IconQuestion data-testid="icon-question" />
                    </Tooltip>
                )}
            </span>
            <span className="row-value">{value}</span>
        </StyledRowPaymentData>
    );
};
