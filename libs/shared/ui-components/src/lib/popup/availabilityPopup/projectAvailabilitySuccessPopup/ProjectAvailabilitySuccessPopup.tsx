import { FC } from 'react';
import { useMediaContext, useRouteControl } from '@breef/shared/hooks';
import { PROJECTS_ROUTE } from '@breef/shared/constants';
import { agencyConfigPopup, clientConfigPopup } from './configPopup';
import { agencyConfigTips, clientConfigTips } from './configTips';

import { StartPitchPopup } from '../../startPitchPopup/StartPitchPopup';
import {
    getPopupStylePreset,
    StyledPopupList,
} from './ProjectAvailabilitySuccessPopup.styled';

interface ProjectAvailabilitySuccessPopup {
    userType: 'client' | 'agency' | null;
    onClick?: () => void;
    close?: () => void;
}
const ProjectAvailabilitySuccessPopup: FC<ProjectAvailabilitySuccessPopup> = ({
    userType,
    onClick,
    close,
}) => {
    const { changePage } = useRouteControl();
    const { isMobile } = useMediaContext();

    const configPopup =
        userType === 'agency' ? agencyConfigPopup : clientConfigPopup;
    const configPopupBody =
        userType === 'agency' ? agencyConfigTips : clientConfigTips;

    const handleClick = () => {
        onClick ? onClick() : changePage(PROJECTS_ROUTE);
    };

    if (!userType) return null;

    return (
        <StartPitchPopup
            outsidePopupStylePreset={getPopupStylePreset(isMobile)}
            heightButtonSave={48}
            fontSizeDescription={16}
            buttonTitle={configPopup.completeButtonLabel}
            title={configPopup.label}
            description={configPopup.note}
            onClose={close}
            onSubmit={handleClick}
        >
            <StyledPopupList>
                <div className="list">
                    {configPopupBody.map(item => (
                        <div key={item.title} className="item">
                            <h3 className="title">{item.title}</h3>
                            <div className="description">
                                {item.description}
                            </div>
                        </div>
                    ))}
                </div>
            </StyledPopupList>
        </StartPitchPopup>
    );
};

export default ProjectAvailabilitySuccessPopup;
