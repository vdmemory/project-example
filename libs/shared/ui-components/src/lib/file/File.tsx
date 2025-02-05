import React, { FC, SyntheticEvent } from 'react';
import { StyledFile } from './File.styled';
import { fileImage } from '@breef/shared/assets';
import TrashIconButton from '../button/trashIconButton/TrashIconButton';
import { linkClick } from '@breef/shared/utils';
import { iconDocument, iconImage } from '@breef/ui-kit';

interface FileProps {
    name: string;
    link?: string;
    onRemove?: () => void;
    showIcon?: boolean;
    size?: 'small';
}
export const File: FC<FileProps> = ({
    name,
    onRemove,
    link,
    showIcon,
    size,
}) => {
    const openFile = () => link && linkClick(link);
    const handleRemove = (e: SyntheticEvent) => {
        e.stopPropagation();
        onRemove?.();
    };

    const renderIcon = () => {
        const regExpDoc = /\.(doc|docx)/;
        const regExpPdf = /\.(pdf)/;

        if (name.match(regExpDoc) || link?.match(regExpDoc)) {
            return <img src={iconDocument.src} alt="File" data-testid="doc" />;
        }
        if (name.match(regExpPdf) || link?.match(regExpPdf)) {
            return <img src={iconImage.src} alt="File" data-testid="pdf" />;
        }

        return <img src={iconImage.src} alt="File" data-testid="default" />;
    };

    return (
        <StyledFile
            className="file-item"
            onClick={openFile}
            isLink={!!link}
            size={size}
        >
            {showIcon && renderIcon()}
            {!showIcon && <img src={fileImage.src} alt="File" />}
            <span>{name}</span>
            {onRemove && <TrashIconButton onClick={handleRemove} />}
        </StyledFile>
    );
};

export default File;
