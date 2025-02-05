import { cloud_modal } from '@breef/shared/assets';
import { configTipsClient, configTipsAgency } from './configTips';
import { StyledGreetingInvitationPopup } from './GreetingInvitationPopup.styled';
import GetStartedWrapper from '../../startedWrapper/GetStartedWrapper';
import Button from '../../button/Button';
import { Popup } from '../Popup';
import { useMediaContext } from '@breef/shared/hooks';

interface GreetingInvitationProps {
    role: 'client' | 'agency';
    onClick: () => void;
    close: () => void;
}

export const GreetingInvitationPopup = ({
    role = 'client',
    onClick,
    close,
}: GreetingInvitationProps) => {
    const { isMobile } = useMediaContext();
    const note =
        role === 'client'
            ? 'Here on your dashboard is where you’ll have access to any projects you’ve been added to by a colleague - or even start one yourself!'
            : 'Here on your dashboard is where you’ll have access to any projects you’ve been added to by a colleague.';

    const configGreeting = {
        label: 'Welcome to Breef!',
        headerImageUrl: cloud_modal.src,
        note,
    };

    return (
        <Popup
            close={close}
            style={{
                overflowX: 'unset',
                overflowY: isMobile ? 'auto' : 'unset',
            }}
        >
            <StyledGreetingInvitationPopup data-testid="greeting-invitation-popup">
                <HeaderGreeting {...configGreeting} />
                <div className="content-modal">
                    <GetStartedWrapper
                        configTips={
                            role === 'client'
                                ? configTipsClient
                                : configTipsAgency
                        }
                    />
                </div>
                <div className="footer-modal">
                    <Button
                        title="Let’s Do This"
                        type="button"
                        arrowRight
                        className="normal"
                        onClick={onClick}
                    />
                </div>
            </StyledGreetingInvitationPopup>
        </Popup>
    );
};

export default GreetingInvitationPopup;

interface HeaderGreetingProps {
    label: string;
    note?: string;
    headerImageUrl?: string;
}

const HeaderGreeting = ({
    headerImageUrl,
    label,
    note,
}: HeaderGreetingProps) => {
    return (
        <div className="header-modal">
            <div className="header-left-container">
                <span className="label">{label}</span>
                {note && <span className="note">{note}</span>}
            </div>
            {headerImageUrl && (
                <div className="header-right-container">
                    <img src={headerImageUrl} alt="" />
                </div>
            )}
        </div>
    );
};
