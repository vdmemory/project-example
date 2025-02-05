import React from 'react';
import { ChangeHandler, Control, Controller, Path } from 'react-hook-form';
import InnerField from './innerField/InnerField';
import { ControlTypeInnerForm } from '@breef/shared/types';
import { ConfigInnerFieldType } from '../InnerForm';
import { modifyHandleChangeField } from '@breef/shared/utils';

export interface InnerControllerProps {
    control: Control<ControlTypeInnerForm>;
    fieldItem: ConfigInnerFieldType;
    cleanError: (name: Path<ControlTypeInnerForm>) => void;
}

export function InnerController({
    control,
    fieldItem,
    cleanError,
}: InnerControllerProps) {
    return (
        <Controller
            control={control}
            name={fieldItem.name}
            render={({ field, fieldState }) => (
                <InnerField
                    {...fieldItem}
                    {...field}
                    {...fieldState}
                    onChange={
                        modifyHandleChangeField(fieldItem, field.onChange, () =>
                            cleanError(fieldItem.name),
                        ) as ChangeHandler
                    }
                />
            )}
        />
    );
}
