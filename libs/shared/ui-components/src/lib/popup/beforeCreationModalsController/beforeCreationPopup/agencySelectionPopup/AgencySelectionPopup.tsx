import { BeforeCreationPopup } from '../BeforeCreationPopup';
import { CLIENT_AGENCY_SELECTION_ROUTE } from '@breef/shared/constants';
import { yellowStars1Image } from '@breef/shared/assets';
import { useRouter } from 'next/router';
import { configTips } from './configTips';
import GetStartedWrapper from '../../../../startedWrapper/GetStartedWrapper';
import { withPopup } from '../../../Popup';

interface BeforeKickoffPopupProps {
    projectId: number;
    close: () => void;
}

function AgencySelectionPopup({ projectId, close }: BeforeKickoffPopupProps) {
    const router = useRouter();

    const configGetStarted = {
        label: 'The best part...  \npick your dream team!',
        headerImageUrl: yellowStars1Image.src,
        completeButtonLabel: 'Next',
        onClickComplete: () => {
            router
                .push(
                    CLIENT_AGENCY_SELECTION_ROUTE.reverse({
                        projectId,
                    }) || '0',
                    undefined,
                    { shallow: true },
                )
                .finally(() => {
                    close();
                });
        },
    };

    return (
        <BeforeCreationPopup {...configGetStarted}>
            <GetStartedWrapper configTips={configTips} isNumbering />
        </BeforeCreationPopup>
    );
}

export default withPopup(AgencySelectionPopup, { overflow: 'visible' });
