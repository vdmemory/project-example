import { useRouteControl } from '@breef/shared/hooks';
import { CLIENT_PITCHES_REVIEW_ROUTER } from '@breef/shared/constants';
import { StartPitchPopup } from '../startPitchPopup/StartPitchPopup';
import { StyledPopupList } from './PitchReviewPopupClient.styled';

export const textPitchReviewPopup = [
    {
        id: 1,
        title: '1. Review pitches',
        description:
            'Check out agency portfolios, case studies, values and more - side by side!',
    },
    {
        id: 2,
        title: '2. Select favorites',
        description:
            'Narrow it down! Pick your 2-3 favorite teams. Think vision, experience and vibe.',
    },
    {
        id: 3,
        title: '3. Schedule calls',
        description:
            'Share availability to chat with your top teams - this is the best part!',
    },
];

interface ProjectAvailabilityPopupProps {
    projectId: number;
    close: () => void;
}

export default function PitchReviewPopup({
    projectId,
    close,
}: ProjectAvailabilityPopupProps) {
    const { changePage } = useRouteControl();

    const onNext = () => {
        changePage(
            CLIENT_PITCHES_REVIEW_ROUTER.reverse({
                projectId: String(projectId) || 0,
            }) || '',
        ).finally(close);
    };

    return (
        <StartPitchPopup
            title={`Drumroll... \nyour pitches are in!`}
            description="These pitches are an expression of interest from vetted agencies, curated for you and your goals."
            onClose={close}
            heightButtonSave={48}
            fontSizeDescription={16}
            onSubmit={onNext}
            buttonTitle="REVIEW PITCHES"
            showButtonIcon
        >
            <StyledPopupList>
                <div className="list">
                    {textPitchReviewPopup.map(item => (
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
