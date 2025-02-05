import { TitleStep } from '@breef/shared/ui-components';
import React from 'react';
import { StyledWhatsNext } from './WhatsNext.styled';
import { whatsNextConfig } from '../configs/whatsNextConfig';
type Props = {
    step: number;
    subStep: number;
};

const WhatsNext: React.FC<Props> = ({ step, subStep }) => {
    return (
        <StyledWhatsNext>
            <TitleStep
                className="header-title"
                step={step}
                numberSteps={subStep}
                title={'CONGRATS! Here’s \nwhat’s next.'}
            />
            <div className="card">
                {whatsNextConfig.map(item => (
                    <div className="card-wrapper" key={item.id}>
                        <div className="card-item">
                            <img
                                src={item.img}
                                className={item.imgClassName}
                                alt={item.imgClassName}
                            />
                            <h3 className="card-item--title">{item.title}</h3>
                            <p className="card-item--subtitle">
                                {item.subtitle}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </StyledWhatsNext>
    );
};
export default WhatsNext;
