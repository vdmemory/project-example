import React from 'react';
import { StyledFileComponent } from './FileComponent.styled';
import { CloseIcon, FileIconBig } from '@breef/shared/assets';
import Spinner from '../../../spinner/Spinner';

interface FileComponentProps {
    isLoading?: boolean;
    name?: string;
    link?: string;
    onRemove?: () => void;
    isDisableRemove?: boolean;
}

export const FileComponent = ({
    isLoading = false,
    name,
    link,
    onRemove,
    isDisableRemove = false,
}: FileComponentProps) => (
    <StyledFileComponent isDisableRemove={isDisableRemove}>
        {!isLoading ? (
            <>
                <div className="file-image-wrapper">
                    <FileIconBig />
                </div>
                <div className="file-info-wrapper">
                    {link ? (
                        <a href={link} target="_blank" rel="noreferrer">
                            {name}
                        </a>
                    ) : (
                        <span>{name}</span>
                    )}

                    <button
                        data-testid="remove-button"
                        className="remove-button"
                        onClick={onRemove}
                        disabled={isDisableRemove}
                    >
                        <CloseIcon />
                    </button>
                </div>
            </>
        ) : (
            <Spinner data-testid="loading-spinner" />
        )}
    </StyledFileComponent>
);

export default FileComponent;
