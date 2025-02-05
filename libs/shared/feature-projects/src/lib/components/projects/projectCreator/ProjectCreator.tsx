import React, { FC, useState } from 'react';
import { StyledProjectCreator } from './ProjectCreator.styled';
import { startNewProjectImage } from '@breef/shared/assets';
import ChipCheckbox from './skill/ChipCheckbox';
import { ArrowRightIcon, Button } from '@breef/ui-kit';
import { PROJECT_EDIT_ROUTE } from '@breef/shared/constants';
import { useRouter } from 'next/router';
import { useCreatorSkills } from '../../../hooks/useCreatorSkills';
import { useCreatorCreateProjectMutation } from '@breef/shared/data-access-project-create';
import { toast } from 'react-toastify';

export const ProjectCreator: FC = () => {
    const router = useRouter();
    const skills = useCreatorSkills();
    const [createProject] = useCreatorCreateProjectMutation();
    const [value, setValue] = useState<number[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChangeSkills = (id: number) => {
        if (value.some(item => item === id)) {
            return setValue(value.filter(item => item !== id));
        }
        return setValue([...value, id]);
    };

    const handleClick = async () => {
        try {
            setIsSubmitting(true);
            const projectId = await createProject(value).unwrap();
            const isNotOnlyOther = value.filter(item => item).length !== 0;
            await router.push(
                {
                    pathname: PROJECT_EDIT_ROUTE.reverse({ projectId }) || '',
                    query: isNotOnlyOther ? { popup: true } : undefined,
                },
                undefined,
                { shallow: true },
            );
        } catch (e) {
            const message = 'Something went wrong when creating project.';
            toast.error(message, { toastId: message });
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderSkill = (skill: { id: number; name: string }) => {
        const isChecked = value.some(item => item === skill.id);
        return (
            <ChipCheckbox
                key={skill.id}
                checked={isChecked}
                name={skill.name}
                onChange={() => handleChangeSkills(skill.id)}
                disabled={value.length >= 3 && !isChecked}
            />
        );
    };

    return (
        <StyledProjectCreator>
            <div className="project-creator-wrapper">
                <h2>PROJECT CREATOR</h2>
                <div className="project-creator-card">
                    <div className="image-wrapper">
                        <img
                            src={startNewProjectImage.src}
                            alt="Start New Project"
                        />
                    </div>
                    <div className="project-creator-content-wrapper">
                        <div className="project-creator-content-header">
                            <h3>START A PROJECT</h3>
                            <span>
                                Select the agency skills you need for your next
                                project.
                            </span>
                        </div>
                        <div className="skills-wrapper">
                            {skills.map(renderSkill)}
                        </div>
                        <Button
                            className="button-add-details"
                            label="Add Details"
                            icon={<ArrowRightIcon />}
                            iconPlacement="right"
                            type="button"
                            variant="ghost"
                            size="medium"
                            onClick={handleClick}
                            isDisabled={value.length === 0 || value.length > 3}
                            isSubmitted={isSubmitting}
                        />
                    </div>
                </div>
            </div>
        </StyledProjectCreator>
    );
};

export default ProjectCreator;
