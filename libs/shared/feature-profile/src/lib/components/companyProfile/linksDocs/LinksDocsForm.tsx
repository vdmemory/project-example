import {
    CompanyInfoMergedResponseType,
    CompanyInfoRequestType,
    CompanyRequestType,
    ControlTypeInnerForm,
    DocsType,
    LinksDocsRequestType,
    LinksType,
} from '@breef/shared/types';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    ChangeHandler,
    SubmitHandler,
    useController,
    useFieldArray,
    useForm,
    useFormState,
} from 'react-hook-form';
import _ from 'lodash';
import { Fragment, useEffect } from 'react';
import {
    DefaultInnerInput,
    Dropzone,
    File,
    InnerFieldWrapper,
    LinkButton,
    SaveButton,
} from '@breef/shared/ui-components';
import { toast } from 'react-toastify';
import { CloseIcon } from '@breef/ui-kit';
import {
    StyledFieldsWrapper,
    StyledLinksDocsForm,
} from './LinksDocsForm.styled';
import { linksDocsSchema } from '../../../utils/validation-forms/linksDocsSchema';
import { useDocumentController, useSaveDocument } from '@breef/shared/hooks';
import {
    useChangeCompanyInfoMutation,
    useChangeLinksDocsMutation,
} from '@breef/shared/data-access-profile';
import { DEFAULT_UPLOAD_TEXT_SIZE } from '@breef/shared/constants';

interface LinksDocsFormProps {
    isActiveForm?: boolean;
    companyType: 'client' | 'agency';
    companyInfoData?: CompanyInfoMergedResponseType;
}

