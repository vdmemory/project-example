import { StyledDropzone, StyledDropzoneWrapper } from './DropzoneOld.styled';
import { ReactNode, useCallback } from 'react';
import { useDropzone, ErrorCode, FileError } from 'react-dropzone';
import {
    getFileTypeErrorMessage,
    MAX_DOCUMENT_SIZE_UPLOAD,
    TYPE_FILE_DOC,
    TYPE_FILE_DOCX,
    TYPE_FILE_JPEG,
    TYPE_FILE_JPG,
    TYPE_FILE_PDF,
    TYPE_FILE_PNG,
} from '@breef/shared/constants';
import { CautionIcon, UploadIcon } from '@breef/shared/assets';
import { useMediaContext } from '@breef/shared/hooks';

export const getAccept = (type?: string): Record<string, string[]> => {
    if (type === 'only-pdf') {
        return {
            [TYPE_FILE_PDF]: ['.pdf'],
        };
    }

    if (type === 'all') {
        return {
            [TYPE_FILE_PDF]: ['.pdf'],
            [TYPE_FILE_DOC]: ['.doc', '.docx'],
            [TYPE_FILE_DOCX]: ['.docx'],
            [TYPE_FILE_PNG]: ['.png'],
            [TYPE_FILE_JPG]: ['.jpg'],
            [TYPE_FILE_JPEG]: ['.jpeg'],
        };
    }

    return {
        [TYPE_FILE_PDF]: ['.pdf'],
        [TYPE_FILE_DOC]: ['.doc', '.docx'],
        [TYPE_FILE_DOCX]: ['.docx'],
    };
};

export const renderError = (
    error: FileError,
    acceptFileTypes?: 'all' | 'only-pdf',
) => {
    if (error.code === ErrorCode.FileInvalidType) {
        return getFileTypeErrorMessage(acceptFileTypes);
    }
    if (error.code === ErrorCode.FileTooLarge) {
        return `File is too large. Max size is ${Math.round(
            MAX_DOCUMENT_SIZE_UPLOAD / 1000000,
        )}MB`;
    }
    return error.message;
};

interface DropzoneProps {
    placeholder?: string;
    mobilePlaceholder?: string;
    acceptPlaceholder?: string;
    rejectPlaceholder?: string;
    tip?: string | ReactNode;
    icon?: boolean;
    onChange?: (files: File[]) => void;
    disabled?: boolean;
    acceptFileTypes?: 'all' | 'only-pdf';
    iconImg?: React.ReactNode;
    uploading?: boolean;
}

export const DropzoneOld = ({
    placeholder = "Drag 'n' drop some files here, or click to select files",
    mobilePlaceholder = 'Upload',
    acceptPlaceholder = 'All files will be accepted',
    rejectPlaceholder = 'Some files will be rejected',
    tip,
    icon = true,
    onChange,
    disabled = false,
    acceptFileTypes,
    iconImg,
    uploading,
}: DropzoneProps) => {
    const { isMobile } = useMediaContext();
    const onDropAccepted = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (acceptedFiles: any[]) => {
            onChange && onChange(acceptedFiles);
            acceptedFiles.length = 0;
            acceptedFiles.splice(0, acceptedFiles.length);
            if (inputRef.current !== null) {
                inputRef.current.value = '';
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [onChange],
    );

    const {
        fileRejections,
        getRootProps,
        getInputProps,
        isDragActive,
        isFocused,
        isDragAccept,
        isDragReject,
        inputRef,
    } = useDropzone({
        onDropAccepted,
        noClick: true,
        maxFiles: 1,
        maxSize: MAX_DOCUMENT_SIZE_UPLOAD,
        accept: getAccept(acceptFileTypes),
        disabled: disabled,
    });

    const fileRejectionErrors = fileRejections.length && (
        <ul className="list-error-message">
            <li
                className="error-message"
                key={fileRejections[0].errors[0].code}
            >
                <CautionIcon />
                {renderError(fileRejections[0]?.errors[0], acceptFileTypes)}
            </li>
        </ul>
    );

    const renderPlaceholder = () => {
        if (uploading) return <p className="label-drop">Loading...</p>;
        if (isDragAccept)
            return <p className="label-drop">{acceptPlaceholder}</p>;
        if (isDragReject)
            return <p className="label-drop">{rejectPlaceholder}</p>;
        if (!isDragActive)
            return (
                <p className="label-drop">
                    {!isMobile ? placeholder : mobilePlaceholder}
                </p>
            );
        return null;
    };

    return (
        <StyledDropzoneWrapper
            className={
                disabled
                    ? 'dropzone-wrapper dropzone-wrapper--disabled'
                    : 'dropzone-wrapper'
            }
        >
            <StyledDropzone
                {...getRootProps({
                    className: 'dropzone',
                    isFocused,
                    isDragAccept,
                    isDragReject,
                })}
                isDisabled={disabled}
            >
                {icon && (
                    <div className="wrap-icon-upload">
                        {iconImg ?? <UploadIcon className="icon-upload-drop" />}
                    </div>
                )}
                {renderPlaceholder()}
                <input disabled={disabled} {...getInputProps()} />
            </StyledDropzone>

            {tip && !fileRejections.length ? (
                <p className="tip-drop">{tip}</p>
            ) : null}
            {fileRejections.length ? fileRejectionErrors : null}
        </StyledDropzoneWrapper>
    );
};

export default DropzoneOld;
