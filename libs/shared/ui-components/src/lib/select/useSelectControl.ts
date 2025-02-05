import { useEffect, useState } from 'react';

export type OptionsType = {
    id: number | string;
    name: string;
    description?: string;
    isTagged?: boolean;
    image?: string;
};

type TypeControl = 'add' | 'remove' | 'change';
interface UseSelectControlProps {
    initialOptions: OptionsType[];
    initialSelected?: OptionsType[];
    handleSelect: (selectedList: OptionsType[]) => void;
    multiple?: boolean;
}

export const useSelectControl = ({
    initialOptions,
    initialSelected,
    handleSelect,
    multiple,
}: UseSelectControlProps) => {
    const [optionsList, setOptionsList] = useState(initialOptions);
    const [selectedList, setSelectedList] = useState(initialSelected || []);

    useEffect(() => {
        if (initialOptions) setOptionsList(initialOptions);
    }, [initialOptions]);

    useEffect(() => {
        if (initialSelected) setSelectedList(initialSelected);
    }, [initialSelected]);

    const selectionControl = (
        name: string,
        id: number | string,
        type: TypeControl,
    ) => {
        const option = { id, name };

        switch (type) {
            case 'add':
                return [...selectedList, option];
            case 'remove':
                return selectedList.filter(
                    ({ id }: { id: unknown }) => id !== option.id,
                );
            case 'change':
                return [option];
        }
    };

    const handleChange = (
        id: number | string,
        name: string,
        isNotSelection?: boolean,
    ) => {
        const numberId = Number(id);
        const idSelect = isNaN(numberId) ? id : numberId;
        const isSelected = selectedList.some(item => item.id === numberId);
        let type: TypeControl = 'change';
        if (multiple) {
            type = !isSelected ? 'add' : 'remove';
        }
        if (!isNotSelection) {
            const selectedValues = selectionControl(name, idSelect, type);
            setSelectedList(selectedValues);
            handleSelect(selectedValues);
        } else {
            handleSelect([]);
        }
    };

    return { optionsList, selectedList, handleChange };
};
