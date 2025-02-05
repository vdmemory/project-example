import { Fragment, ReactNode } from 'react';
import {
    defaultSocialLinkTitles,
    listExperience,
    PitchStep,
} from '@breef/shared/constants';
import { StyledColoredTag, StyledAgencyPitch } from './AgencyPitch.styled';
import { ObjectImageType, PreviousWorkType } from '@breef/shared/types';
import { LocationSmallIcon } from '@breef/shared/assets';
import { getLink, urlToDefaultFormat } from '@breef/shared/utils';
import {
    AvatarImage,
    InstagramOrangeIcon,
    OutsideBudgetIcon,
    PillOld,
    PortfolioOrangeIcon,
    WebsiteOrangeIcon,
    WithinBudgetIcon,
} from '@breef/ui-kit';
import {
    LineAboutUs,
    LineApproach,
    LineAttachments,
    LineLinks,
    LineMakesUsDifferent,
    LineMessageFromTeam,
    LinePortfolio,
    LineTestimonial,
} from './svg';
import { useMediaContext } from '@breef/shared/hooks';
import ReviewCardOld, {
    StyledReviewTextOld,
} from '../reviewCard/ReviewCardOld';
import { File } from '../file/File';
import { WorkCard } from '../workCard/WorkCard';
import { WorkCardOld } from '../..';

type PitchData = {
    companyName: string;
    companyLocation: string;

    id?: number;
    aboutUs: string;
    approach: {
        description: string;
        links: { link: string; title: string }[];
    };
    skills: {
        id: number;
        name: string;
    }[];
    companyLogo: ObjectImageType | null;
    tagline: string;
    website: string;
    portfolio: string;
    instagram: string;
    pitchDetails: string;
    previousWork: PreviousWorkType[];
    additionalLinks: { name: string; link: string }[] | null;
    attachments: { id: number | string; title: string; link: string }[] | null;
    budget: { value: string; comment: string };
    experience: string;
    clientFit: string;
    projectScope: string;
    noteToBreef?: string;
    uniqueThings: { id: number; name: string }[] | null;
    reviewDecision?: string;
};

