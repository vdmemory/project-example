import { ChangeEvent, FC, Fragment, use, useEffect, useState } from 'react';
import {
    AddCircleOrangeIcon,
    Button,
    QueryValidateDropDown,
    Label,
    LinkUi,
    Textarea,
} from '@breef/ui-kit';
import {
    ChangeHandler,
    Controller,
    ControllerRenderProps,
    FieldArrayWithId,
    useController,
    useFieldArray,
    useFormContext,
    UseFormReturn,
} from 'react-hook-form';
import { useGetCapabilitiesQuery } from '@breef/shared/data-access-project-create';
import {
    PersonalizeScopeFormType,
    ProjectScopeFormType,
} from '../../../types/projectCreateTypes';
import {
    useDocumentController,
    useMediaContext,
    useSaveDocument,
} from '@breef/shared/hooks';
import { ListType } from '@breef/shared/types';
import { StyledPersonalizeScopeStep } from './PersonalizeScopeStep.styled';
import AdditionalLink from './additionalLink/AdditionalLink';
import { FileItem } from '@breef/shared/ui-components';
import { Tooltip } from './tooltip/Tooltip';
import { useIsDisplayTooltip } from './tooltip/useIsDisplayTooltip';
import { AnimatePresence } from 'framer-motion';
import { PenNavNames } from '@breef/shared/constants';
import { Skill } from './skill/Skill';
import { PROJECT_OVERVIEW_FIELD_MAX_LENGTH } from '../../../utils/constants';

interface ProjectDetailsStepProps {
    methodsProjectScopeForm: UseFormReturn<ProjectScopeFormType>;
    validateSkillQuery: (query: string, key: number) => void;
    clearSkillError: (key: number) => void;
    getErrorSkill: (key: number) => string | undefined;
    setTemplate: (idSkill: number) => Promise<void>;
    setTemplateMeta: {
        id: number | null;
        isFetching: boolean;
    };
}
export const PersonalizeScopeStep: FC<ProjectDetailsStepProps> = ({
    methodsProjectScopeForm,
    validateSkillQuery,
    clearSkillError,
    getErrorSkill,
    setTemplate,
    setTemplateMeta,
}) => {
    const MAX_ATTACHMENTS = 5;
    const { isMobile } = useMediaContext();
    const { control, getValues, trigger } =
        useFormContext<PersonalizeScopeFormType>();
    const { field: fieldDescription, fieldState: fieldDescriptionState } =
        useController({
            control,
            name: 'description',
        });

    const agencySkillsField = useFieldArray({
        control: methodsProjectScopeForm.control,
        name: 'agencySkills',
        keyName: 'fieldId',
    });
    const agencySkillsFieldController = useController({
        control: methodsProjectScopeForm.control,
        name: 'agencySkills',
    });

    const { field: fieldFiles, fieldState: fieldFilesState } = useController({
        control,
        name: 'files',
    });

    const {
        fields: fieldsBrandLinks,
        remove: removeBrandLinks,
        append: appendBrandLinks,
    } = useFieldArray({
        control,
        name: 'brandLinks',
    });
    const brandLinksFieldController = useController({
        control,
        name: 'brandLinks',
    });

    const { saveDocument, handleDeleteLink } = useDocumentController({
        documentsValue: fieldFiles.value as ListType[],
        onChange: fieldFiles.onChange as ChangeHandler,
    });

    const { uploadDocument, uploading } = useSaveDocument({
        saveDocument,
    });

    const handleUploadFile = (files: File[], currentFileId?: number) =>
        uploadDocument(files[0], currentFileId);

    useEffect(() => {
        return () => {
            const cleanSkillsList = methodsProjectScopeForm
                .getValues('agencySkills')
                .filter(item => item.id !== -1);
            agencySkillsFieldController.field.onChange(cleanSkillsList);
            brandLinksFieldController.field.onChange(
                getValues('brandLinks').filter(item => item.link || item.title),
            );
        };
    }, []);

    const { isTooltipProjectOverview } = useIsDisplayTooltip([
        methodsProjectScopeForm.getValues('agencySkills').length,
    ]);

    const renderSkill = (
        skill: FieldArrayWithId<
            ProjectScopeFormType,
            'agencySkills',
            'fieldId'
        >,
        key: number,
    ) => {
        return (
            <Skill
                skill={skill}
                key={skill.id}
                index={key}
                methodsProjectScopeForm={methodsProjectScopeForm}
                clearSkillError={clearSkillError}
                getErrorSkill={getErrorSkill}
                validateSkillQuery={validateSkillQuery}
                setTemplate={setTemplate}
                setTemplateMeta={setTemplateMeta}
            />
        );
    };

    useEffect(() => {
        trigger('description');
    }, []);

    return (
        <StyledPersonalizeScopeStep>
            <Label
                id="project-overview-field"
                forId="project-overview-field-textarea"
                text="Project Overview"
                subtext="Describe your project goals, milestones,  deliverables and KPIs."
            >
                <Textarea
                    {...fieldDescription}
                    wrapperClassName="project-overview-textarea"
                    maxLength={PROJECT_OVERVIEW_FIELD_MAX_LENGTH}
                    error={
                        fieldDescriptionState.error?.message ??
                        fieldFilesState.error?.message
                    }
                    placeholder=""
                    onChangeAttachment={handleUploadFile}
                    isDisableAttachButton={
                        uploading || fieldFiles.value.length >= MAX_ATTACHMENTS
                    }
                >
                    {!isMobile && (
                        <AnimatePresence>
                            {isTooltipProjectOverview && (
                                <Tooltip text="Personalize based on your project + goals." />
                            )}
                        </AnimatePresence>
                    )}
                </Textarea>
                {fieldFiles.value.length !== 0 && (
                    <div className="files-wrapper">
                        {fieldFiles.value.map(item => (
                            <FileItem
                                key={item.id}
                                title={item.title}
                                link={item.link}
                                onRemove={() => handleDeleteLink(item.id)}
                            />
                        ))}
                    </div>
                )}
                <div className="additional-links-wrapper">
                    {fieldsBrandLinks.map(({ id }, index) => (
                        <AdditionalLink
                            key={id}
                            className="additional-link"
                            path={`brandLinks.${index}`}
                            onRemove={() => removeBrandLinks(index)}
                            isLastLink={false}
                        />
                    ))}
                    <LinkUi
                        title="Add Link"
                        variant="decoration-none"
                        onClick={() => appendBrandLinks(defaultValueBrandLink)}
                        iconLeft={<AddCircleOrangeIcon />}
                    />
                </div>
            </Label>
            <Label
                id={PenNavNames.AGENCY_SKILLS_FIELD}
                forId="agency-skills-field-search"
                text="Agency Skills"
                subtext="What type of agency are you looking for?"
            >
                {agencySkillsField.fields.map(renderSkill)}
                {agencySkillsField.fields.length < 3 && (
                    <Button
                        className="button-add-skill"
                        label="+ Add skill"
                        onClick={() =>
                            agencySkillsField.append({
                                id: -1,
                                name: '',
                                note: '',
                                isCustomerNote: false,
                            })
                        }
                        variant="outlined"
                        size="small"
                        isUppercase
                    />
                )}
            </Label>
        </StyledPersonalizeScopeStep>
    );
};

export default PersonalizeScopeStep;

const defaultValueBrandLink = { title: '', link: '' };
