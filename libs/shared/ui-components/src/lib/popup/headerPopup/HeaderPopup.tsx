import { CloseIcon } from '@breef/shared/assets';
import { StyledHeaderPopup } from './HeaderPopup.styled';

interface HeaderPopupProps {
    onClose: () => void;
}

export const HeaderPopup = ({ onClose }: HeaderPopupProps) => {
    return (
        <StyledHeaderPopup>
            <button onClick={onClose} data-testid="button-close">
                <CloseIcon className="close-icon" />
            </button>
        </StyledHeaderPopup>
    );
};

export default HeaderPopup;
