import type { Meta } from '@storybook/react';
import { Textarea } from './Textarea.component';

const Story: Meta<typeof Textarea> = {
    component: Textarea,
    title: 'Textarea',
};
export default Story;

export const Default = {
    args: {},
};

export const WithValue = {
    args: {
        value: 'Some text',
    },
};

export const WithError = {
    args: {
        error: 'Some error',
    },
};

export const WithPlaceholder = {
    args: {
        placeholder: 'Some placeholder',
    },
};

export const HideNumberCharacters = {
    args: {
        hideNumberCharacters: true,
    },
};

export const AutoSize = {
    args: {
        value: `Some text
        lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
        autoSize: true,
    },
};

export const ReadOnly = {
    args: {
        value: 'Some text',
        readOnly: true,
    },
};

export const Disabled = {
    args: {
        value: 'Some text',
        disabled: true,
    },
};
