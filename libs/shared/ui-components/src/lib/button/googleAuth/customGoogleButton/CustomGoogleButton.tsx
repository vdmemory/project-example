import { StyledGoogleButton } from './CustomGoogleButton.styled';
import { GoogleLogo } from '@breef/shared/assets';

interface GoogleButtonType {
    onClick: () => void;
    title?: string;
}

export function CustomGoogleButton({
    onClick,
    title = 'Continue with Google',
}: GoogleButtonType) {
    return (
        <StyledGoogleButton type="button" onClick={onClick}>
            <div className="sso-content">
                <div className="sso-icon">
                    <div className="sso-icon-container">
                        <GoogleLogo />
                    </div>
                </div>
            </div>
            {!!title && (
                <div className="sso-button-content">
                    <span>{title}</span>
                </div>
            )}
        </StyledGoogleButton>
    );
}

export default CustomGoogleButton;
