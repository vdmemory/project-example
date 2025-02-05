import { StyledConfirmDeletePopup } from './ConfirmDeletePopup.styled';
import Button from '../../../button/Button';
import { withPopup } from '../../../popup/Popup';

interface ConfirmDeletePopupProps {
    acceptFunction: () => void;
    close: () => void;
}

const ConfirmDeletePopup: React.FC<ConfirmDeletePopupProps> = ({
    acceptFunction,
    close,
}) => {
    const handleConfirm = () => {
        acceptFunction();
        close();
    };

    return (
        <StyledConfirmDeletePopup>
            <div className="info-wrapper">
                <h2>Please Confirm</h2>
                <span>Are you sure you like to delete this milestone?</span>
            </div>
            <div className="footer-wrapper">
                <Button
                    type="button"
                    className="normal"
                    color="secondary"
                    onClick={close}
                    title="Cancel"
                    withAnimate
                />
                <Button
                    type="button"
                    className="normal"
                    onClick={handleConfirm}
                    title="Confirm"
                    arrowRight
                    withAnimate
                />
            </div>
        </StyledConfirmDeletePopup>
    );
};

export default withPopup(ConfirmDeletePopup);
