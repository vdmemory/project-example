import { FC, ReactNode, useCallback } from 'react';
import { StyledDropzone, StyledDropzoneContainer } from './Dropzone.styled';
import { CautionIcon, UploadRoundIcon } from '@breef/shared/assets';
import { useDropzone } from 'react-dropzone';
import { MAX_DOCUMENT_SIZE_UPLOAD } from '@breef/shared/constants';
import { getAcceptFileTypes } from './utils/getAcceptFileTypes';
import { getErrorMessage } from './utils/getErrorMessage';
import { DownloadUiIcon } from '@breef/ui-kit';
import { useMediaContext } from '@breef/shared/hooks';

interface DropzoneProps {
    acceptPlaceholder?: string;
    rejectPlaceholder?: string;
    tip?: string | ReactNode;
    onChange?: (files: File[]) => void;
    disabled?: boolean;
    acceptFileTypes?: 'all' | 'only-pdf';
    uploading?: boolean;
    className?: string;
    children?: ReactNode;
    isMobileView?: boolean;
}
export const Dropzone: FC<DropzoneProps> = ({
    acceptPlaceholder = 'All files will be accepted',
    rejectPlaceholder = 'Some files will be rejected',
    tip,
    onChange,
    disabled = false,
    acceptFileTypes,
    uploading = false,
    className,
    children,
    isMobileView = true,
}) => {
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
        isFocused,
        isDragAccept,
        isDragReject,
        inputRef,
    } = useDropzone({
        onDropAccepted,
        noClick: true,
        maxFiles: 1,
        maxSize: MAX_DOCUMENT_SIZE_UPLOAD,
        accept: getAcceptFileTypes(acceptFileTypes),
        disabled: disabled,
    });

    const fileRejectionErrors = fileRejections.length && (
        <ul className="list-error-message">
            <li
                className="error-message"
                key={fileRejections[0].errors[0].code}
            >
                <CautionIcon />
                {getErrorMessage(fileRejections[0]?.errors[0], acceptFileTypes)}
            </li>
        </ul>
    );

    const renderDropzoneBody = () => {
        if (uploading) return <p className="label-drop">Uploading...</p>;
        if (isDragAccept)
            return <p className="label-drop">{acceptPlaceholder}</p>;
        if (isDragReject)
            return <p className="label-drop">{rejectPlaceholder}</p>;
        return (
            <div className="wrap-upload-info">
                <UploadRoundIcon />
                <span>Upload here</span>
            </div>
        );
    };

    const renderUploadBody = () => {
        if (uploading) return <p className="label-drop">Uploading...</p>;
        return (
            <div className="wrap-upload-info">
                <DownloadUiIcon />
                <span>UPLOAD DOCUMENTS</span>
            </div>
        );
    };

    return (
        <StyledDropzone
            className={className ?? 'dropzone-wrapper'}
            isMobileView={isMobileView}
        >
            <StyledDropzoneContainer
                data-testid={'dropzone'}
                {...getRootProps({
                    className: 'dropzone',
                    isFocused,
                    isDragAccept,
                    isDragReject,
                })}
                isDisabled={disabled}
                isUploading={!!uploading}
                isMobileView={isMobileView}
            >
                {isMobile && isMobileView
                    ? renderUploadBody()
                    : renderDropzoneBody()}
                <input disabled={disabled || uploading} {...getInputProps()} />
            </StyledDropzoneContainer>
            {children}
            {tip && !fileRejections.length && (!isMobile || !isMobileView) && (
                <p className="tip-drop">{tip}</p>
            )}
            {!!fileRejections.length && fileRejectionErrors}
        </StyledDropzone>
    );
};

export default Dropzone;
