import type { Meta } from '@storybook/react';
import { Search, type ItemListType } from './Search.component';

const Story: Meta<typeof Search> = {
    component: Search,
    title: 'Search',
};
export default Story;

const config: ItemListType[] = [
    {
        id: 1,
        name: 'Affiliate Marketing',
    },
    {
        id: 2,
        name: 'Digital Marketing',
    },
    {
        id: 3,
        name: 'Email Marketing',
    },
    {
        id: 4,
        name: 'Social Media Marketing',
    },
];

export const Default = {
    args: {
        list: config,
    },
};

export const Disabled = {
    args: {
        list: config,
        disabled: true,
    },
};
