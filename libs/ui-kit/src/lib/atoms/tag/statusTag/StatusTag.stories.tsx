import type { Meta } from '@storybook/react';
import { StatusTag } from './StatusTag.component';

const Story: Meta<typeof StatusTag> = {
    component: StatusTag,
    title: 'StatusTag',
};
export default Story;

export const Default = {
    args: {
        title: 'status tag',
        sentiment: 'neutral',
    },
};
