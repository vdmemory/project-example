import type { Meta } from '@storybook/react';
import { DropDown } from './DropDown.component';

const Story: Meta<typeof DropDown> = {
    component: DropDown,
    title: 'DropDown',
};
export default Story;

const list = [
    {
        value: 'first',
        label: 'First',
    },
    {
        value: 'second',
        label: 'Second',
    },
    {
        value: 'third',
        label: 'Third',
    },
    {
        value: 'fourth',
        label: 'Fourth',
    },
    {
        value: 'fifth',
        label: 'Fifth',
    },
];

export const Default = {
    args: {
        options: list,
        value: 'First',
    },
};

export const Searchable = {
    args: {
        options: list,
        value: 'First',
        isSearchable: true,
    },
};

export const Error = {
    args: {
        options: list,
        value: 'First',
        error: 'Error message',
    },
};
