import { AvatarImage, NoIcon, Unreviewed, YesIcon } from '@breef/ui-kit';
import {
    customStyle,
    StyledItem,
    StyledNavigationList,
} from './NavigationList.styled';
import { ReviewDecisionNames } from '@breef/shared/constants';
import { PitchData } from '@breef/shared/types';
import { useMediaContext } from '@breef/shared/hooks';
import Tooltip from '../../../tooltip/Tooltip';
import { ReactNode } from 'react';

export type AgenciesItem = {
    id: number;
    name: string;
    logo: string;
    reviewDecision: ReviewDecisionNames;
    pitch: PitchData | null;
};

interface NavigationProps {
    label: string;
    list: AgenciesItem[];
    activeId: number | null;
    onSelect: (id: number) => void;
    isDisabled?: boolean;
}

export const NavigationList = ({
    label,
    list,
    onSelect,
    activeId,
    isDisabled,
}: NavigationProps) => {
    const renderList = ({ id, name, logo, reviewDecision }: AgenciesItem) => {
        const isActive = activeId === id;

        return (
            <Item
                isActive={isActive}
                key={name + id}
                name={name}
                logo={logo}
                reviewDecision={reviewDecision}
                onClick={() => onSelect(id)}
                isDisabled={isDisabled}
            />
        );
    };
    return (
        <NavigationListItems label={label}>
            {list.map(renderList)}
        </NavigationListItems>
    );
};

type AgenciesItemPublic = {
    token: string;
    name: string;
    logo: string;
};
interface NavigationPublicProps {
    label: string;
    list: AgenciesItemPublic[];
    activeToken: string | null;
    onSelect: (token: string) => void;
    isScalingOnMobile?: boolean;
}

export const NavigationListPublic = ({
    label,
    list,
    onSelect,
    activeToken,
    isScalingOnMobile = true,
}: NavigationPublicProps) => {
    const renderList = ({ token, name, logo }: AgenciesItemPublic) => {
        const isActive = activeToken === token;

        return (
            <Item
                isActive={isActive}
                key={token}
                name={name}
                logo={logo}
                onClick={() => onSelect(token)}
                isScalingOnMobile={isScalingOnMobile}
            />
        );
    };

    return (
        <NavigationListItems label={label}>
            {list.map(renderList)}
        </NavigationListItems>
    );
};

const NavigationListItems = ({
    label,
    children,
}: {
    label: string;
    children: ReactNode;
}) => {
    return (
        <StyledNavigationList className="nav-list">
            {label ? <label className="label">{label}</label> : null}
            <div className="list">{children}</div>
        </StyledNavigationList>
    );
};

const Item = ({
    isActive,
    name,
    logo,
    reviewDecision,
    onClick,
    isDisabled,
    isScalingOnMobile,
}: {
    isActive: boolean;
    name: string;
    logo: string;
    reviewDecision?: ReviewDecisionNames;
    onClick: () => void;
    isDisabled?: boolean;
    isScalingOnMobile?: boolean;
}) => {
    const { isMobile } = useMediaContext();
    const isNoViewed = reviewDecision === ReviewDecisionNames.UNREVIEWED;

    const renderContent = () => (
        <div className="group">
            <AvatarImage
                src={logo}
                width={30}
                height={30}
                alt="Agency Logo"
                className="logo"
            />
            {reviewDecision && (
                <div className="status">{renderIcon(reviewDecision)}</div>
            )}
        </div>
    );

    const renderContentWithTooltip = () => {
        if (isMobile) {
            return renderContent();
        }
        return (
            <Tooltip
                customStyle={customStyle}
                className="tooltip"
                placement="top"
                label={name}
            >
                {renderContent()}
            </Tooltip>
        );
    };

    return (
        <StyledItem
            className="item"
            onClick={!isDisabled ? onClick : undefined}
            isActive={isActive}
            isNoViewed={isNoViewed}
            isScalingOnMobile={isScalingOnMobile}
        >
            {renderContentWithTooltip()}
        </StyledItem>
    );
};

const renderIcon = (reviewDecision: ReviewDecisionNames) => {
    switch (reviewDecision) {
        case ReviewDecisionNames.ACCEPTED:
            return <YesIcon />;
        case ReviewDecisionNames.REJECTED:
            return <NoIcon />;
        case ReviewDecisionNames.UNREVIEWED:
            return <Unreviewed />;
        default:
            return null;
    }
};
