import {
    Controller,
    ControllerRenderProps,
    FieldArrayWithId,
    useFieldArray,
    UseFormReturn,
} from 'react-hook-form';
import { ProjectScopeFormType } from '../../../../types/projectCreateTypes';
import { useGetCapabilitiesQuery } from '@breef/shared/data-access-project-create';
import { ChangeEvent } from 'react';
import { QueryValidateDropDown, Textarea } from '@breef/ui-kit';

export const Skill = ({
    skill,
    index,
    methodsProjectScopeForm,
    clearSkillError,
    getErrorSkill,
    validateSkillQuery,
    setTemplate,
    setTemplateMeta,
}: {
    index: number;
    skill: { id: number; name: string };
    methodsProjectScopeForm: UseFormReturn<ProjectScopeFormType>;
    clearSkillError: (index: number) => void;
    getErrorSkill: (index: number) => string | undefined;
    validateSkillQuery: (query: string, index: number) => void;
    setTemplate: (idSkill: number) => Promise<void>;
    setTemplateMeta: {
        id: number | null;
        isFetching: boolean;
    };
}) => {
    const values = methodsProjectScopeForm.getValues(`agencySkills.${index}`);
    const skillId = values.id;

    const agencySkillsField = useFieldArray({
        control: methodsProjectScopeForm.control,
        name: 'agencySkills',
        keyName: 'fieldId',
    });

    const { data: capabilities } = useGetCapabilitiesQuery({});

    const getAvailableCapabilities = (excludeId: number) =>
        capabilities?.filter(
            item =>
                !agencySkillsField.fields.some(skill => skill.id === item.id) ||
                excludeId === item.id,
        ) ?? [];

    const handleSelectSkill = (
        option: { value: string; label: string },
        note: string,
        index: number,
        isCustomerNote: boolean,
    ) => {
        agencySkillsField.update(index, {
            id: Number(option.value),
            name: option.label,
            note,
            isCustomerNote,
        });
        validateSkillQuery(option.label, index);
        setTemplate(Number(option.value));
    };

    const handleChangeSkillNote = (
        field: ControllerRenderProps<
            ProjectScopeFormType,
            `agencySkills.${number}.note`
        >,
        value: string | ChangeEvent<HTMLTextAreaElement>,
    ) => {
        field.onChange(value);
        const setIsCustomerNoteForm = (isCustomer: boolean) => {
            methodsProjectScopeForm.setValue(
                `agencySkills.${index}.isCustomerNote`,
                isCustomer,
            );
        };

        if (!value) return setIsCustomerNoteForm(false);
        setIsCustomerNoteForm(true);
    };

    const isLoadingTextarea =
        setTemplateMeta.id === skillId && setTemplateMeta.isFetching;

    const classesTextarea = `skill-textarea ${
        isLoadingTextarea ? 'loading' : ''
    }`;

    const classesSkillLabel = `skill-label ${
        isLoadingTextarea ? 'loading' : ''
    }`;

    return (
        <div className="skill-item" key={index + '-skill'}>
            <QueryValidateDropDown
                error={getErrorSkill(index)}
                options={getAvailableCapabilities(skill.id).map(item => ({
                    value: item.id + '',
                    label: item.name,
                }))}
                onSelect={value =>
                    handleSelectSkill(
                        value,
                        values.note,
                        index,
                        values.isCustomerNote,
                    )
                }
                option={{
                    value: values.id + '',
                    label: values.name,
                }}
                isSearchable
                isSearchIcon
                placeholder="Search"
                onValidate={query => validateSkillQuery(query, index)}
                onChange={() => clearSkillError(index)}
            />
            <span className={classesSkillLabel}>
                What will your agency support with? Add specific deliverables or
                details.
            </span>
            <Controller
                control={methodsProjectScopeForm.control}
                name={`agencySkills.${index}.note`}
                render={({ field }) => (
                    <Textarea
                        className={classesTextarea}
                        value={values.note}
                        onChange={value => handleChangeSkillNote(field, value)}
                        placeholder=""
                        maxLength={10000}
                    />
                )}
            />
        </div>
    );
};
