import { ProjectStep } from '@breef/shared/constants';
import { useGetCapabilitiesQuery } from '@breef/shared/data-access-project-create';
import { useEffect, useState } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { ProjectScopeFormType } from '../types/projectCreateTypes';

export const useValidateSkillsQuery = (
    methodsProjectScopeForm: UseFormReturn<ProjectScopeFormType>,
    step: ProjectStep,
) => {
    const { data: capabilities } = useGetCapabilitiesQuery({});
    const agencySkillsField = useFieldArray({
        control: methodsProjectScopeForm.control,
        name: 'agencySkills',
        keyName: 'fieldId',
    });

    const getAvailableCapabilities = (excludeId: number) => {
        const getIsSkillExist = (id: number) => {
            return !methodsProjectScopeForm
                .getValues('agencySkills')
                .some(skill => skill.id === id);
        };
        return (
            capabilities?.filter(
                item => getIsSkillExist(item.id) || excludeId === item.id,
            ) ?? []
        );
    };

    const [errorSkills, setErrorSkills] = useState<
        {
            message: string;
            key: number;
        }[]
    >([]);

    useEffect(() => {
        if (step === ProjectStep.PERSONALIZE_SCOPE) {
            return;
        }
        setErrorSkills([]);
    }, [step]);

    const handleValidateSkillQuery = (query: string, key: number) => {
        const errorMessage = 'Skill doesn’t exist';

        if (!query) {
            setErrorSkills(errorSkills.filter(item => item.key !== key));
            return;
        }

        const skillValue = methodsProjectScopeForm.getValues(
            `agencySkills.${key}`,
        );

        const foundQuery = getAvailableCapabilities(skillValue.id).find(
            item => item.name.toLowerCase() === query.toLowerCase(),
        );

        if (foundQuery) {
            setErrorSkills(errorSkills.filter(item => item.key !== key));
            return;
        }

        setErrorSkills(
            errorSkills.some(item => item.key === key)
                ? errorSkills
                : [...errorSkills, { message: errorMessage, key }],
        );
    };

    const handleClearSkillError = (key: number) => {
        setErrorSkills(errorSkills.filter(item => item.key !== key));
    };

    const getErrorSkill = (key: number) => {
        return errorSkills.find(item => item.key === key)?.message;
    };

    return {
        handleValidateSkillQuery,
        handleClearSkillError,
        getErrorSkill,
        isErrorsSkills: errorSkills.length > 0,
        getAvailableCapabilities,
    };
};