interface ReviewProjectProps {
    className?: string;
    pitchData: PitchData;
    onEditStep?: (step: PitchStep, elementId?: string) => void;
}
export const AgencyPitch = ({
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
    const isMessageFromTeamCard =
        !!pitchDetails ||
        !!clientFit ||
        !!projectScope ||
        !!experience ||
        !!onEditStep;
    const isAboutUsCard = !!aboutUs || !!onEditStep;
    const isApproachCard =
        !!approach.links.length ||
        !!approach.description ||
        !!skills.length ||
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
                    <span className="budget-range">Within Budget Range</span>
                </Fragment>
            );
        }
        return (
            <Fragment>
                <OutsideBudgetIcon />
                <span className="budget-range">OUTSIDE Budget Range</span>
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
                        <WebsiteOrangeIcon />,
                    )}

                {portfolio &&
                    renderCompanyLink(
                        !nonTitle ? 'Portfolio' : '',
                        urlToDefaultFormat(portfolio),
                        <PortfolioOrangeIcon />,
                    )}

                {instagram &&
                    renderCompanyLink(
                        !nonTitle ? 'Instagram' : '',
                        getLink({
                            title: 'instagram',
                            link: instagram,
                            defaultLinkTitles: defaultSocialLinkTitles,
                        }),
                        <InstagramOrangeIcon />,
                    )}
            </div>
        );
    };

    const renderFirstRowToMobile = () => {
        return (
            <ReviewCardOld
                className="card info mobile"
                onEdit={onEditStep && onEditTagline}
            >
                <div className="group">
                    <div className="logo-wrapper">
                        {companyLogo?.url && (
                            <img src={companyLogo?.url} alt="Company Logo" />
                        )}
                    </div>
                    <div className="main-info-wrapper">
                        <h3>{companyName}</h3>
                        <span className="company-location">
                            <LocationSmallIcon />
                            {companyLocation}
                        </span>
                    </div>
                </div>
                <p title={tagline} className="tagline-content">
                    {tagline}
                </p>
                <div className="group last">
                    <div className="budget">{renderBudget(budget.value)}</div>
                    {renderSocialLink(true)}
                </div>
            </ReviewCardOld>
        );
    };

    const renderFirstRow = () => {
        if (isMaxMobile) {
            return renderFirstRowToMobile();
        }

        return (
            <div className="row">
                {isLogoCard && (
                    <ReviewCardOld className="card logo-card">
                        <div className="logo-wrapper">
                            <AvatarImage
                                src={companyLogo?.url}
                                width={108}
                                height={108}
                                alt="Company Logo"
                                className="logo"
                            />
                        </div>
                    </ReviewCardOld>
                )}
                {isCompanyInfoCard && (
                    <ReviewCardOld
                        className="card company-info-card"
                        onEdit={onEditStep && onEditTagline}
                    >
                        <div className="main-info-wrapper">
                            <h3>{companyName}</h3>
                            <div className="company-location">
                                <LocationSmallIcon />
                                <span>{companyLocation}</span>
                            </div>
                        </div>
                        <p title={tagline} className="tagline-content">
                            {tagline}
                        </p>
                        <div className="budget">
                            {renderBudget(budget.value)}
                        </div>
                    </ReviewCardOld>
                )}
                {isCompanyLinksCard && (
                    <ReviewCardOld
                        className="card company-links-card"
                        onEdit={onEditStep && onEditCompanyLinks}
                    >
                        {renderSocialLink()}
                    </ReviewCardOld>
                )}
            </div>
        );
    };

    return (
        <StyledAgencyPitch
            className={className}
            taglineLength={tagline.length ?? undefined}
            isEditable={!!onEditStep}
        >
            {isCompanyInfoRow && renderFirstRow()}

            {isAboutUsCard ? (
                <ReviewCardOld
                    renderLine={<LineAboutUs />}
                    title="About Us"
                    className=" card about-us-card"
                    onEdit={onEditStep && onEditAboutUs}
                >
                    <StyledReviewTextOld>{aboutUs}</StyledReviewTextOld>
                    <div className="agency-fit-tags-wrapper">
                        {projectScope &&
                            renderTag(
                                'project-scope',
                                `Project Scope: ${projectScope}/${listExperience.length}`,
                            )}
                        {clientFit &&
                            renderTag(
                                'client-fit',
                                `Client Fit: ${clientFit}/${listExperience.length}`,
                            )}
                        {experience &&
                            renderTag(
                                'experience',
                                `Industry Experience: ${experience}/${listExperience.length}`,
                            )}
                    </div>
                </ReviewCardOld>
            ) : null}
            {isMessageFromTeamCard && (
                <ReviewCardOld
                    renderLine={<LineMessageFromTeam />}
                    title="Message from the Team"
                    className="card team-message-card"
                    onEdit={onEditStep && onEditTeamMessage}
                >
                    <StyledReviewTextOld>{pitchDetails}</StyledReviewTextOld>
                </ReviewCardOld>
            )}
            {isApproachCard && (
                <ReviewCardOld
                    renderLine={<LineApproach />}
                    title="PROJECT APPROACH"
                    className="card agency-approach-card"
                    onEdit={onEditStep && onEditApproach}
                >
                    <div className="approach-wrapper">
                        <div className="skills-wrapper">
                            {skills.map(skill => (
                                <PillOld
                                    key={skill.id}
                                    label={skill.name}
                                    isStatic
                                />
                            ))}
                        </div>
                        <StyledReviewTextOld className="approach">
                            {approach.description}
                        </StyledReviewTextOld>
                        {approach.links.length > 0 &&
                            approach.links.map((link, index) =>
                                renderLink(
                                    link.title,
                                    urlToDefaultFormat(link.link),
                                    index,
                                ),
                            )}
                    </div>
                </ReviewCardOld>
            )}
            {isUniqueThingCard && (
                <ReviewCardOld
                    renderLine={<LineMakesUsDifferent />}
                    className="card different"
                    title="What makes us different?"
                    onEdit={onEditStep && onEditWhatMakesUsDifferent}
                >
                    <div className="things-wrapper">
                        {uniqueThings?.map(item =>
                            renderTag(item.id, item.name),
                        )}
                    </div>
                </ReviewCardOld>
            )}
            {isPortfolioCard && (
                <ReviewCardOld
                    className="card portfolio"
                    title="PORTFOLIO"
                    renderLine={<LinePortfolio />}
                    onEdit={onEditStep && onEditPreviousWork}
                >
                    <div className="portfolio-wrapper">
                        {previousWork?.map(item => (
                            <WorkCardOld
                                key={item.id}
                                workData={{
                                    ...item,
                                    titleFirst: item.clientName,
                                    titleLast: item.projectName,
                                }}
                            />
                        ))}
                    </div>
                </ReviewCardOld>
            )}
            {isAttachmentsCard && (
                <ReviewCardOld
                    renderLine={<LineAttachments />}
                    className="card"
                    title="Attachments"
                    onEdit={onEditStep && onEditAttachments}
                >
                    <div className="attachments-wrapper">
                        {attachments?.map(file => (
                            <File
                                showIcon
                                key={file.id}
                                name={file.title}
                                link={file.link}
                            />
                        ))}
                    </div>
                </ReviewCardOld>
            )}
            {isAdditionalLinksCard && (
                <ReviewCardOld
                    renderLine={<LineLinks />}
                    className="card"
                    title="Links"
                    onEdit={onEditStep && onEditAdditionalLinks}
                >
                    <div className="additional-links-wrapper">
                        {additionalLinks?.map((item, index) =>
                            renderLink(item.name, item.link, index),
                        )}
                    </div>
                </ReviewCardOld>
            )}
            {isNoteToBreefCard && (
                <ReviewCardOld
                    title="NOTE TO BREEF"
                    className="card"
                    renderLine={<LineTestimonial className="line-breef-note" />}
                    onEdit={onEditStep && onEditNoteBreef}
                >
                    <StyledReviewTextOld>{noteToBreef}</StyledReviewTextOld>
                </ReviewCardOld>
            )}
        </StyledAgencyPitch>
    );
};

export default AgencyPitch;
