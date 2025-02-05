import React from 'react';
import { StyledInnerForm, StyledRowFields } from './InnerForm.styled';
import { Control, Path, UseFormClearErrors } from 'react-hook-form';
import { ControlTypeInnerForm } from '@breef/shared/types';
import { InnerController } from './innerController/InnerController';

export type ConfigInnerFormType = ConfigInnerFieldType[];

export type ConfigInnerFieldType = {
    label: string;
    name: Path<unknown>;
    placeholder: string;
    type:
        | 'text'
        | 'password'
        | 'checkbox'
        | 'dropdown'
        | 'textarea'
        | 'phone'
        | 'socialLink';
    listType?: string;
    rowsCount?: number;
    row?: ConfigInnerFieldType[];
    maxLength?: number;
    removeBreakSpaces?: 'all' | 'partially';
    mask?: 'phoneNumber';
    suggested?: string;
    isDisplayUppercaseValue?: boolean;
    isDisplayCapitalizeValue?: boolean;
};

export interface InnerFormProps {
    config: ConfigInnerFormType;
    control: Control<ControlTypeInnerForm>;
    cleanErrors: UseFormClearErrors<ControlTypeInnerForm>;
    isActiveForm?: boolean;
}

export function InnerForm({
    config,
    control,
    cleanErrors,
    isActiveForm = true,
}: InnerFormProps) {
    const className =
        'inner-form inner-form-company-info' + (isActiveForm ? ' active' : '');

    return (
        <StyledInnerForm
            isActive={isActiveForm}
            className={className}
            data-testid="inner-form"
        >
            {config.map((fieldRow, key) =>
                fieldRow.row ? (
                    <StyledRowFields
                        key={key}
                        fieldsCount={fieldRow.row.length}
                    >
                        {fieldRow.row.map((fieldItem, innerKey) => (
                            <InnerController
                                key={innerKey}
                                control={control}
                                fieldItem={fieldItem}
                                cleanError={cleanErrors}
                            />
                        ))}
                    </StyledRowFields>
                ) : (
                    <InnerController
                        key={key}
                        control={control}
                        fieldItem={fieldRow}
                        cleanError={cleanErrors}
                    />
                ),
            )}
        </StyledInnerForm>
    );
}
