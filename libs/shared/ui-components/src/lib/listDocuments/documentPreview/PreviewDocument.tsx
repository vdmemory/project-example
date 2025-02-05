import { DownloadInvoiceIcon } from '@breef/shared/assets';
import { BrandLinksType } from '@breef/shared/types';
import PreviewImage from '../../previewImage/PreviewImage';

const getGoogleUrl = (link: string) => {
    const pathThumbnail = 'https://lh3.googleusercontent.com/d/';
    const id = link.split('d/')[1].replace(/\/.*/g, '');
    return `${pathThumbnail}${id}`;
};

export const PreviewDocument = ({
    item,
    isPreview,
    isGoogleDoc,
    children,
}: {
    item: BrandLinksType;
    isPreview?: boolean;
    isGoogleDoc?: boolean;
    children?: React.ReactNode;
}) => {
    const { title, link, thumbnail } = item;

    const view = isPreview || isGoogleDoc;

    const renderPreview = () => {
        if (isPreview && thumbnail)
            return (
                <PreviewImage data-testid="preview-image" link={thumbnail} />
            );
        if (isGoogleDoc)
            return (
                <PreviewImage
                    data-testid="google-preview-image"
                    link={getGoogleUrl(link)}
                />
            );
        return null;
    };

    return (
        <div className={`card-documents-link ${view ? 'preview' : ''}`}>
            {children}
            <a
                onClick={e => {
                    e.stopPropagation();
                }}
                data-testid="link"
                className={`card-documents-item ${view ? 'preview' : ''}`}
                href={link}
                target="_blank"
                rel="noreferrer"
            >
                {renderPreview()}
                <span>
                    <p>{title}</p>
                    {view ? (
                        <DownloadInvoiceIcon data-testid="download-icon" />
                    ) : null}
                </span>
            </a>
        </div>
    );
};

export default PreviewDocument;
