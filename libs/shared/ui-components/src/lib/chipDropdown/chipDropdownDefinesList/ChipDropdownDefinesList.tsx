import React, { RefObject } from 'react';
import ChipDropdown, { ValueSelect } from '../chipDropdown/ChipDropdown';
import { ChangeHandler } from 'react-hook-form';
import { useGetList } from '@breef/shared/hooks';

export interface ChipDropdownDefinesListProps {
    listType: string;
    initialListValues?: ValueSelect[];
    onClick?: ChangeHandler;
    onSelect?: (value: ValueSelect[]) => void;
    parentRef?: RefObject<HTMLElement>;
    placeholder?: string;
    idxLayer?: number;
    disabled?: boolean;
}

export const ChipDropdownDefinesList = (
    props: ChipDropdownDefinesListProps,
) => (
    <ChipDropdown
        {...props}
        initialListDropdown={useGetList(props.listType) as ValueSelect[]}
    />
);

export default ChipDropdownDefinesList;
