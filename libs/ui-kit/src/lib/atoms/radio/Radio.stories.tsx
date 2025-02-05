import type { Meta } from '@storybook/react';
import { Radio } from './Radio.component';

const Story: Meta<typeof Radio> = {
    component: Radio,
    title: 'Radio',
};
export default Story;

export const Default = {
    args: {
        variant: 'default',
        checked: true,
        label: 'Radio default',
        disabled: true,
    },
};

export const Error = {
    args: {
        variant: 'error',
        label: 'Radio error',
        checked: false,
        disabled: true,
    },
};
