import { colors, FileIcon } from '@breef/shared/assets';
import { mediaScreen, mediaScreenMin } from '@breef/shared/assets/variables';
import { BrandLinksType } from '@breef/shared/types';
import { getBrandDocumentIcon } from '@breef/shared/utils';
import styled from '@emotion/styled';
import PreviewDocument from './PreviewDocument';

const StyledBrandDocuments = styled.div`
    overflow: auto;
    width: 100%;

    .group-lines {
        display: flex;
        gap: 20px;

        @media screen and (${mediaScreen.tablet}) {
            flex-wrap: wrap;
            gap: 0;
        }
    }
    .group-blocks {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
    }
    .card-documents-link {
        display: flex;
        align-items: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 5px 0 10px;
        > svg {
            min-width: 30px;
            margin-left: -5px;
        }

        @media screen and (${mediaScreen.tablet}) {
            width: 100%;
            padding: 0;
        }
        &.preview {
            @media screen and (${mediaScreenMin.laptop}) {
                min-width: calc(100% / 2 - 25px);
            }
        }
    }
    .card-documents-item {
        display: block;
        align-items: center;
        color: #d96e34;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: ${colors.mainOrange};
        font-size: 18px;
        &-disabled {
            pointer-events: none;
            color: ${colors.mainGray};
        }
        @media screen and (${mediaScreenMin.laptop}) {
            flex: 1;
        }
        @media screen and (${mediaScreen.maxMobile}) {
            flex: 1;
        }
    }
    .card-documents-item.preview {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        > span {
            display: flex;
            gap: 5px;
            > p {
                margin: 0;
                max-width: 365px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
    @media screen and (${mediaScreen.tablet}) {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
`;

const StyledBrandDocumentsList = styled.div`
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;

    .card-documents-link {
        display: flex;
        align-items: center;
        width: auto;
        margin-right: 15px;
        padding: 0 0 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        > svg {
            margin-right: 17px;
            min-width: 38px;
            min-height: 38px;
            max-width: 38px;
            max-height: 38px;
        }
        &:hover > a {
            cursor: pointer;
            pointer-events: initial;
        }
    }
    .card-documents-item {
        display: block;
        align-items: center;
        color: #d96e34;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: ${colors.mainOrange};
        font-size: 18px;
        &-disabled {
            pointer-events: none;
            color: ${colors.mainGray};
        }
    }
`;

const PDF_FILE = '.pdf';
const GOOGLE_DRIVE = 'drive.google.com';
const GOOGLE_DOCS = 'docs.google.com';

export const BrandDocuments = ({
    documents,
    mode = 'list',
}: {
    documents: BrandLinksType[];
    mode?: 'list' | 'preview';
}) => {
    if (!documents.length) return null;

    const renderListMode = () => {
        return (
            <StyledBrandDocumentsList data-testid="list-mode">
                {documents.map(({ link, title, type }, idx) => (
                    <div key={`brand-${idx}`} className="card-documents-link">
                        {type === 'file' && getBrandDocumentIcon(title)}

                        <a
                            onClick={e => {
                                e.stopPropagation();
                            }}
                            data-testid="link"
                            className={
                                link
                                    ? 'card-documents-item'
                                    : 'card-documents-item card-documents-item-disabled'
                            }
                            key={`${title}-${idx}`}
                            href={link ? link : undefined}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {title}
                        </a>
                    </div>
                ))}
            </StyledBrandDocumentsList>
        );
    };

    const renderPreviewMode = () => {
        const pdfList = documents.filter(
            item => item.type === 'file' && item.title.includes(PDF_FILE),
        );

        const docList = documents.filter(
            item => item.type === 'file' && !item.title.includes(PDF_FILE),
        );

        const googleDocList = documents.filter(
            item =>
                item.type === 'link' &&
                (item.link.includes(GOOGLE_DRIVE) ||
                    item.link.includes(GOOGLE_DOCS)),
        );

        const linkList = documents.filter(
            item =>
                item.type === 'link' &&
                !item.link.includes(GOOGLE_DRIVE) &&
                !item.link.includes(GOOGLE_DOCS),
        );

        return (
            <StyledBrandDocuments data-testid="preview-mode">
                <div className="group-lines">
                    {linkList.map((item, index) => (
                        <PreviewDocument
                            key={`link-list-${index}`}
                            item={item}
                        />
                    ))}
                    {docList.map((item, index) => (
                        <PreviewDocument key={`doc-list-${index}`} item={item}>
                            <FileIcon
                                className="doc-icon"
                                data-testid="file-icon"
                            />
                        </PreviewDocument>
                    ))}
                </div>
                <div className="group-blocks">
                    {googleDocList.map((item, index) => (
                        <PreviewDocument
                            isGoogleDoc
                            key={`google-doc-list-${index}`}
                            item={item}
                        />
                    ))}
                    {pdfList.map((item, index) => (
                        <PreviewDocument
                            isPreview
                            key={`pdf-list-${index}`}
                            item={item}
                        />
                    ))}
                </div>
            </StyledBrandDocuments>
        );
    };

    if (mode === 'list') return renderListMode();
    if (mode === 'preview') return renderPreviewMode();
    return null;
};
