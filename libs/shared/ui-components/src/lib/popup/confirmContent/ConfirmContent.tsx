import { CSSObject } from '@emotion/react';
import { useState } from 'react';
import Button from '../../button/Button';
import { StyledConfirmContent } from './ConfirmContent.styled';
import { withPopup } from '../Popup';

interface ConfirmContentProps {
    title: string | JSX.Element;
    description: string;
    onClick: (event: 'confirm' | 'cancel') => void;
    nameCancelBtn?: string;
    nameConfirmBtn?: string;
    isSubmitting?: boolean;
    textInformationStyle?: CSSObject;
    titleStyle?: CSSObject;
    descriptionStyle?: CSSObject;
    newDesign?: boolean;
    colorButtonConfirm?: 'error' | 'success';
    isRoundedButtons?: boolean;
}

const ConfirmContent = ({
    title,
    description,
    onClick,
    nameCancelBtn,
    nameConfirmBtn,
    isSubmitting,
    textInformationStyle,
    titleStyle,
    descriptionStyle,
    newDesign,
    colorButtonConfirm = 'error',
    isRoundedButtons = false,
}: ConfirmContentProps) => {
    const [isConfirm, setIsConfirm] = useState(false);

    const handleConfirm = () => {
        onClick('confirm');
        setIsConfirm(true);
    };

    return (
        <StyledConfirmContent
            textInformationStyle={textInformationStyle}
            titleStyle={titleStyle}
            descriptionStyle={descriptionStyle}
            newDesign={newDesign}
            isRoundedButtons={isRoundedButtons}
        >
            <div className="text-information">
                <h3 className="title">{title}</h3>
                <h5 className="description">{description}</h5>
            </div>
            <div className="buttons-wrapper">
                <Button
                    isSubmitting={isSubmitting || isConfirm}
                    title={nameCancelBtn || 'Cancel'}
                    type="button"
                    color="secondary"
                    className="normal"
                    onClick={() => onClick('cancel')}
                    withAnimate
                />
                <Button
                    isSubmitting={isSubmitting || isConfirm}
                    title={nameConfirmBtn || 'Confirm'}
                    type="button"
                    color="primary"
                    arrowRight
                    className={`normal ${colorButtonConfirm}`}
                    onClick={handleConfirm}
                    withAnimate
                />
            </div>
        </StyledConfirmContent>
    );
};

export default withPopup(ConfirmContent, {
    overflow: 'visible',
    maxWidth: '800px',
    minWidth: '320px',
    width: '100%',
});
