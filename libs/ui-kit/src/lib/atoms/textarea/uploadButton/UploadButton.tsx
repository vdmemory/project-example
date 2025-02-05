import { FC, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { MAX_DOCUMENT_SIZE_UPLOAD } from '@breef/shared/constants';
import { colors } from '../../../styles';
import styled from '@emotion/styled';
import { getAcceptFileTypes, getErrorUploadMessage } from '@breef/shared/utils';
import { css } from '@emotion/react';
import { AttachIcon } from '../../../icons';

interface UploadButtonProps {
    onChange: (files: File[]) => void;
    setError: (value: string) => void;
    disabled?: boolean;
}
export const UploadButton: FC<UploadButtonProps> = ({
    onChange,
    setError,
    disabled = false,
}) => {
    const onDropAccepted = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (acceptedFiles: any[]) => {
            onChange && onChange(acceptedFiles);
            if (inputRef.current !== null) {
                inputRef.current.value = '';
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [onChange],
    );

    const { fileRejections, getInputProps, inputRef } = useDropzone({
        onDropAccepted,
        noClick: true,
        maxFiles: 1,
        maxSize: MAX_DOCUMENT_SIZE_UPLOAD,
        accept: getAcceptFileTypes(),
        disabled: false,
    });

    useEffect(() => {
        const error = fileRejections[0]?.errors[0];
        const message = error ? getErrorUploadMessage(error) : '';
        setError(message);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fileRejections.length]);

    return (
        <StyledAttachButton disabled={disabled} data-testid={`upload-button`}>
            <AttachIcon />
            <input disabled={disabled} {...getInputProps()} />
        </StyledAttachButton>
    );
};

interface StyledAttachButtonProps {
    disabled: boolean;
}
const StyledAttachButton = styled.label<StyledAttachButtonProps>`
    position: absolute;
    bottom: 12px;
    right: 12px;
    z-index: 10;
    cursor: pointer;

    ${({ disabled }) =>
        disabled &&
        css`
            svg path {
                fill: ${colors.grey.grey300};
            }
        `};

    input {
        display: none;
    }
`;
