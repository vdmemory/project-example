import { MethodsProjectCreateType } from '../types/projectCreateTypes';
import { useLazyGetTemplateQuery } from '@breef/shared/data-access-project-create';
import { ProjectTemplateType } from '@breef/shared/types';
import { useState } from 'react';

export const useAutoFillTemplate = () => {
    const [getTemplate, { isFetching }] = useLazyGetTemplateQuery();
    const [id, setId] = useState<number | null>(null);

    const updateSkill = (
        template: ProjectTemplateType,
        skill: {
            id: number;
            name: string;
            note: string;
            isCustomerNote: boolean;
        },
    ) => {
        const templateSkill = template.agencySkills.find(
            item => item.id === skill.id,
        );
        return (
            templateSkill ?? {
                ...skill,
                note: '',
            }
        );
    };

    const setTemplateData = async (
        methods: MethodsProjectCreateType,
        currentSkills: {
            id: number;
            name: string;
            note: string;
            isCustomerNote: boolean;
        }[],
        currentDescription: string,
    ) => {
        const currentSkillsIds = currentSkills.map(skill => skill.id);
        const template = await getTemplate(currentSkillsIds).unwrap();

        const templateSkills = currentSkills.map(skill => {
            return updateSkill(template, skill);
        });
        methods.projectScope.setValue('agencySkills', templateSkills);
        methods.personalizeScope.setValue(
            'description',
            template?.description || currentDescription,
        );
    };

    const setTemplateOnlySkill = async (
        methods: MethodsProjectCreateType,
        currentSkills: {
            id: number;
            name: string;
            note: string;
            isCustomerNote: boolean;
        }[],
        idSkill: number,
    ) => {
        const currentSkill = methods.projectScope
            .getValues()
            .agencySkills.find(skill => skill.id === idSkill);
        const isCustomerNote = currentSkill?.isCustomerNote;

        if (isCustomerNote) return;

        setId(idSkill);
        const currentSkillsIds = currentSkills.map(skill => skill.id);
        const template = await getTemplate(currentSkillsIds).unwrap();
        const templateSkills = currentSkills.map(skill => {
            if (skill.id === idSkill) {
                return updateSkill(template, skill);
            }
            return skill;
        });
        methods.projectScope.setValue('agencySkills', templateSkills);
        setId(null);
    };

    return {
        setTemplateData,
        setTemplateOnlySkill,
        setTemplateMeta: { id, isFetching },
    };
};
