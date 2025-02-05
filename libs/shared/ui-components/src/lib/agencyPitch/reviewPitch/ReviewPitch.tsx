import { Fragment, ReactNode } from 'react';
import {
    defaultSocialLinkTitles,
    listExperience,
    PitchStep,
} from '@breef/shared/constants';
import { PitchData } from '@breef/shared/types';
import { LocationSmallIcon } from '@breef/shared/assets';
import { getLink, urlToDefaultFormat } from '@breef/shared/utils';
import {
    AvatarImage,
    colors,
    InstagramOrangeIcon,
    OutsideBudgetIcon,
    Pill,
    PortfolioOrangeIcon,
    WebsiteOrangeIcon,
    WithinBudgetIcon,
} from '@breef/ui-kit';
import { useMediaContext } from '@breef/shared/hooks';
import ReviewScopeCard, {
    StyledReviewScopeText,
} from '../../reviewCard/ReviewScopeCard';
import { File } from '../../file/File';
import { WorkCard, WorkCardOld } from '../../../index';
import {
    StyledReviewPitch,
    StyledColoredTag,
    StyledNotAddedYet,
} from './ReviewPitch.styled';
import styled from '@emotion/styled';

interface ReviewProjectProps {
    className?: string;
    pitchData: PitchData;
    onEditStep?: (step: PitchStep, elementId?: string) => void;
}
export const ReviewPitch = ({
    className,
    pitchData,
    onEditStep,
}: ReviewProjectProps) => {
    const {
        companyLogo,
        budget,
        tagline,
        instagram,
        portfolio,
        website,
        clientFit,
        projectScope,
        pitchDetails,
        aboutUs,
        skills,
        approach,
        uniqueThings,
        attachments,
        additionalLinks,
        experience,
        companyName,
        companyLocation,
        noteToBreef,
        previousWork,
    } = pitchData;

    const { isMaxMobile } = useMediaContext();

    const onEditTagline = () =>
        onEditStep?.(PitchStep.OUR_AGENCY, 'tagline-label');
    const onEditCompanyLinks = () =>
        onEditStep?.(PitchStep.OUR_AGENCY, 'agency-links-label');
    const onEditTeamMessage = () =>
        onEditStep?.(PitchStep.YOUR_PITCH, 'pitch-details-label');
    const onEditAboutUs = () =>
        onEditStep?.(PitchStep.OUR_AGENCY, 'about-us-label');
    const onEditApproach = () =>
        onEditStep?.(PitchStep.YOUR_PITCH, 'agency-approach-label');
    const onEditWhatMakesUsDifferent = () =>
        onEditStep?.(PitchStep.YOUR_PITCH, 'makes-us-different-field');
    const onEditPreviousWork = () =>
        onEditStep?.(PitchStep.PORTFOLIO, 'previous-work-field');
    const onEditAttachments = () =>
        onEditStep?.(PitchStep.PORTFOLIO, 'attachments-label');
    const onEditAdditionalLinks = () =>
        onEditStep?.(PitchStep.PORTFOLIO, 'additional-links-label');
    const onEditNoteBreef = () =>
        onEditStep?.(PitchStep.PROJECT_FIT, 'note-to-breef-label');

    const isLogoCard = !!companyLogo?.url && !isMaxMobile;
    const isCompanyInfoCard =
        !!companyName ||
        !!companyLocation ||
        !!tagline ||
        !!budget.value ||
        !!onEditStep;
    const isCompanyLinksCard =
        !!website || !!portfolio || !!instagram || !!onEditStep;
    const isCompanyInfoRow =
        isCompanyLinksCard || isCompanyInfoCard || isLogoCard;
    const isYourApproachCard =
        approach.description ||
        skills.length !== 0 ||
        approach.links.length !== 0 ||
        !!onEditStep;
    const isMessageFromTheTeamCard = !!pitchDetails || !!onEditStep;
    const isAboutUsCard =
        !!aboutUs ||
        !!projectScope ||
        !!clientFit ||
        !!experience ||
        !!onEditStep;
    const isUniqueThingCard = !!uniqueThings?.length || !!onEditStep;
    const isPortfolioCard = !!previousWork.length || !!onEditStep;
    const isAttachmentsCard = !!attachments?.length || !!onEditStep;
    const isAdditionalLinksCard = !!additionalLinks?.length || !!onEditStep;
    const isNoteToBreefCard = !!noteToBreef || !!onEditStep;

    const renderCompanyLink = (title: string, url: string, icon: ReactNode) => (
        <a href={url} target="_blank" rel="noreferrer">
            {icon}
            {title}
        </a>
    );

    const renderLink = (title: string, url: string, key?: string | number) => (
        <a
            key={key}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="review-link"
        >
            {title}
        </a>
    );

    const renderTag = (
        key: number | string,
        name: string,
        isSmall?: boolean,
    ) => (
        <StyledColoredTag key={key} isSmall={isSmall}>
            {name}
        </StyledColoredTag>
    );

    const renderBudget = (budget: string) => {
        if (budget === 'in_range') {
            return (
                <Fragment>
                    <WithinBudgetIcon />
                    <span className="budget-range">within budget range</span>
                </Fragment>
            );
        }
        return (
            <Fragment>
                <OutsideBudgetIcon />
                <span className="budget-range">outside budget range</span>
            </Fragment>
        );
    };

    const renderSocialLink = (nonTitle?: boolean) => {
        return (
            <div className="links-wrapper">
                {website &&
                    renderCompanyLink(
                        !nonTitle ? 'Website' : '',
                        urlToDefaultFormat(website),
                        <WebsiteOrangeIcon className="website-icon" />,
                    )}

                {renderCompanyLink(
                    !nonTitle ? 'Portfolio' : '',
                    urlToDefaultFormat(portfolio),
                    <PortfolioOrangeIcon className="portfolio-icon" />,
                )}

                {renderCompanyLink(
                    !nonTitle ? 'Instagram' : '',
                    getLink({
                        title: 'instagram',
                        link: instagram,
                        defaultLinkTitles: defaultSocialLinkTitles,
                    }),
                    <InstagramOrangeIcon className="instagram-icon" />,
                )}
            </div>
        );
    };

    const renderFirstRowToMobile = () => {
        return (
            <Fragment>
                <ReviewScopeCard
                    className="card info mobile this-is-mobile"
                    onEdit={onEditStep && onEditTagline}
                >
                    <div className="group">
                        {companyLogo && (
                            <div className="logo-wrapper">
                                <AvatarImage
                                    src={companyLogo?.url}
                                    width={54}
                                    height={54}
                                    alt="Company Logo"
                                    className="logo"
                                />
                            </div>
                        )}
                        <div className="main-info-wrapper">
                            <h3>{companyName}</h3>
                            {companyLocation && (
                                <span className="company-location">
                                    <LocationSmallIcon />
                                    {companyLocation}
                                </span>
                            )}
                        </div>
                    </div>
                    {tagline && (
                        <p title={tagline} className="tagline-content">
                            {tagline}
                        </p>
                    )}
                    {budget.value && (
                        <div className="group last">
                            <div className="budget">
                                {renderBudget(budget.value)}
                            </div>
                        </div>
                    )}
                </ReviewScopeCard>
                {(website || portfolio || instagram) && (
                    <ReviewScopeCard
                        className="card company-links-card"
                        onEdit={onEditStep && onEditCompanyLinks}
                    >
                        {renderSocialLink()}
                    </ReviewScopeCard>
                )}
            </Fragment>
        );
    };

    const renderFirstRow = () => {
        if (isMaxMobile) {
            return renderFirstRowToMobile();
        }

        return (
            <div className="row">
                {isLogoCard && (
                    <ReviewScopeCard className="card logo-card">
                        <div className="logo-wrapper">
                            <AvatarImage
                                src={companyLogo?.url}
                                width={108}
                                height={108}
                                alt="Company Logo"
                                className="logo"
                            />
                        </div>
                    </ReviewScopeCard>
                )}
                {isCompanyInfoCard && (
                    <ReviewScopeCard
                        className="card company-info-card"
                        onEdit={onEditStep && onEditTagline}
                    >
                        <div className="main-info-wrapper">
                            <h3>{companyName}</h3>
                            {companyLocation && (
                                <div className="company-location">
                                    <LocationSmallIcon />
                                    <span>{companyLocation}</span>
                                </div>
                            )}
                        </div>
                        {tagline && (
                            <p title={tagline} className="tagline-content">
                                {tagline}
                            </p>
                        )}
                        {budget.value && (
                            <div className="budget">
                                {renderBudget(budget.value)}
                            </div>
                        )}
                    </ReviewScopeCard>
                )}
                {isCompanyLinksCard && (
                    <ReviewScopeCard
                        className="card company-links-card"
                        onEdit={onEditStep && onEditCompanyLinks}
                    >
                        {renderSocialLink()}
                    </ReviewScopeCard>
                )}
            </div>
        );
    };

    const getSelectedValueFromMax = (
        value: number | string,
        maxValue: number | string,
    ) => {
        if (!value || isNaN(value as number)) {
            return 'Not selected';
        }
        return `${value}/${maxValue}`;
    };

    return (
        <StyledReviewPitch
            className={className}
            taglineLength={tagline.length ?? undefined}
            isEditable={!!onEditStep}
        >
            {isCompanyInfoRow && renderFirstRow()}
            {isAboutUsCard && (
                <ReviewScopeCard
                    wLine={77}
                    title={'About Us'}
                    className=" card about-us-card"
                    onEdit={onEditStep && onEditAboutUs}
                >
                    {aboutUs && (
                        <StyledReviewScopeText>{aboutUs}</StyledReviewScopeText>
                    )}
                    <div className="agency-fit-tags-wrapper">
                        {renderTag(
                            'project-scope',
                            `Project Scope: ${getSelectedValueFromMax(
                                projectScope,
                                listExperience.length,
                            )}`,
                        )}
                        {renderTag(
                            'client-fit',
                            `Client Fit: ${getSelectedValueFromMax(
                                clientFit,
                                listExperience.length,
                            )}`,
                        )}
                        {renderTag(
                            'experience',
                            `Industry Experience: ${getSelectedValueFromMax(
                                experience,
                                listExperience.length,
                            )}`,
                        )}
                    </div>
                </ReviewScopeCard>
            )}
            {isMessageFromTheTeamCard && (
                <ReviewScopeCard
                    wLine={205}
                    title={'Message From the Team'}
                    className="card team-message-card"
                    onEdit={onEditStep && onEditTeamMessage}
                >
                    <StyledReviewScopeText>
                        {pitchDetails}
                    </StyledReviewScopeText>
                </ReviewScopeCard>
            )}
            {isYourApproachCard && (
                <ReviewScopeCard
                    wLine={125}
                    title={'Your Approach'}
                    className="card agency-approach-card"
                    onEdit={onEditStep && onEditApproach}
                >
                    <div className="approach-wrapper">
                        <div className="skills-wrapper">
                            {skills.map(skill => (
                                <Pill
                                    key={skill.id}
                                    label={skill.name}
                                    isStatic
                                />
                            ))}
                        </div>
                        {approach.description && (
                            <StyledReviewScopeText className="approach">
                                {approach.description}
                            </StyledReviewScopeText>
                        )}
                        {approach.links.length !== 0 &&
                            approach.links.map((link, index) =>
                                renderLink(
                                    link.title,
                                    urlToDefaultFormat(link.link),
                                    index,
                                ),
                            )}
                    </div>
                </ReviewScopeCard>
            )}
            {isUniqueThingCard && (
                <ReviewScopeCard
                    wLine={210}
                    className="card different"
                    title={'What Makes Us Different?'}
                    onEdit={onEditStep && onEditWhatMakesUsDifferent}
                >
                    <div className="things-wrapper">
                        {uniqueThings?.map(item =>
                            renderTag(item.id, item.name),
                        )}
                    </div>
                </ReviewScopeCard>
            )}
            {isPortfolioCard && (
                <ReviewScopeCard
                    className="card portfolio"
                    title={'Portfolio'}
                    wLine={70}
                    onEdit={onEditStep && onEditPreviousWork}
                >
                    <div className="portfolio-wrapper">
                        {previousWork?.map(item => (
                            <WorkCard
                                key={item.id}
                                workData={{
                                    ...item,
                                    titleFirst: item.clientName,
                                    titleLast: item.projectName,
                                }}
                            />
                        ))}
                    </div>
                </ReviewScopeCard>
            )}
            {isAttachmentsCard && (
                <ReviewScopeCard
                    wLine={107}
                    className="card"
                    title={'Attachments'}
                    onEdit={onEditStep && onEditAttachments}
                >
                    <div className="attachments-wrapper">
                        {attachments?.map(file => (
                            <File
                                showIcon
                                key={file.id}
                                name={file.title}
                                link={file.link}
                                size="small"
                            />
                        ))}
                    </div>
                </ReviewScopeCard>
            )}
            {isAdditionalLinksCard && (
                <ReviewScopeCard
                    wLine={130}
                    className="card"
                    title={'Additional Links'}
                    onEdit={onEditStep && onEditAdditionalLinks}
                >
                    <div className="additional-links-wrapper">
                        {additionalLinks?.map((item, index) =>
                            renderLink(item.name, item.link, index),
                        )}
                    </div>
                </ReviewScopeCard>
            )}
            {isNoteToBreefCard && (
                <ReviewScopeCard
                    title={'Note to Breef'}
                    className="card"
                    wLine={115}
                    onEdit={onEditStep && onEditNoteBreef}
                >
                    <StyledReviewScopeText>{noteToBreef}</StyledReviewScopeText>
                </ReviewScopeCard>
            )}
        </StyledReviewPitch>
    );
};

export default ReviewPitch;
