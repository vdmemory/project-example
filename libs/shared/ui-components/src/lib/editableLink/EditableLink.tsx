import React, { FC, Fragment } from 'react';
import { StyledEditableLink } from './EditableLink.styled';
import {
    Button,
    HyperlinkIcon,
    Input,
    InputOld,
    TrashIcon,
} from '@breef/ui-kit';
import { useController, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editableLinkSchema } from './editableLinkSchema';
import { CloseMidIcon, ConfirmIcon, EditMidIcon } from '@breef/shared/assets';
import { urlToDefaultFormat } from '@breef/shared/utils';
import button from '../button/Button';

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
    titlePlaceholder?: string;
    linkPlaceholder?: string;
}
const defaultValues = {
    title: '',
    link: '',
};
export const EditableLink: FC<EditableLinkProps> = ({
    preValue = defaultValues,
    onSave,
    onRemove,
    isEditable,
    setIsEditable,
    isLastItem = true,
    className,
    titlePlaceholder = 'Link Name',
    linkPlaceholder = 'https://breef.com',
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

    const renderControlItems = () => {
        if (isEditable) {
            return (
                <Button
                    label="Add"
                    size="small"
                    className="add-button"
                    onClick={handleSave}
                />
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
    const renderControl = () => (
        <div className="control-wrapper">{renderControlItems()}</div>
    );

    return (
        <StyledEditableLink className={className ?? 'editable-link'}>
            {isEditable ? (
                <div className="fields-wrapper">
                    <Input
                        className="input-title"
                        {...fieldTitle}
                        onBlur={onFieldsBlur}
                        placeholder={titlePlaceholder}
                        error={fieldTitleState.error?.message}
                        maxLength={100}
                    />
                    <Input
                        className="input-link"
                        {...fieldLink}
                        onBlur={onFieldsBlur}
                        placeholder={linkPlaceholder}
                        error={fieldLinkState.error?.message}
                        maxLength={992}
                        placeholderIcon={<HyperlinkIcon />}
                    />
                </div>
            ) : (
                <a
                    href={urlToDefaultFormat(preValue.link)}
                    target="_blank"
                    rel="noreferrer"
                >
                    {preValue.title}
                </a>
            )}
            {renderControl()}
        </StyledEditableLink>
    );
};

export default EditableLink;
