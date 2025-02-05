import { PassReasonsListType } from '@breef/shared/types';
import { Button, ButtonSelect, CloseIcon } from '@breef/ui-kit';
import { Global } from '@emotion/react';
import { useState } from 'react';
import {
    popupGlobalStyles,
    StyledPreviousWorkForm,
} from './ChoiceOfInterestForm.styled';

interface ChoiceOfInterestFormProps {
    className?: string;
    onSubmit?: (passReasons: PassReasonsListType[]) => void;
    onClose?: () => void;
    isSubmitted?: boolean;
    list: PassReasonsListType[];
}

export const ChoiceOfInterestForm = ({
    className,
    onSubmit,
    onClose,
    isSubmitted,
    list,
}: ChoiceOfInterestFormProps) => {
    const [passReasons, setPassReasons] = useState<PassReasonsListType[]>([]);
    const isNotSelected = passReasons.length === 0;

    const handleClick = () => onSubmit?.(passReasons);

    const formClassName = className
        ? `choice-of-interest-form ${className}`
        : 'choice-of-interest-form';

    const title = 'Here’s to the next!';
    const description =
        'We’re sorry this wasn’t the perfect fit. Tell us why — your feedback informs future projects we invite you to, so that we get it right next time.';

    const renderList = ({ id, name, description }: PassReasonsListType) => {
        const isSelected = passReasons.some(reason => reason.id === id);
        const handleSelect = () => {
            if (isSelected) {
                setPassReasons(passReasons.filter(reason => reason.id !== id));
            } else {
                setPassReasons([...passReasons, { id, name, description }]);
            }
        };

        return (
            <ButtonSelect
                key={id}
                label={name}
                description={description}
                checked={isSelected}
                onChange={handleSelect}
            />
        );
    };

    return (
        <StyledPreviousWorkForm className={formClassName}>
            <Global styles={popupGlobalStyles} />
            <div className="form-header">
                <div className="group">
                    <h3 className="title">{title}</h3>
                    <p className="description">{description}</p>
                </div>

                <div className="close-wrapper">
                    <CloseIcon
                        className="close-button"
                        role="button"
                        onClick={onClose}
                    />
                </div>
            </div>
            <div className="form-body">{list?.map(renderList)}</div>
            <div className="form-footer">
                <Button
                    label={'SUBMIT'}
                    size="medium"
                    isUppercase
                    isSubmitted={isSubmitted}
                    onClick={handleClick}
                    className="button-save"
                    isDisabled={isNotSelected}
                />
            </div>
        </StyledPreviousWorkForm>
    );
};
