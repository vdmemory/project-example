import {
    StyledReviewProjectCreation,
    StyledTag,
} from './ReviewProjectCreation.styled';
import { FC, ReactNode, useEffect } from 'react';
import { Location16x16Icon, TooltipTinyIcon } from '@breef/shared/assets';
import ReviewSection from './reviewSection/ReviewSection';
import { Button, Pill } from '@breef/ui-kit';
import {
    PenButton,
    ReviewBlock,
    StyledDivider,
} from './reviewBlock/ReviewBlock';
import {
    BudgetType,
    listProjectStartDay,
    PenNavNames,
    ProjectStep,
} from '@breef/shared/constants';
import {
    getProjectTitleUsingSkills,
    urlToDefaultFormat,
} from '@breef/shared/utils';
import { BrandLeadFullType } from '@breef/shared/types';
import { FileItem } from '../fileItem/FileItem';
import LinkItem from '../linkItem/LinkItem';
import Tooltip from '../tooltip/Tooltip';
import { useMediaContext } from '@breef/shared/hooks';

export type ProjectReviewType = {
    name: string;
    agencyLocation: string;
    openToRemoteAgencies: boolean;
    startDay: string | null;
    submissionDeadline?: string;
    companyName: string;
    companyWebsite: string;
    companyLocation: string;
    companyDescription: string;
    budgetRange: string;
    budgetType: BudgetType;
    socialLinks: { title: string; link?: string | null }[];
    brandLinks: { link: string; title: string }[];
    agencyTags: { id: number; name: string }[];
    agenciesAdvantages?: { id: number; name: string }[];
    description: string;
    agencySkills: {
        id: number;
        name: string;
        note: string;
    }[];
    files: { id: number | string; link: string; title: string }[];
    idealAgencyDescription?: string;
    isNameEditLocked?: boolean;
};

export interface ReviewProjectCreationProps {
    data: ProjectReviewType;
    brandLead?: BrandLeadFullType | null;
    budgetTooltip?: string;
    onEdit?: (step: ProjectStep, elementId?: string) => void;
    className?: string;
}

