import { EditMidIcon } from '@breef/shared/assets';
import {
    colors,
    FolderIcon,
    FolderMobileIcon,
    MoneyCoinsIcon,
    TrashIcon,
} from '@breef/ui-kit';
import styled from '@emotion/styled';
import { File } from '../file/File';
import { StyledWorkCard } from './WorkCard.styled';
import { urlToDefaultFormat } from '@breef/shared/utils';
import { useMediaContext } from '@breef/shared/hooks';
import { Fragment } from 'react';

export const StyledProjectLink = styled.a`
    font-size: 16px;
    font-weight: 450;
    -webkit-text-stroke-width: 0.2px;
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
export enum WorkImage {
    Folder = 'folder',
    Coins = 'coins',
}
export enum RateEnum {
    OneTime = 'oneTime',
    Ongoing = 'ongoing',
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

export const WorkCard = ({
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
    const { isMobile } = useMediaContext();
    const cardClassName = className ? `work-card ${className}` : 'work-card';

    const handleEdit = () => onClick?.('edit');
    const handleRemove = () => onClick?.('remove');

    const isViewDocument = !!documents && !!documents.length;
    const isViewProjectLinks = !!projectLinks && !!projectLinks.length;

    const renderIcon = () => {
        if (imageType === WorkImage.Folder) {
            if (isMobile) {
                return <FolderMobileIcon className="folder" />;
            }
            return <FolderIcon className="folder" />;
        }
        return <MoneyCoinsIcon className="coins" />;
    };

    const renderTitleLast = () =>
        titleLast && <h4 title={titleLast}>{titleLast}</h4>;

    const renderTitleFirst = () => <h4 title={titleFirst}>{titleFirst}</h4>;

    return (
        <StyledWorkCard className={cardClassName}>
            <div className="title">
                {renderIcon()}
                <div className="group">
                    {!isMobile ? (
                        <span className="wrapper">
                            {renderTitleFirst()}
                            {titleLast && (
                                <span className="title-divider">•</span>
                            )}
                            {renderTitleLast()}
                        </span>
                    ) : (
                        renderTitleLast()
                    )}
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
            <div className="content-work-wrapper">
                {isMobile && renderTitleFirst()}
                {rate && (
                    <div className="rate">
                        {rate.price}
                        <span className="rate-divider">•</span>
                        {rate.type}
                    </div>
                )}
                {description && (
                    <div className="description">{description}</div>
                )}
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
            </div>
        </StyledWorkCard>
    );
};

interface ProjectLinkProps {
    title: string;
    url: string;
}

export const ProjectLink = ({ title, url }: ProjectLinkProps) => (
    <StyledProjectLink
        href={url}
        target="_blank"
        rel="noreferrer"
        className="review-link"
    >
        {title}
    </StyledProjectLink>
);
