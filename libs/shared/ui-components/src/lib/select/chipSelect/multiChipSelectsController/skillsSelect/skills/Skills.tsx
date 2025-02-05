import { StyledSkills } from './Skills.styled';
import React from 'react';
import ChipSelect from '../../../ChipSelect';

interface ServicesProps {
    value: { id: number; name: string }[];
    onChange: (value: { id: number | string; name: string }[]) => void;
    label: string;
    skills: { id: number; name: string }[];
}

export const Skills = ({ value, onChange, skills, label }: ServicesProps) => {
    return (
        <StyledSkills>
            <div className="title-section">{label}</div>
            <ChipSelect
                multiple
                handleSelect={onChange}
                initialSelected={value}
                initialOptions={skills}
            />
        </StyledSkills>
    );
};

export default Skills;
