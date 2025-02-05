import { StyledDocumentPreviewer } from './DocumentPreviewer.styled';
import React from 'react';
import { DownloadIcon, FileIconBig } from '@breef/shared/assets';

interface DocumentPreviewerProps {
    label: string;
    link?: string;
    imageUrl?: string;
    isIcon?: boolean;
}

export const DocumentPreviewer: React.FC<DocumentPreviewerProps> = ({
    label,
    link,
    imageUrl,
    isIcon = true,
}) => {
    return (
        <StyledDocumentPreviewer className="document-previewer">
            <div className="preview-image-wrapper">
                {/*TODO: when preview mode - uncomment */}
                {/* {imageUrl ? <PreviewImage link={imageUrl} /> : null} */}
                <FileIconBig />
            </div>
            <div className="document-info-wrapper">
                {link ? (
                    <>
                        <a href={link} target="_blank" rel="noreferrer">
                            {label}
                        </a>
                        {isIcon && (
                            <a href={link} target="_blank" rel="noreferrer">
                                <DownloadIcon />
                            </a>
                        )}
                    </>
                ) : (
                    <span>{label}</span>
                )}
            </div>
        </StyledDocumentPreviewer>
    );
};
