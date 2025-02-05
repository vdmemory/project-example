import {
    CompanyInfoMergedResponseType,
    CompanyInfoRequestType,
    ControlTypeInnerForm,
    IndustriesTagsRequestType,
    IndustriesTagsType,
    IndustriesType,
    TagsType,
} from '@breef/shared/types';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    ChangeHandler,
    SubmitHandler,
    useController,
    useForm,
} from 'react-hook-form';
import { industriesTagsSchema } from '../../../utils/validation-forms/industriesTagsSchema';
import _ from 'lodash';
import {
    StyledFieldsWrapper,
    StyledIndustriesTagsForm,
} from './IndustriesTagsForm.styled';
import { useEffect } from 'react';
import {
    ChipButton,
    ChipDropdownDefinesList,
    InnerFieldWrapper,
    SaveButton,
} from '@breef/shared/ui-components';
import { toast } from 'react-toastify';
import { useTagsControl } from './useTagsControl';
import { Search, SearchOld } from '@breef/ui-kit';
import {
    useChangeCompanyInfoMutation,
    useChangeIndustriesTagsMutation,
} from '@breef/shared/data-access-profile';

interface IndustriesTagsFormProps {
    companyInfoData?: CompanyInfoMergedResponseType;
    isActiveForm?: boolean;
    companyType: 'client' | 'agency';
}

export const IndustriesTagsForm = ({
    companyInfoData,
    isActiveForm = true,
    companyType = 'agency',
}: IndustriesTagsFormProps) => {
    const { industries, tags } = companyInfoData ?? {};

    const [saveData, { isLoading, isSuccess, error }] =
        useChangeIndustriesTagsMutation();

    useEffect(() => {
        if (error) {
            const errorMessage =
                'Sorry, something went wrong. Please try again later';
            toast.error(errorMessage, { toastId: errorMessage });
        }
    }, [error]);

    const defaultValues = {
        industries: industries || [],
        tags: tags || [],
    };

    const methods = useForm<ControlTypeInnerForm>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: defaultValues,
        resolver: yupResolver(industriesTagsSchema),
    });

    const currentFormData = methods.getValues();

    const { field: fieldIndustries, fieldState: fieldIndustriesState } =
        useController({
            control: methods.control,
            name: 'industries',
        });

    const { field: fieldTags, fieldState: fieldTagsState } = useController({
        control: methods.control,
        name: 'tags',
    });

    const {
        searchResult,
        setQuery,
        handleSelectTag,
        removeTag,
        addTag,
        fetchCreateTag,
        isSubmittedTag,
        isLoadingSearch,
    } = useTagsControl(fieldTags.value, fieldTags.onChange, () =>
        methods.clearErrors('tags'),
    );

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
            } as IndustriesTagsRequestType);
        }
    };

    useEffect(() => {
        if (industries || tags) {
            methods.reset({
                industries: industries,
                tags: tags,
            });
        }
    }, [industries, tags, methods]);

    const isDisabledTags = methods.getValues('tags').length >= 10;

    const renderSelectedTagsSection = () => {
        if (!fieldTags.value) return;
        if (!fieldTags.value.length) return null;

        return (
            <div className={'chip-group'}>
                {fieldTags.value.map(({ id, name }) => (
                    <ChipButton
                        key={name + id}
                        id={id}
                        name={name}
                        action="remove"
                        onClick={() => removeTag(id)}
                    />
                ))}
            </div>
        );
    };

    return (
        <StyledIndustriesTagsForm onSubmit={methods.handleSubmit(handleSubmit)}>
            <StyledFieldsWrapper className="fields-wrapper">
                <InnerFieldWrapper
                    labelText="INDUSTRIES"
                    isReadOnly={!isActiveForm}
                    error={fieldIndustriesState.error?.message}
                >
                    <ChipDropdownDefinesList
                        listType={'industries'}
                        initialListValues={fieldIndustries.value}
                        onClick={fieldIndustries.onChange as ChangeHandler}
                    />
                </InnerFieldWrapper>
            </StyledFieldsWrapper>
            <StyledFieldsWrapper className="fields-wrapper">
                <InnerFieldWrapper
                    labelText="TAGS (Select up to 10)"
                    isReadOnly={!isActiveForm}
                    error={fieldTagsState.error?.message}
                >
                    <div className="search-wrapper">
                        <SearchOld
                            list={searchResult ?? []}
                            onSelect={handleSelectTag}
                            select={fieldTags.value ?? []}
                            placeholder="Start typing to add characteristic tags"
                            isRemovable={false}
                            disabled={isDisabledTags || isSubmittedTag}
                            customHandleSearch={setQuery}
                            maxResults={5}
                            isDisplayListOnSearch
                            searchDebounce={300}
                            onAddItem={tag => fetchCreateTag(tag, addTag)}
                            isSearching={isLoadingSearch}
                            isSearchIcon={false}
                        />
                    </div>
                </InnerFieldWrapper>
            </StyledFieldsWrapper>
            <StyledFieldsWrapper className="fields-wrapper">
                <InnerFieldWrapper
                    labelText="Selected Tags"
                    isReadOnly={!isActiveForm}
                >
                    {renderSelectedTagsSection()}
                </InnerFieldWrapper>
            </StyledFieldsWrapper>
            <SaveButton
                type="submit"
                isSubmitting={isLoading}
                isSuccess={isSuccess}
                disabled={
                    isLoading ||
                    Object.keys(methods.formState.errors).length !== 0 ||
                    !isActiveForm ||
                    checkIsEqualForm(currentFormData)
                }
            />
        </StyledIndustriesTagsForm>
    );
};

export default IndustriesTagsForm;
