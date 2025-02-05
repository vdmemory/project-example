import React, { FC, useEffect } from 'react';
import { StyledProjectScopeStep } from './ProjectScopeStep.styled';
import {
    Dropdown,
    Label,
    Pill,
    RadioRectangle,
    Search,
    Select,
} from '@breef/ui-kit';
import { useGetCapabilitiesQuery } from '@breef/shared/data-access-project-create';
import { useController, useFieldArray, useFormContext } from 'react-hook-form';
import { ProjectScopeFormType } from '../../../types/projectCreateTypes';
import {
    BudgetType,
    listBudget,
    listProjectStartDay,
    PenNavNames,
    ProjectStartDay,
} from '@breef/shared/constants';
import { StyledFlexColumn, StyledFlexRow } from '../ProjectCreate.styled';
import { PillsWrapper } from '../pillsWrapper/PillsWrapper';
import { ListIdNameType } from '@breef/shared/types';

type CustomController = {
    value: unknown;
    onChange: (value: unknown) => void;
};

interface ProjectScopeStepProps {
    setPrevSkillsIds: (value: number[]) => void;
}

export const ProjectScopeStep: FC<ProjectScopeStepProps> = ({
    setPrevSkillsIds,
}) => {
    const { data: capabilities } = useGetCapabilitiesQuery({});
    const { data: capabilitiesSuggested } = useGetCapabilitiesQuery({
        suggested: true,
        limit: 15,
    });
    const { control, trigger, getValues } =
        useFormContext<ProjectScopeFormType>();

    const agencySkillsField = useFieldArray({
        control,
        name: 'agencySkills',
        keyName: 'fieldId',
    });
    const { field: fieldBudgetType } = useController({
        control,
        name: 'budgetType',
    });
    const { field: fieldBudgetRange, fieldState: fieldBudgetRangeState } =
        useController({
            control,
            name: 'budgetRange',
        });
    const { field: fieldStartDay, fieldState: fieldStartDayState } =
        useController({ control, name: 'startDay' });

    const agencySkillsFieldError = useController({
        control,
        name: 'agencySkills',
    }).fieldState.error?.message;

    const availableCapabilities =
        capabilities?.filter(
            item =>
                !agencySkillsField.fields.some(skill => skill.id === item.id),
        ) ?? [];

    const handleSelectSkill = (value: { value: string; label: string }) => {
        agencySkillsField.append({
            id: Number(value.value),
            name: value.label,
            note: '',
            isCustomerNote: false,
        });
    };

    const renderRadio = (
        label: string,
        value: string | boolean,
        controller: CustomController,
    ) => (
        <RadioRectangle
            onChange={() => controller.onChange(value)}
            checked={controller.value === value}
            label={label}
        />
    );

    const filterCriteriaSuggestedSkills = (skill: ListIdNameType) =>
        !agencySkillsField.fields.some(item => item.id === skill.id);

    useEffect(() => {
        const skills = getValues('agencySkills').map(skill => skill.id);
        setPrevSkillsIds(skills);
    }, []);

    return (
        <StyledProjectScopeStep>
            <Label
                id={PenNavNames.AGENCY_SKILLS_FIELD}
                forId="agency-skills-field-search"
                text="Agency Skills"
                subtext="What type of agency are you looking for? Select one or multiple."
            >
                <Dropdown
                    options={availableCapabilities.map(item => ({
                        value: item.id + '',
                        label: item.name,
                    }))}
                    onSelect={handleSelectSkill}
                    isSearchable
                    isSelectable={false}
                    isSearchIcon
                    disabled={agencySkillsField.fields.length >= 3}
                    onBlur={() => trigger('agencySkills')}
                    error={agencySkillsFieldError}
                    placeholder="Search"
                />
                {agencySkillsField.fields.length !== 0 && (
                    <PillsWrapper title="Selected" isSelectedWrapper>
                        {agencySkillsField.fields.map((item, idx) => (
                            <Pill
                                key={item.name + item.id}
                                onClick={() => agencySkillsField.remove(idx)}
                                label={item.name}
                                iconType="remove"
                                iconSide="left"
                                color="orange"
                                isResizeMobile={false}
                            />
                        ))}
                    </PillsWrapper>
                )}
                <PillsWrapper title="Suggested">
                    {capabilitiesSuggested
                        ?.filter(filterCriteriaSuggestedSkills)
                        .slice(0, 12)
                        .map(item => (
                            <Pill
                                key={item.name + item.id}
                                onClick={() =>
                                    agencySkillsField.append({
                                        ...item,
                                        note: '',
                                        isCustomerNote: false,
                                    })
                                }
                                label={item.name}
                                iconType="add"
                                iconSide="left"
                                disabled={agencySkillsField.fields.length >= 3}
                                isResizeMobile={false}
                                isTransparentInitially
                            />
                        ))}
                </PillsWrapper>
            </Label>
            <Label
                id={PenNavNames.BUDGET_RANGE_FIELD}
                forId="budget-range"
                text="Budget Range"
                subtext="What is your project budget? Select a range."
            >
                <StyledFlexColumn>
                    <StyledFlexRow>
                        {renderRadio(
                            'Monthly',
                            BudgetType.Monthly,
                            fieldBudgetType,
                        )}
                        {renderRadio(
                            'Entire Project',
                            BudgetType.EntireProject,
                            fieldBudgetType,
                        )}
                    </StyledFlexRow>
                    <Select
                        {...fieldBudgetRange}
                        list={listBudget}
                        placeholder="Select Range"
                        className="field-input"
                        error={fieldBudgetRangeState.error?.message}
                    />
                </StyledFlexColumn>
            </Label>
            <Label
                id="project-kickoff-select"
                forId="project-kickoff"
                text="Project Timing"
                subtext="When do you want to start work?"
            >
                <StyledFlexColumn>
                    <StyledFlexRow>
                        {renderRadio('Now', ProjectStartDay.Now, fieldStartDay)}
                        <RadioRectangle
                            onChange={() => fieldStartDay.onChange('')}
                            checked={
                                fieldStartDay.value !== ProjectStartDay.Now
                            }
                            label="Later"
                        />
                    </StyledFlexRow>
                    {fieldStartDay.value !== ProjectStartDay.Now && (
                        <Select
                            {...fieldStartDay}
                            className="field-select"
                            error={fieldStartDayState.error?.message}
                            placeholder="Select Option"
                            list={listProjectStartDay.filter(
                                item => item.value !== ProjectStartDay.Now,
                            )}
                        />
                    )}
                </StyledFlexColumn>
            </Label>
        </StyledProjectScopeStep>
    );
};
