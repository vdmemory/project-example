import type { Meta } from '@storybook/react';
import { ButtonRound } from './ButtonRound.component';

const Story: Meta<typeof ButtonRound> = {
    component: ButtonRound,
    title: 'ButtonRound',
};
export default Story;

export const Outlined = {
    args: {
        variant: 'outlined',
    },
};

export const Ghost = {
    args: {
        variant: 'ghost',
    },
};

export const Medium = {
    args: {
        size: 'medium',
    },
};

export const Small = {
    args: {
        size: 'small',
    },
};

export const Disabled = {
    args: {
        disabled: true,
    },
};
