import { StyledFieldController } from './FieldController.styled';
import {
    Controller,
    Path,
    Control,
    FieldErrors,
    UseFormClearErrors,
    UseFormSetValue,
    useController,
    UseFormResetField,
} from 'react-hook-form';
import React from 'react';
import FieldDetection from './contentSteps/FieldDetection';
import { limitSymbols, replaceExtraBreakSpaces } from '@breef/shared/utils';
import { AuthGoogleType } from '@breef/shared/types';
import FieldCheckBox from '../../checkbox/fieldCheckbox/FieldCheckBox';

export type FieldConfiguration = {
    path: string;
    typeButton: 'submit' | 'button';
    defaultValue: string;
    isVisibleStepInfo: boolean;
    rules: { required: boolean };
    label: string;
    placeholder: string;
    typeField: string;
    typeInput?: 'text' | 'password' | 'phone';
    maxLength?: number;
    hideArrowBtn?: boolean;
    showOnlyBackendErrors?: boolean;
    skip?: string;
    listType?: string;
    checkboxes?: { label: string; path: string }[];
    dependencyFieldPath?: string;
    childrenDependencyFieldPath?: string;
    childrenDependencyFieldDefaultValue?: unknown;
};

export interface FieldControllerProps {
    isSubmitting: boolean;
    onClick: (
        key: string,
        data: AuthGoogleType | React.SyntheticEvent | { query: string },
    ) => void;
    formStep: number;
    fieldForm: FieldConfiguration;
    numberSteps: number;
    //TODO: replace any type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fieldPath: Path<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clearErrors: UseFormClearErrors<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resetField: UseFormResetField<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue: UseFormSetValue<any>;
    errors: FieldErrors;
    showOnlyBackendErrors?: boolean;
    onMouseEnter?: (e: React.SyntheticEvent, id: number) => void;
    onMouseLeave?: (id?: number) => void;
    isBookedCall?: boolean;
    bookACallCallback?: () => void;
    isFieldArrowNextOnMobile?: boolean;
    isNextMore?: boolean;
    onEyeIcon?: boolean;
}

export function FieldController({
    fieldForm,
    fieldForm: { rules, label, isVisibleStepInfo },
    showOnlyBackendErrors,
    formStep,
    numberSteps,
    fieldPath,
    control,
    isSubmitting,
    clearErrors,
    resetField,
    setValue,
    errors,
    onClick,
    onMouseEnter,
    onMouseLeave,
    isBookedCall,
    bookACallCallback,
    isFieldArrowNextOnMobile = true,
    isNextMore = true,
    onEyeIcon = false,
}: FieldControllerProps) {
    const transformTextFieldValue = (value: string, maxLength: number) => {
        return limitSymbols(maxLength, replaceExtraBreakSpaces(value));
    };

    const dependencyFieldValue = useController({
        control,
        name: fieldForm.dependencyFieldPath || '',
    }).field.value;

    const resetChildrenDependencyField = () => {
        if (fieldForm.childrenDependencyFieldPath) {
            resetField(fieldForm.childrenDependencyFieldPath, {
                defaultValue:
                    fieldForm.childrenDependencyFieldDefaultValue || '',
            });
        }
    };

    return (
        <StyledFieldController key={fieldForm.path}>
            <label>
                {isVisibleStepInfo && (
                    <span className="step-info">
                        {formStep}/{numberSteps}
                    </span>
                )}
                {label}
            </label>
            <Controller
                name={fieldPath}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <div className="content-inner ">
                        <FieldDetection
                            onEyeIcon={onEyeIcon}
                            disabled={isSubmitting}
                            value={field.value}
                            onClick={onClick}
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                            onChange={e => {
                                clearErrors(fieldPath);
                                resetChildrenDependencyField();
                                field.onChange(
                                    fieldForm.typeInput === 'text' &&
                                        fieldForm.maxLength
                                        ? transformTextFieldValue(
                                              e.target.value,
                                              fieldForm.maxLength,
                                          )
                                        : e,
                                );
                            }}
                            setValue={(value: string) =>
                                setValue(fieldPath, value)
                            }
                            {...fieldForm}
                            dependencyFieldValue={dependencyFieldValue}
                            isDisableNextBtn={
                                !!errors[fieldPath] || isSubmitting
                            }
                            error={
                                showOnlyBackendErrors
                                    ? errors[fieldPath]?.type === 'backend'
                                        ? (errors[fieldPath]?.message as string)
                                        : ''
                                    : (errors[fieldPath]?.message as string)
                            }
                            isBookedCall={isBookedCall}
                            bookACallCallback={bookACallCallback}
                            isFieldArrowNextOnMobile={isFieldArrowNextOnMobile}
                            isNextMore={isNextMore}
                        />
                    </div>
                )}
            />
            {fieldForm.checkboxes &&
                fieldForm.checkboxes.map((item, key) => (
                    <Controller
                        name={item.path}
                        control={control}
                        render={({ field }) => (
                            <div className="content-inner ">
                                <FieldCheckBox
                                    onChange={field.onChange}
                                    value={field.value}
                                    label={item.label}
                                />
                            </div>
                        )}
                    />
                ))}
        </StyledFieldController>
    );
}
