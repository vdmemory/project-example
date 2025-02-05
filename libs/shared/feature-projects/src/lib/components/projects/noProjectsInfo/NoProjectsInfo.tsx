import { Button } from '@breef/shared/ui-components';
import { StyledNoProjectsInfo } from './NoProjectsInfo.styled';
import { InfoBox } from './infoBox/InfoBox';
import {
    NumberInRound1,
    NumberInRound2,
    NumberInRound3,
} from '@breef/shared/assets';
import { useRouter } from 'next/router';
import { PROJECT_CREATE_ROUTE } from '@breef/shared/constants';

interface NoProjectsInfoProps {
    config: { label: string; note: string }[];
    role: 'client' | 'agency';
}

export function NoProjectsInfo({ config, role }: NoProjectsInfoProps) {
    const router = useRouter();

    const handleStartProject = () => {
        router.push(PROJECT_CREATE_ROUTE, undefined, { shallow: true });
    };

    return (
        <StyledNoProjectsInfo>
            <div
                data-testid="wrapper-info-boxes"
                className="projects-info-content"
            >
                {config.map((item, key) => (
                    <InfoBox key={key} label={item.label} note={item.note}>
                        {infoBoxNumberImages[key]}
                    </InfoBox>
                ))}
            </div>
            {role === 'client' && (
                <Button
                    type="button"
                    onClick={handleStartProject}
                    subtitle="Next step:"
                    className="normal"
                    arrowRight
                    color="primary"
                    disabled={false}
                    withAnimate
                >
                    START PROJECT
                </Button>
            )}
        </StyledNoProjectsInfo>
    );
}

export const infoBoxNumberImages = [
    <NumberInRound1 key="info-box-number-1" />,
    <NumberInRound2 key="info-box-number-2" />,
    <NumberInRound3 key="info-box-number-3" />,
];
