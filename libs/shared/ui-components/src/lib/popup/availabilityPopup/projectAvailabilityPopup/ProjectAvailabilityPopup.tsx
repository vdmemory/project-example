import { useMediaContext, useRouteControl } from '@breef/shared/hooks';
import { DASHBOARD_MEET_ROUTE } from '@breef/shared/constants';
import { tipsPopupConfig } from './tipsPopupConfig';
import { StartPitchPopup } from '../../startPitchPopup/StartPitchPopup';
import {
    getPopupStylePreset,
    StyledPopupList,
} from './ProjectAvailabilityPopup.styled';

interface ProjectAvailabilityPopupProps {
    projectId: number;
    close: () => void;
}

export default function ProjectAvailabilityPopup({
    projectId,
    close,
}: ProjectAvailabilityPopupProps) {
    const { changePage } = useRouteControl();
    const { isMobile } = useMediaContext();

    const onNext = () => {
        const parsedPath = DASHBOARD_MEET_ROUTE.reverse({
            projectId,
        }) as string;

        return changePage(parsedPath);
    };

    return (
        <StartPitchPopup
            outsidePopupStylePreset={getPopupStylePreset(isMobile)}
            heightButtonSave={48}
            fontSizeDescription={16}
            buttonTitle={tipsPopupConfig.config.completeButtonLabel}
            title={tipsPopupConfig.config.label}
            description={tipsPopupConfig.config.note}
            onClose={close}
            onSubmit={onNext}
        >
            <StyledPopupList>
                <div className="list">
                    {tipsPopupConfig.tips.map(item => (
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
}
