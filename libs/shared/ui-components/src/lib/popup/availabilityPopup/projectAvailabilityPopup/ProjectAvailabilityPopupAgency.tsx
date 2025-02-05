import { tipsPopupConfig } from './tipsPopupConfig';
import { withPopup } from '../../Popup';
import { FC } from 'react';
import { BeforeCreationPopup } from '../../beforeCreationModalsController/beforeCreationPopup/BeforeCreationPopup';
import CustomExpandedCard from '../../../select/cardSelect/cardController/customExpandedCard/CustomExpandedCard';
import { useRouteControl } from '@breef/shared/hooks';
import { useGetSelfQuery } from '@breef/shared/data-access-auth';
import { PROJECT_BOOK_MEETING_ROUTE } from '@breef/shared/constants';
import {
    ImagePreset,
    StyledTipsPopup,
    StyledTipsPopupBody,
} from './ProjectAvailabilityPopupAgency.styled';

interface ProjectAvailabilityPopupProps {
    projectId: number;
}

function ProjectAvailabilityPopupAgency({
    projectId,
}: ProjectAvailabilityPopupProps) {
    const { changePage } = useRouteControl();
    const { data, isLoading } = useGetSelfQuery();

    const onNext = () => {
        const parsedPath =
            PROJECT_BOOK_MEETING_ROUTE.reverse({ projectId }) || '';
        return changePage(parsedPath);
    };

    if (isLoading) return null;
    return <TipsPopup hideCardNumber {...tipsPopupConfig} onClick={onNext} />;
}

export default withPopup(ProjectAvailabilityPopupAgency, {
    overflow: 'visible',
});

interface TipsPopupProps {
    hideCardNumber?: boolean;
    onClick: () => void;
    config: {
        label: string;
        note: string;
        headerImageUrl?: string;
        imagePreset?: ImagePreset;
        completeButtonLabel: string;
    };
    tips: {
        id: number;
        title: string;
        description: string;
    }[];
}

export const TipsPopup: FC<TipsPopupProps> = ({
    onClick,
    config,
    tips,
    hideCardNumber,
}) => {
    return (
        <StyledTipsPopup imagePreset={config.imagePreset}>
            <BeforeCreationPopup {...config} onClickComplete={onClick}>
                <StyledTipsPopupBody>
                    {tips.map(item => (
                        <CustomExpandedCard
                            key={`tip ${item.id}`}
                            cardId={item.id}
                            cardNumber={!hideCardNumber ? item.id : undefined}
                        >
                            <div>
                                <h3 className="title">{item.title}</h3>
                                <div className="text">{item.description}</div>
                            </div>
                        </CustomExpandedCard>
                    ))}
                </StyledTipsPopupBody>
            </BeforeCreationPopup>
        </StyledTipsPopup>
    );
};
