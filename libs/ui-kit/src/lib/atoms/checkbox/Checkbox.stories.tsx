import type { Meta } from '@storybook/react';
import { Checkbox } from './Checkbox.component';

const Story: Meta<typeof Checkbox> = {
    component: Checkbox,
    title: 'Checkbox',
};
export default Story;

export const Default = {
    args: {
        variant: 'default',
        checked: true,
        label: 'label default',
        indeterminate: false,
        disabled: false,
    },
};
export const Error = {
    args: {
        variant: 'error',
        checked: false,
        label: 'Error',
        indeterminate: false,
        disabled: false,
    },
};
