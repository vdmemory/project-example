import { RefObject } from 'react';
import { useGetList } from '@breef/shared/hooks';
import CustomDropdown from '../customDropdown/CustomDropdown';
import { ChangeHandler } from 'react-hook-form';

export interface CustomDropdownDefinesListProps {
    listType: string;
    onChange?: ChangeHandler;
    placeholder?: string;
    value: string;
    parentRef?: RefObject<HTMLElement>;
    customChange?: (value: string) => void;
    isAction?: boolean;
    type?: 'dropdown' | 'header-menu';
    isDisabled?: boolean;
}

export const CustomDropdownDefinesList = (
    props: CustomDropdownDefinesListProps,
) => {
    return (
        <CustomDropdown
            {...props}
            dropdownList={
                useGetList(props.listType) as { value: string; label: string }[]
            }
        />
    );
};

export default CustomDropdownDefinesList;
