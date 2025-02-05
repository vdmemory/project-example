import { FileIcon, PdfIcon } from '@breef/shared/assets';

export const getBrandDocumentIcon = (linkTitle: string) => {
    const linkType = linkTitle.split('.');

    if (linkType[linkType.length - 1] === 'pdf') {
        return <PdfIcon className="pdf-icon" data-testid="pdf-icon" />;
    }
    if (linkType[linkType.length - 1] === 'doc') {
        return <FileIcon className="pdf-icon" data-testid="file-icon" />;
    }
    if (linkType[linkType.length - 1] === 'docx') {
        return <FileIcon className="pdf-icon" data-testid="file-icon" />;
    }
    return null;
};
