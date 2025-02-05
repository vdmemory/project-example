import type { Meta } from '@storybook/react';
import Select, { SelectProps } from './Select.component';
import { useState } from 'react';

const StorySelect = (props: SelectProps) => {
    const [value, setValue] = useState('');
    return (
        <Select {...props} value={value} onChange={setValue} id="some-select" />
    );
};

const Story: Meta<typeof Select> = {
    component: StorySelect,
    title: 'Select',
};
export default Story;

const mainProps = {
    label: 'Label',
    placeholder: 'Placeholder',
    list: [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
    ],
    isOptional: true,
    isSearchable: true,
    disabled: false,
    error: '',
};

export const Primary = {
    args: mainProps,
};

export const Disabled = {
    args: {
        ...mainProps,
        disabled: true,
    },
};

export const Error = {
    args: {
        ...mainProps,
        error: 'Some Error!',
    },
};
