import { StyledBlock, StyledSideBar, StyledText } from './SideBar.styled';
import {
    LipsLoader,
    ReviewProjectPopup,
    Tag,
    usePopup,
} from '@breef/shared/ui-components';
import { listProjectStartDay } from '@breef/shared/constants';
import { LocationSmallIcon, TooltipTinyIcon } from '@breef/shared/assets';
import { ReactNode, useState } from 'react';
import {
    ArrowRightSmallIcon,
    Button,
    colors,
    Pill,
    StatusTag,
} from '@breef/ui-kit';
import { usePitchPreviewSelector } from '../../store/hooks';
import { useGetCapabilitiesQuery } from '@breef/shared/data-access-project-create';
import { css } from '@emotion/react';
import { PitchPreviewResponse } from '@breef/shared/types';
import { useMediaContext } from '@breef/shared/hooks';
import Tooltip from '../../../../../ui-components/src/lib/tooltip/Tooltip';

interface SideBarProps {
    className?: string;
}

const tooltipPopupStyleCssPreset = css`
    backdrop-filter: blur(20px);
`;

const SideBar = ({ className }: SideBarProps) => {
    const projectPopup = usePopup();
    const { data: capabilities, isLoading: isLoadingCapabilities } =
        useGetCapabilitiesQuery({});

    const {
        shortProjectInfo: {
            clientName,
            name: projectName,
            budgetRange,
            budgetType,
            kickoff: projectKickoff,
            requiredSkills,
            agencyPreferences: { location, preferences, advantages },
        },
        pitchPreview,
    } = usePitchPreviewSelector(state => state.pitchPreview);

    const { isMobile } = useMediaContext();
    const [innerHeight, setInnerHeight] = useState('0px');

    if (isLoadingCapabilities) return <LipsLoader />;

    const skillsNames = requiredSkills
        .map(skill => {
            const capabilityName = capabilities?.find(
                ({ id }) => id === skill,
            )?.name;
            return capabilityName || '';
        })
        .filter(Boolean);

    const normalizedBudget = budgetRange.replace(/(\d+(.\d)?)k/g, '$$$1K');
    const normalizedKickOff =
        listProjectStartDay.find(item => item.value === projectKickoff)
            ?.label ?? '';
    const budgetLabel = budgetType === 'monthly' ? 'Monthly Budget' : 'Budget';

    const handleShowTooltipPopup = () => {
        setInnerHeight(window.innerHeight + 'px');
        projectPopup.open();
    };

    return (
        <StyledSideBar data-testid="side-bar" className={className}>
            {projectPopup.isOpen && (
                <ReviewProjectPopup
                    projectData={pitchPreview as PitchPreviewResponse}
                    close={projectPopup.close}
                />
            )}
            <h2 className="title">Project Overview</h2>
            <div className="link">
                <Button
                    label="View Scope"
                    size="large"
                    isUppercase
                    onClick={handleShowTooltipPopup}
                    variant="ghost"
                    icon={<ArrowRightSmallIcon />}
                    iconPlacement="right"
                    isDisabled={false}
                />
            </div>
            <div className="group-card">
                <Block title="Client Name">
                    <StyledText title={clientName}>{clientName}</StyledText>
                </Block>
                <Block title="Project Name">
                    <StyledText title={projectName}>{projectName}</StyledText>
                </Block>
                <Block
                    title={budgetLabel}
                    tooltipText="Includes Breef's 15% referral fee"
                >
                    <StyledText title={normalizedBudget}>
                        {normalizedBudget}
                    </StyledText>
                </Block>
                <Block title="Project Kickoff">
                    <StyledText title={normalizedKickOff}>
                        {normalizedKickOff}
                    </StyledText>
                </Block>
                <Block title="Required Skills">
                    {skillsNames.map(skillName => (
                        <Pill
                            key={skillName}
                            tooltip={skillName}
                            label={skillName}
                            isStatic
                        />
                    ))}
                </Block>
                <Block title="Agency Preferences">
                    <Tag tooltip={location}>
                        <LocationSmallIcon />
                        <span>{`Location: ${location}`}</span>
                    </Tag>
                    {preferences.map(preferenceName => (
                        <Tag
                            key={preferenceName}
                            tooltip={preferenceName}
                            title={preferenceName}
                        />
                    ))}
                    {advantages.map(advantageName => (
                        <Tag
                            key={advantageName}
                            tooltip={advantageName}
                            title={advantageName}
                        />
                    ))}
                </Block>
            </div>
        </StyledSideBar>
    );
};

const Block = ({
    title,
    children,
    tooltipText,
}: {
    title: string;
    children: ReactNode;
    tooltipText?: string;
}) => (
    <StyledBlock>
        <h3 className="title">
            {title}
            {tooltipText && (
                <Tooltip
                    placement="top"
                    className="tooltip"
                    label={tooltipText}
                    customStyle={{ borderRadius: '2px', background: 'white' }}
                    borderColor="rgba(218, 108, 55, 1)"
                >
                    <TooltipTinyIcon className="tooltip-icon" />
                </Tooltip>
            )}
        </h3>
        <div className="content">{children}</div>
    </StyledBlock>
);

export default SideBar;
