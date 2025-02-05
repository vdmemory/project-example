import { StyledFileItem } from './FileItem.styled';
import {
    DocFileTypeIcon,
    JpgFileTypeIcon,
    PdfFileTypeIcon,
    PngFileTypeIcon,
    UnknownFileTypeIcon,
} from '@breef/shared/assets';
import React, { FC } from 'react';
import button from '../button/Button';
import { TrashIcon } from '@breef/ui-kit';
import { urlToDefaultFormat } from '@breef/shared/utils';

interface FileItem {
    title: string;
    onRemove?: () => void;
    link?: string;
}
export const FileItem: FC<FileItem> = ({ title, onRemove, link }) => {
    const getHandleClick = () => {
        if (!link) {
            return;
        }
        return () => window.open(urlToDefaultFormat(link), '_blank');
    };

    const handleRemove = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        onRemove?.();
    };

    return (
        <StyledFileItem
            onClick={getHandleClick()}
            isClickable={!!link}
            title={title}
            data-testid="file-item"
        >
            {renderFileTypeIcon(title, link)}
            <span>{title}</span>
            {onRemove && (
                <button
                    onClick={handleRemove}
                    data-testid="remove-file-item-button"
                >
                    <TrashIcon />
                </button>
            )}
        </StyledFileItem>
    );
};

export const renderFileTypeIcon = (title: string, url?: string) => {
    const styles = {
        width: '18px',
        minWidth: '18px',
        height: '18px',
        marginLeft: '-1px',
    };

    const regExpDoc = /\.(doc|docx)/;
    const regExpPdf = /\.(pdf)/;
    const regExpJpg = /\.(jpg|jpeg)/;
    const regExpPng = /\.(png)/;

    if (title.match(regExpDoc) || url?.match(regExpDoc)) {
        return <DocFileTypeIcon style={styles} data-testid="doc-file-type" />;
    }
    if (title.match(regExpPdf) || url?.match(regExpPdf)) {
        return <PdfFileTypeIcon data-testid="pdf-file-type" />;
    }
    if (title.match(regExpJpg) || url?.match(regExpJpg)) {
        return <JpgFileTypeIcon data-testid="jpg-file-type" />;
    }
    if (title.match(regExpPng) || url?.match(regExpPng)) {
        return <PngFileTypeIcon data-testid="png-file-type" />;
    }
    return <UnknownFileTypeIcon data-testid="default-file-type" />;
};
