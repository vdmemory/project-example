import { EditMidIcon } from '@breef/shared/assets';
import { colors, FolderIcon, MoneyCoinsIcon, TrashIcon } from '@breef/ui-kit';
import styled from '@emotion/styled';
import { File } from '../file/File';
import { urlToDefaultFormat } from '@breef/shared/utils';
import { StyledWorkCardOld } from './WorkCardOld.styled';

const StyledProjectLink = styled.a`
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0em;
    margin: 0;
    font-family: 'Helvetica Neue', sans-serif;
    color: ${colors.primary.primary500};
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        text-decoration: underline;
    }
`;
enum WorkImage {
    Folder = 'folder',
    Coins = 'coins',
}

interface WorkCardProps {
    className?: string;
    workData: {
        titleFirst: string;
        titleLast?: string;
        website?: string;
        description?: string;
        documents?: { id: number | string; title: string; link: string }[];
        projectLinks?: { title: string; link: string }[];
        rate?: {
            price: string;
            type: string;
        };
    };
    onClick?: (mode: 'remove' | 'edit') => void;
    imageType?: WorkImage;
    isRemoveButton?: boolean;
}

export const WorkCardOld = ({
    className,
    workData: {
        titleFirst,
        titleLast,
        description,
        projectLinks,
        documents,
        rate,
    },
    onClick,
    imageType = WorkImage.Folder,
    isRemoveButton = true,
}: WorkCardProps) => {
    const cardClassName = className ? `work-card ${className}` : 'work-card';

    const handleEdit = () => onClick?.('edit');
    const handleRemove = () => onClick?.('remove');

    const isViewDocument = !!documents && !!documents.length;
    const isViewProjectLinks = !!projectLinks && !!projectLinks.length;

    const renderIcon = () => {
        if (imageType === WorkImage.Folder) {
            return <FolderIcon className="folder" />;
        }
        return <MoneyCoinsIcon className="coins" />;
    };

    return (
        <StyledWorkCardOld className={cardClassName}>
            <div className="title">
                {renderIcon()}
                <div className="group">
                    <span className="wrapper">
                        <h4 title={titleFirst}>{titleFirst}</h4>
                        {titleLast && <span className="title-divider">•</span>}
                    </span>
                    {titleLast && <h4 title={titleLast}>{titleLast}</h4>}
                </div>

                {!!onClick && (
                    <div className="group-btn">
                        <EditMidIcon
                            className="edit-button"
                            role="button"
                            onClick={handleEdit}
                        />
                        {isRemoveButton && (
                            <TrashIcon
                                className="trash-button"
                                role="button"
                                onClick={handleRemove}
                            />
                        )}
                    </div>
                )}
            </div>
            {rate && (
                <div className="rate">
                    {rate.price}
                    <span className="rate-divider">•</span>
                    {rate.type}
                </div>
            )}
            {description && <div className="description">{description}</div>}
            {isViewProjectLinks && (
                <div className="project-links-wrapper">
                    {projectLinks.map(({ title, link }, index) => (
                        <ProjectLink
                            title={title}
                            url={urlToDefaultFormat(link)}
                            key={title + index}
                        />
                    ))}
                </div>
            )}
            {isViewDocument && (
                <div className="documents-wrapper">
                    {documents.map(file => (
                        <File
                            showIcon
                            key={file.id}
                            name={file.title}
                            link={file.link}
                            size="small"
                        />
                    ))}
                </div>
            )}
        </StyledWorkCardOld>
    );
};

interface ProjectLinkProps {
    title: string;
    url: string;
}

const ProjectLink = ({ title, url }: ProjectLinkProps) => (
    <StyledProjectLink
        href={url}
        target="_blank"
        rel="noreferrer"
        className="review-link"
    >
        {title}
    </StyledProjectLink>
);
