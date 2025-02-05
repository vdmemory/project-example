import React, { FC, Fragment, SyntheticEvent, useEffect } from 'react';
import { StyledEditableLink } from './EditableLink.styled';
import { Input, InputOld, TrashIcon } from '@breef/ui-kit';
import { useController, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editableLinkSchema } from './editableLinkSchema';
import { CloseMidIcon, ConfirmIcon, EditMidIcon } from '@breef/shared/assets';
import { urlToDefaultFormat } from '@breef/shared/utils';
import { StyledEditableLinkOld } from './EditableLinkOld.styled';

interface EditableLinkProps {
    preValue: {
        title: string;
        link: string;
    };
    onSave: (value: { title: string; link: string } | null) => void;
    onRemove?: () => void;
    isEditable: boolean;
    setIsEditable: (value: boolean) => void;
    isLastItem?: boolean;
    className?: string;
}
const defaultValues = {
    title: '',
    link: '',
};
export const EditableLinkOld: FC<EditableLinkProps> = ({
    preValue = defaultValues,
    onSave,
    onRemove,
    isEditable,
    setIsEditable,
    isLastItem = true,
    className,
}) => {
    const { getValues, trigger, reset, control } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        defaultValues: preValue,
        resolver: yupResolver(editableLinkSchema),
    });
    const { field: fieldTitle, fieldState: fieldTitleState } = useController({
        control,
        name: 'title',
    });
    const { field: fieldLink, fieldState: fieldLinkState } = useController({
        control,
        name: 'link',
    });

    const handleSave = () => {
        trigger().then(result => {
            if (result && fieldTitle.value && fieldLink.value) {
                onSave(getValues());
                setIsEditable(false);
            }
        });
    };
    const handleRemove = () => {
        if (isLastItem) {
            setIsEditable(true);
            reset(defaultValues);
            return onSave(defaultValues);
        }
        return onRemove?.();
    };
    const handleEdit = () => {
        setIsEditable(true);
    };

    const onFieldsBlur = () => {
        fieldTitle.onBlur();
        fieldLink.onBlur();
    };

    const renderControl = () => {
        if (isEditable) {
            return (
                <Fragment>
                    <ConfirmIcon
                        className="save-icon"
                        role="button"
                        onClick={handleSave}
                    />
                    <CloseMidIcon
                        className="remove-icon"
                        role="button"
                        onClick={handleRemove}
                    />
                </Fragment>
            );
        }
        return (
            <Fragment>
                <EditMidIcon
                    className="edit-icon"
                    role="button"
                    onClick={handleEdit}
                />
                <TrashIcon
                    className="trash-icon"
                    role="button"
                    onClick={handleRemove}
                />
            </Fragment>
        );
    };

    return (
        <StyledEditableLinkOld className={className ?? 'editable-link'}>
            {isEditable ? (
                <Fragment>
                    <InputOld
                        className="input-title"
                        {...fieldTitle}
                        onBlur={onFieldsBlur}
                        placeholder="Link Name"
                        error={fieldTitleState.error?.message}
                        maxLength={100}
                    />
                    <InputOld
                        className="input-link"
                        {...fieldLink}
                        onBlur={onFieldsBlur}
                        placeholder="https://breef.com"
                        error={fieldLinkState.error?.message}
                        maxLength={992}
                    />
                </Fragment>
            ) : (
                <a
                    href={urlToDefaultFormat(preValue.link)}
                    target="_blank"
                    rel="noreferrer"
                >
                    {preValue.title}
                </a>
            )}
            <div className="control-wrapper">{renderControl()}</div>
        </StyledEditableLinkOld>
    );
};

export default EditableLinkOld;
