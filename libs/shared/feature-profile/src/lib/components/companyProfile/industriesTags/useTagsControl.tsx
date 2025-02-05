import {
    useCreateTagMutation,
    useGetTagsQuery,
} from '@breef/shared/data-access-pitch-create';
import { ValueSelect } from '@breef/shared/ui-components';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type SearchResultType = {
    id: number;
    name: string;
};

export const useTagsControl = (
    initialTags: ValueSelect[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick: (...event: any[]) => void,
    clearErrors: () => void,
) => {
    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState<SearchResultType[]>([]);

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    const [createTag, { isLoading: isSubmittedTag }] = useCreateTagMutation();

    const { data: search, isFetching: isLoadingSearch } = useGetTagsQuery({
        limit: 5,
        name: query,
        exclude: initialTags ? initialTags.map(item => item.name) : [],
    });

    const fetchCreateTag = async (
        name: string,
        cbFunction: (data: { id: number; name: string }) => void,
    ) => {
        try {
            const data = await createTag(name).unwrap();
            cbFunction(data);
        } catch (e) {
            toast.error('Something went wrong while adding new tag.');
        }
    };

    const addTag = (value: { id: number; name: string }) => {
        const values = initialTags || [];
        onClick?.([...values, value]);
    };

    const removeTag = (id: number) => {
        const values = initialTags || [];
        onClick?.(values.filter(item => item.id !== id));
    };

    const handleSelectTag = async ({
        id,
        name,
    }: {
        id?: number;
        name: string;
    }) => {
        clearErrors();
        const isItemAlreadySelected = initialTags?.some(item => item.id === id);
        if (!id) {
            fetchCreateTag(name, addTag);
        } else if (isItemAlreadySelected) {
            removeTag(id);
        } else {
            addTag({ id, name });
        }
    };

    useEffect(() => {
        if (!query) {
            setSearchResult([]);
        } else {
            setSearchResult(search ?? []);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return {
        searchResult,
        setQuery,
        handleSelectTag,
        removeTag,
        addTag,
        fetchCreateTag,
        isSubmittedTag,
        isLoadingSearch,
        toggleDropdown,
        isOpen,
    };
};
