import React, { FC } from 'react';
import { StyledFormPastWork } from './FormPastWork.styled';
import {
    Dropzone,
    File,
    StyledWorkPopupFieldLabel,
    StyledWorkPopupRow,
    WorkPopupControl,
} from '@breef/shared/ui-components';
import { useFormPastWorkControl } from './useFormPastWorkControl';
import {
    DropDown,
    Input,
    InputOld,
    Textarea,
    TextareaOld,
} from '@breef/ui-kit';
import {
    DEFAULT_UPLOAD_TEXT_SIZE,
    monthsList,
    yearsList,
} from '@breef/shared/constants';
import {
    useDocumentController,
    useMediaContext,
    useSaveDocument,
} from '@breef/shared/hooks';
import { DocsType, PastWorkFormType } from '@breef/shared/types';
import { ChangeHandler } from 'react-hook-form';

interface FormPastWorkProps {
    onClose: () => void;
    onSave: (formData: PastWorkFormType) => void;
    preValue?: PastWorkFormType | null;
}

export const FormPastWork: FC<FormPastWorkProps> = ({
    onClose,
    onSave,
    preValue,
}) => {
    const {
        getValues,
        isValidForm,
        trigger,
        fieldClientTestimonial,
        fieldDocuments,
        fieldClientWebsite,
        fieldClientName,
        fieldProjectName,
        fieldProjectDescription,
        fieldStartDateMonth,
        fieldStartDateYear,
        fieldLink,
    } = useFormPastWorkControl(preValue);

    const { isMobile } = useMediaContext();

    const { saveDocument, handleDeleteLink } = useDocumentController({
        documentsValue: fieldDocuments.value as DocsType[],
        onChange: fieldDocuments.onChange as ChangeHandler,
    });
    const { uploadDocument, uploading } = useSaveDocument({
        saveDocument,
    });

    const handleChangeDropzone = (files: File[], currentFileId?: number) =>
        uploadDocument(files[0], currentFileId);

    const handleSaveData = () => {
        onSave(getValues());
        onClose();
    };

    const handleSelectStartMonth = (value: string) => {
        fieldStartDateMonth.onChange(value);
        trigger('startDateYear');
    };
    const handleSelectStartYear = (value: string) => {
        fieldStartDateYear.onChange(value);
        trigger('startDateMonth');
    };

    return (
        <StyledFormPastWork>
            <StyledWorkPopupRow className="flex-row padding-right">
                <div>
                    <StyledWorkPopupFieldLabel isShortPadding>
                        Client Name
                    </StyledWorkPopupFieldLabel>
                    <InputOld
                        {...fieldClientName}
                        error={fieldClientName.error?.message}
                        placeholder="Breef"
                        maxLength={255}
                    />
                </div>
                <div>
                    <StyledWorkPopupFieldLabel isShortPadding>
                        Client Website (Optional)
                    </StyledWorkPopupFieldLabel>
                    <InputOld
                        {...fieldClientWebsite}
                        error={fieldClientWebsite.error?.message}
                        placeholder="www.breef.com"
                        maxLength={2000}
                    />
                </div>
            </StyledWorkPopupRow>
            <StyledWorkPopupRow className="padding-right">
                <StyledWorkPopupFieldLabel isShortPadding>
                    Project Name
                </StyledWorkPopupFieldLabel>
                <InputOld
                    {...fieldProjectName}
                    error={fieldProjectName.error?.message}
                    placeholder="Thanksgiving Paid Advertising Campaign"
                    className="project-name-input"
                    maxLength={255}
                />
            </StyledWorkPopupRow>
            <StyledWorkPopupRow className="flex-row padding-right">
                <fieldset className="group">
                    {isMobile && (
                        <StyledWorkPopupFieldLabel isShortPadding>
                            Start Date (Optional)
                        </StyledWorkPopupFieldLabel>
                    )}
                    <div>
                        {!isMobile && (
                            <StyledWorkPopupFieldLabel isShortPadding>
                                Start Date (Optional)
                            </StyledWorkPopupFieldLabel>
                        )}
                        <DropDown
                            option={{
                                value: fieldStartDateMonth.value,
                                label: fieldStartDateMonth.value,
                            }}
                            onSelect={option =>
                                handleSelectStartMonth(option.value)
                            }
                            errorOutside={fieldStartDateMonth.error?.message}
                            options={monthsList}
                            placeholder="Month"
                            isDefaultView
                            isNotSelectedErrorMessage={false}
                        />
                    </div>
                    <div>
                        <StyledWorkPopupFieldLabel isShortPadding />
                        <DropDown
                            option={{
                                value: fieldStartDateYear.value,
                                label: fieldStartDateYear.value,
                            }}
                            onSelect={option =>
                                handleSelectStartYear(option.value)
                            }
                            errorOutside={fieldStartDateYear.error?.message}
                            options={yearsList}
                            placeholder="Year"
                            isDefaultView
                            isNotSelectedErrorMessage={false}
                        />
                    </div>
                </fieldset>
            </StyledWorkPopupRow>
            <StyledWorkPopupRow className="padding-right">
                <StyledWorkPopupFieldLabel isShortPadding>
                    Project Description (Optional)
                </StyledWorkPopupFieldLabel>
                <TextareaOld
                    {...fieldProjectDescription}
                    error={fieldProjectDescription.error?.message}
                    placeholder="Managed media spend across key digital channels, resulting in.... "
                    wrapperClassName="textarea-wrapper"
                    maxLength={2000}
                />
            </StyledWorkPopupRow>
            <StyledWorkPopupRow className="padding-right">
                <StyledWorkPopupFieldLabel isShortPadding>
                    Client Testimonial (Optional)
                </StyledWorkPopupFieldLabel>
                <TextareaOld
                    {...fieldClientTestimonial}
                    error={fieldClientTestimonial.error?.message}
                    placeholder="“We couldn’t be happier with the results achieved by our Paid Media agency...”"
                    wrapperClassName="textarea-wrapper"
                    maxLength={2000}
                />
            </StyledWorkPopupRow>
            <StyledWorkPopupRow className="padding-right">
                <StyledWorkPopupFieldLabel isShortPadding>
                    Link (Optional)
                </StyledWorkPopupFieldLabel>
                <InputOld
                    {...fieldLink}
                    error={fieldLink.error?.message}
                    placeholder="www.myportfolio.com"
                    className="link-input"
                    maxLength={2000}
                />
            </StyledWorkPopupRow>
            <StyledWorkPopupRow>
                <StyledWorkPopupFieldLabel>
                    Documents (Optional)
                </StyledWorkPopupFieldLabel>
                <Dropzone
                    disabled={fieldDocuments.value.length >= 5}
                    tip={DEFAULT_UPLOAD_TEXT_SIZE}
                    onChange={handleChangeDropzone}
                    uploading={uploading}
                >
                    {!!fieldDocuments.value.length && (
                        <div className="files-wrapper">
                            {fieldDocuments.value.map(item => (
                                <File
                                    key={item.id}
                                    name={item.title}
                                    link={item.link}
                                    onRemove={() => handleDeleteLink(item.id)}
                                />
                            ))}
                        </div>
                    )}
                </Dropzone>
            </StyledWorkPopupRow>
            <WorkPopupControl
                onSave={handleSaveData}
                onCancel={onClose}
                isDisabledSave={!isValidForm || uploading}
            />
        </StyledFormPastWork>
    );
};
