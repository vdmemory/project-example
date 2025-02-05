import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { ListIdNameType } from '@breef/shared/types';
import { Control, useController } from 'react-hook-form';
import {
    useCreateTagMutation,
    useGetTagsQuery,
} from '@breef/shared/data-access-pitch-create';
import { PreferencesFormType } from '../../../types/projectCreateTypes';

export const useFieldAgencyTagsControl = (
    control: Control<PreferencesFormType>,
) => {
    const [searchTagName, setSearchTagName] = useState('');
    const [searchTagsResult, setSearchTagsResult] = useState<ListIdNameType[]>(
        [],
    );

    const { field: fieldAgencyTags, fieldState: fieldAgencyTagsState } =
        useController({
            control,
            name: 'agencyTags',
        });

    const [createTag, { isLoading: isCreatingTag }] = useCreateTagMutation();
    const { data: suggestedTags } = useGetTagsQuery({
        suggested: true,
        limit: 22,
    });
    const { data: searchTags, isFetching: isLoadingSearchTags } =
        useGetTagsQuery({
            limit: 5,
            name: searchTagName,
            exclude: fieldAgencyTags.value.map(item => item.name),
        });

    const addTag = (value: { id: number; name: string }) => {
        fieldAgencyTags.onChange([...fieldAgencyTags.value, value]);
    };

    const removeTag = (id: number) => {
        fieldAgencyTags.onChange(
            fieldAgencyTags.value.filter(item => item.id !== id),
        );
    };

    const isDisabledTags = fieldAgencyTags.value.length >= 10;

    const addNewTag = async (tag: string) => {
        try {
            const result = await createTag(tag).unwrap();
            addTag(result);
        } catch (err) {
            const typedError = err as {
                status?: number;
                data?: { name?: string[] };
            };
            const message =
                typedError.data?.name?.[0] ??
                'Something went wrong while adding tag';
            toast.error(message, { toastId: message });
        }
    };

    const handleSelectUniqueThing = async ({
        id,
        name,
    }: {
        id?: number;
        name: string;
    }) => {
        if (!id) {
            await addNewTag(name);
        } else if (fieldAgencyTags.value.map(item => item.id).includes(id)) {
            removeTag(id);
        } else {
            addTag({ id, name });
        }
    };

    useEffect(() => {
        setSearchTagsResult(searchTags ?? []);
    }, [searchTags]);

    return {
        searchTagsResult,
        handleSelectUniqueThing,
        fieldAgencyTags,
        isDisabledTags: isDisabledTags || isCreatingTag,
        setSearchTagName,
        addNewTag,
        isLoadingSearchTags,
        removeTag,
        addTag,
        suggestedTags,
        error: fieldAgencyTagsState.error,
    };
};
