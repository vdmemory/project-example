import React, { FC } from 'react';
import { StyledFinishProjectPopup } from './FinishProjectPopup.styled';
import { Popup } from '../Popup';
import { Button } from '@breef/ui-kit';
import StepCard from './stepCard/StepCard';
import { useMediaContext } from '@breef/shared/hooks';

interface FinishProjectPopupProps {
    close: () => void;
}
const FinishProjectPopup: FC<FinishProjectPopupProps> = ({ close }) => {
    const { isMobile } = useMediaContext();

    return (
        <Popup close={close} style={{ minWidth: isMobile ? 'auto' : '743px' }}>
            <StyledFinishProjectPopup>
                <h1>CREATE A PROJECT</h1>
                <p>
                    We’ll help you build the perfect project scope (in 5 mins).
                    Let’s do this!
                </p>
                <div className="finish-steps-wrapper">
                    {stepsConfig.map((item, index) => (
                        <StepCard
                            key={item.label}
                            stepNumber={index + 1}
                            {...item}
                        />
                    ))}
                </div>
                <Button label="FINISH MY PROJECT" onClick={close} />
            </StyledFinishProjectPopup>
        </Popup>
    );
};

export default FinishProjectPopup;

export const stepsConfig = [
    {
        label: 'Finish Your Scope (5 mins)',
        text: 'Add a few key details to complete your project scope.',
    },
    {
        label: 'Post Your Project ($99)',
        text: 'Post your project so that the best agencies can submit pitches.',
    },
    {
        label: 'Unlock Agency Pitches (< 5 days)',
        text: 'Receive pitches from vetted agencies, curated for your project.',
    },
];
