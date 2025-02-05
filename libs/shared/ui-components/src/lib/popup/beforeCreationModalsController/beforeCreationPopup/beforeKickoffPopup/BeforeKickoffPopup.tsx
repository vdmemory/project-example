import { PROJECT_KICKOFF_ROUTE } from '@breef/shared/constants';
import { configTipsAgency, configTipsClient } from './configTips';
import { simpleLightningImage, yellowStars1Image } from '@breef/shared/assets';
import { useRouter } from 'next/router';
import { BeforeCreationPopup } from '../BeforeCreationPopup';
import GetStartedWrapper from '../../../../startedWrapper/GetStartedWrapper';
import { withPopup } from '../../../Popup';

interface BeforeKickoffPopupProps {
    projectId: number;
    userType: 'client' | 'agency';
    close: () => void;
}

function BeforeKickoffPopup({
    projectId,
    userType,
    close,
}: BeforeKickoffPopupProps) {
    const router = useRouter();

    const configBeginKickOff = {
        label:
            userType === 'agency'
                ? 'CONGRATS! LET’S \nBEGIN KICKOFF.'
                : 'CONGRATS! LET’S BEGIN PROJECT KICKOFF.',
        headerImageUrl:
            userType === 'agency'
                ? yellowStars1Image.src
                : simpleLightningImage.src,
        completeButtonLabel: 'Next',
        onClickComplete: () => {
            router
                .push(
                    PROJECT_KICKOFF_ROUTE.reverse({ projectId }) || '0',
                    undefined,
                    { shallow: true },
                )
                .then(close);
        },
    };

    return (
        <BeforeCreationPopup {...configBeginKickOff}>
            <GetStartedWrapper
                configTips={
                    userType === 'agency' ? configTipsAgency : configTipsClient
                }
                isNumbering
            />
        </BeforeCreationPopup>
    );
}

export default withPopup(BeforeKickoffPopup, { overflow: 'visible' });