export const LinksDocsForm = ({
    isActiveForm = true,
    companyType = 'agency',
    companyInfoData,
}: LinksDocsFormProps) => {
    const { links, docs } = companyInfoData ?? {};

    const [saveData, { isLoading, isSuccess, error }] =
        useChangeLinksDocsMutation();

    useEffect(() => {
        if (error) {
            const errorMessage =
                'Sorry, something went wrong. Please try again later';
            toast.error(errorMessage, { toastId: errorMessage });
        }
    }, [error]);

    const defaultValues = {
        links: links || [],
        docs: docs || [],
    };

    const methods = useForm<ControlTypeInnerForm>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: defaultValues,
        resolver: yupResolver(linksDocsSchema),
    });

    useEffect(() => {
        checkIsEqualForm(currentFormData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [methods.watch()]);

    const checkIsEqualForm = (formData: ControlTypeInnerForm) => {
        return _.isEqual(formData, defaultValues);
    };

    const handleSubmit: SubmitHandler<ControlTypeInnerForm> = formData => {
        if (!checkIsEqualForm(formData)) {
            saveData({
                ...formData,
            } as LinksDocsRequestType);
        }
    };

    const currentFormData = methods.getValues();
    // at least one url in links exists.
    const isLinksExists = methods
        .getValues('links')
        .some((link: LinksType) => link.link.length > 0);
    // at least one title in links exists.
    const isTitleExists = methods
        .getValues('links')
        .some((link: LinksType) => link.title.length > 0);

    const {
        fields: fieldsLink,
        remove: removeLink,
        append: appendLink,
    } = useFieldArray({
        control: methods.control,
        name: 'links',
    });

    const watchFieldArray = methods.watch('links');
    const controlledFields = fieldsLink.map((field, index) => {
        return {
            ...field,
            ...watchFieldArray[index],
        };
    });

    const updateLink = (index: number, link: string) => {
        methods.clearErrors(`links.${index}.link`);
        methods.setValue(`links.${index}.link`, link);
    };

    const updateTitle = (index: number, title: string) => {
        methods.clearErrors(`links.${index}.title`);
        methods.setValue(`links.${index}.title`, title);
    };

    const isDisabledLinks = methods.getValues('links').length >= 100;
    const lengthLinks = methods.getValues('links').length;

    const { field: fieldDocs } = useController({
        control: methods.control,
        name: 'docs',
    });

    const { saveDocument, handleDeleteLink } = useDocumentController({
        documentsValue: fieldDocs.value as DocsType[],
        onChange: fieldDocs.onChange as ChangeHandler,
    });

    const { uploadDocument, uploading } = useSaveDocument({
        saveDocument,
    });

    const handleChangeDropzone = (files: File[], currentFileId?: number) =>
        uploadDocument(files[0], currentFileId);

    useEffect(() => {
        if (links || docs) {
            methods.reset({ links, docs });
        }
    }, [links, docs, methods]);

    const isDisabledDocs = methods.getValues('docs').length >= 100;
    const lengthDocs = methods.getValues('docs').length;

    const renderLinksSection = (
        field: {
            id: number;
            link: string;
            title: string;
        },
        index: number,
    ) => (
        <div key={field.id} className="group-section">
            <StyledFieldsWrapper className="fields-wrapper title">
                <InnerFieldWrapper
                    isDisableLabelClick
                    labelText="Link Name"
                    isReadOnly={!isActiveForm}
                    error={
                        methods.getFieldState(`links.${index}.title`)?.error
                            ?.message
                    }
                >
                    <DefaultInnerInput
                        isDisabled={!isActiveForm}
                        value={field.title}
                        onChange={e => updateTitle(index, e.target.value)}
                        placeholder="Name"
                        maxLength={100}
                    />
                </InnerFieldWrapper>
            </StyledFieldsWrapper>
            <StyledFieldsWrapper className="fields-wrapper link">
                <InnerFieldWrapper
                    isDisableLabelClick
                    labelText="Url"
                    isReadOnly={!isActiveForm}
                    error={
                        methods.getFieldState(`links.${index}.link`)?.error
                            ?.message
                    }
                >
                    <DefaultInnerInput
                        isDisabled={!isActiveForm}
                        value={field.link}
                        onChange={e => updateLink(index, e.target.value)}
                        placeholder="Url"
                        maxLength={992}
                    />
                </InnerFieldWrapper>
            </StyledFieldsWrapper>

            <div className="icon-delete" onClick={() => removeLink(index)}>
                <CloseIcon />
            </div>
        </div>
    );

    return (
        <StyledLinksDocsForm onSubmit={methods.handleSubmit(handleSubmit)}>
            <div className="links-section">
                {!!lengthLinks && controlledFields.map(renderLinksSection)}
                {!isDisabledLinks && (
                    <LinkButton
                        className="add-link-button"
                        line={false}
                        icon="plus"
                        name="Add Link"
                        onClick={() =>
                            appendLink({ id: Date.now(), title: '', link: '' })
                        }
                    />
                )}
            </div>

            <div className="documents-section">
                <InnerFieldWrapper
                    labelText="Documents"
                    isReadOnly={!isActiveForm}
                    isDisableLabelClick
                >
                    <Fragment>
                        {!!lengthDocs && (
                            <div className="files-wrapper">
                                {fieldDocs.value.map(item => (
                                    <File
                                        key={item.id}
                                        name={item.title}
                                        link={item.link}
                                        onRemove={() =>
                                            handleDeleteLink(item.id)
                                        }
                                    />
                                ))}
                            </div>
                        )}
                        <Dropzone
                            className="dropzone-wrapper"
                            tip={DEFAULT_UPLOAD_TEXT_SIZE}
                            onChange={handleChangeDropzone}
                            uploading={uploading}
                            disabled={isDisabledDocs}
                        />
                    </Fragment>
                </InnerFieldWrapper>
            </div>

            <SaveButton
                type="submit"
                isSubmitting={isLoading}
                isSuccess={isSuccess}
                disabled={
                    isLoading ||
                    Object.keys(methods.formState.errors).length !== 0 ||
                    !(isLinksExists || isTitleExists) ||
                    !isActiveForm ||
                    checkIsEqualForm(currentFormData)
                }
            />
        </StyledLinksDocsForm>
    );
};

export default LinksDocsForm;