export const ReviewProjectCreation: FC<ReviewProjectCreationProps> = ({
    data,
    onEdit,
    brandLead,
    budgetTooltip,
    className,
}) => {
    const { isMobile } = useMediaContext();
    const {
        name,
        agencySkills,
        description,
        agencyLocation,
        companyLocation,
        agencyTags,
        companyWebsite,
        companyDescription,
        companyName,
        idealAgencyDescription,
        openToRemoteAgencies,
        brandLinks,
        agenciesAdvantages,
        budgetRange,
        budgetType,
        files,
        startDay,
        isNameEditLocked = true,
    } = data;

    const splitAndCapitalize = (str: string) =>
        str
            .split('_')
            .map((item: string) => item.charAt(0).toUpperCase() + item.slice(1))
            .join(' ');

    const replaceK = (str: string) =>
        str.replace(/(\d+(.\d)?)k/g, ' $$$1K ').trim();

    const budgetNormalized = `${
        budgetRange ? replaceK(budgetRange) + ', ' : ''
    }${budgetType ? splitAndCapitalize(budgetType) : ''}`;

    const startDayNormalized =
        listProjectStartDay.find(item => item.value === startDay)?.label ?? '';
    const agencyLocationNormalized = openToRemoteAgencies
        ? 'Anywhere'
        : agencyLocation;

    const renderKeyInfo = ({
        title,
        value,
        children,
        isWider,
        tooltipText,
        isHoverTipTitle,
    }: {
        title: string;
        value: string;
        children?: ReactNode;
        isWider?: boolean;
        tooltipText?: string;
        isHoverTipTitle?: boolean;
    }) => (
        <div
            className={`${isWider ? 'key-info-item-wider ' : ''}key-info-item`}
        >
            <div className="title-wrapper">
                <span
                    className="title"
                    title={isHoverTipTitle ? title : undefined}
                >
                    {title}
                </span>
                {tooltipText && (
                    <Tooltip
                        placement={isMobile ? 'right' : 'top'}
                        className="tooltip"
                        label={tooltipText}
                        customStyle={{
                            borderRadius: '2px',
                            background: 'white',
                        }}
                        borderColor="rgba(218, 108, 55, 1)"
                    >
                        <TooltipTinyIcon className="tooltip-icon" />
                    </Tooltip>
                )}
            </div>
            <span className="value">{value}</span>
            <span className="value-children">{children}</span>
        </div>
    );

    const renderFiles = () => (
        <div className="files-wrapper">
            {files.map(item => (
                <FileItem key={item.id} title={item.title} link={item.link} />
            ))}
        </div>
    );

    const renderLinks = () => (
        <div className="links-wrapper">
            {brandLinks.map((item, idx) => (
                <LinkItem key={`${item.title}-${idx}`} {...item} />
            ))}
        </div>
    );

    const renderSkill = ({ id, name, note }: Skill) => (
        <div key={id} className="skill-wrapper">
            <Pill label={name} color="orange" isStatic isResizeMobile={false} />
            {note && <p>{note}</p>}
        </div>
    );

    const onEditProjectInfo = () =>
        onEdit?.(ProjectStep.PROJECT_SCOPE, PenNavNames.AGENCY_SKILLS_FIELD);
    const onEditCompanyDetails = () =>
        onEdit?.(
            ProjectStep.COMPANY_DETAILS,
            PenNavNames.COMPANY_DESCRIPTION_FIELD,
        );
    const onEditProjectOverview = () =>
        onEdit?.(
            ProjectStep.PERSONALIZE_SCOPE,
            PenNavNames.PROJECT_OVERVIEW_FILED,
        );
    const onEditAgencySkills = () =>
        onEdit?.(
            ProjectStep.PERSONALIZE_SCOPE,
            PenNavNames.AGENCY_SKILLS_FIELD,
        );
    const onEditAgencyPreferences = () =>
        onEdit?.(
            ProjectStep.AGENCY_PREFERENCES,
            PenNavNames.AGENCY_PREFERENCES_FIELD,
        );

    const isCompanyKeyInfo =
        !!companyName || !!companyLocation || !!companyWebsite;
    const isBudgetKeyInfo = !!budgetRange || !!budgetType;
    const isStartdayKeyInfo = !!startDayNormalized;
    const isAgencyLocationKeyInfo = !!agencyLocationNormalized;
    const isProjectKeyInfo =
        isCompanyKeyInfo ||
        isBudgetKeyInfo ||
        isStartdayKeyInfo ||
        isAgencyLocationKeyInfo ||
        !!onEdit;
    const isCompanyDetailsSection = !!companyDescription || !!onEdit;
    const isProjectOverviewSection =
        !!description ||
        files.length !== 0 ||
        brandLinks.length !== 0 ||
        !!onEdit;
    const isAgencySkillsSection = agencySkills.length !== 0 || !!onEdit;
    const isAgencyPreferencesSection =
        !!agencyLocationNormalized ||
        !!idealAgencyDescription ||
        agencyTags.length !== 0 ||
        (agenciesAdvantages && agenciesAdvantages.length !== 0) ||
        !!onEdit;

    const renderWebsite = (website: string) => {
        if (!website) {
            return <span className="website-link-disabled">Website</span>;
        }

        return (
            <a
                className="website-link"
                href={urlToDefaultFormat(website)}
                target="_blank"
            >
                Website
            </a>
        );
    };

    return (
        <StyledReviewProjectCreation
            className={className ? `${className} review-scope` : 'review-scope'}
        >
            <div className="header-section">
                <h1 id="project-title">
                    {isNameEditLocked
                        ? name
                        : getProjectTitleUsingSkills(agencySkills)}
                </h1>
            </div>
            {isProjectKeyInfo && (
                <div className="project-key-info-wrapper">
                    <div className="project-key-info-content">
                        {isCompanyKeyInfo &&
                            renderKeyInfo({
                                title: companyName,
                                value: companyLocation,
                                children: renderWebsite(companyWebsite),
                                isWider: true,
                                isHoverTipTitle: true,
                            })}
                        {isBudgetKeyInfo &&
                            renderKeyInfo({
                                title: 'Budget',
                                value: budgetNormalized,
                                tooltipText: budgetTooltip,
                            })}
                        {isStartdayKeyInfo &&
                            renderKeyInfo({
                                title: 'Project Kickoff',
                                value: startDayNormalized,
                            })}
                        {isAgencyLocationKeyInfo &&
                            renderKeyInfo({
                                title: 'Agency Location',
                                value: agencyLocationNormalized,
                            })}
                    </div>
                    {onEdit && (
                        <PenButton
                            className="pen-button"
                            onClick={onEditProjectInfo}
                        />
                    )}
                </div>
            )}
            {isCompanyDetailsSection && (
                <ReviewBlock onEdit={onEdit && onEditCompanyDetails}>
                    <ReviewSection title="Company Details">
                        <p>{companyDescription}</p>
                    </ReviewSection>
                </ReviewBlock>
            )}
            {isProjectOverviewSection && (
                <ReviewBlock onEdit={onEdit && onEditProjectOverview}>
                    <ReviewSection title="Project Overview">
                        <p>{description}</p>
                        {files.length !== 0 && renderFiles()}
                        {brandLinks.length !== 0 && renderLinks()}
                    </ReviewSection>
                </ReviewBlock>
            )}
            {isAgencySkillsSection && (
                <ReviewBlock onEdit={onEdit && onEditAgencySkills}>
                    <ReviewSection title="Agency Skills">
                        {agencySkills.map(renderSkill)}
                    </ReviewSection>
                </ReviewBlock>
            )}
            {isAgencyPreferencesSection && (
                <ReviewBlock onEdit={onEdit && onEditAgencyPreferences}>
                    <ReviewSection title="Agency Preferences">
                        <div className="tags-wrapper">
                            <StyledTag>
                                <Location16x16Icon />
                                {`Location: ${
                                    agencyLocationNormalized || 'Not selected'
                                }`}
                            </StyledTag>
                            {agencyTags.map(item => (
                                <StyledTag
                                    key={'agency-tag-' + item.id}
                                    title={item.name}
                                />
                            ))}
                            {agenciesAdvantages?.map(item => (
                                <StyledTag
                                    key={'agency-advantage-' + item.id}
                                    title={item.name}
                                />
                            ))}
                        </div>
                        {idealAgencyDescription && (
                            <p className="ideal-agency-description">
                                {idealAgencyDescription}
                            </p>
                        )}
                    </ReviewSection>
                </ReviewBlock>
            )}
        </StyledReviewProjectCreation>
    );
};

type Skill = {
    id: number;
    name: string;
    note: string;
};
