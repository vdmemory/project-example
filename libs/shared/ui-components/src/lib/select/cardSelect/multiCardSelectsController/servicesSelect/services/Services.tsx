import { StyledServices } from './Services.styled';
import { CardSelect } from '../../../CardSelect';
import React from 'react';
import { ScrollBar } from '../../../../../scrollers/Scrollbar';
import { IS_CLIENT_PLATFORM } from '@breef/shared/constants';

interface ServicesProps {
    value: { id: number; name: string }[];
    onChange: (value: { id: number | string; name: string }[]) => void;
    label: string;
    services: { id: number; name: string }[];
}

export const Services = ({
    value,
    onChange,
    services,
    label,
}: ServicesProps) => {
    const isMobileScreen = IS_CLIENT_PLATFORM && window.screen.width <= 768;
    return (
        <StyledServices>
            <div className="title-section">{label}</div>
            <ScrollBar scroll="horizontal" hideNavButtons={isMobileScreen}>
                <CardSelect
                    multiple
                    initialOptions={services}
                    initialSelected={value}
                    handleSelect={onChange}
                    cardPreset="small"
                />
            </ScrollBar>
        </StyledServices>
    );
};

export default Services;
