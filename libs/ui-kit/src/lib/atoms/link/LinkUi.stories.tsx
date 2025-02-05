import type { Meta } from '@storybook/react';
import { LinkUi } from './LinkUi.component';

const Story: Meta<typeof LinkUi> = {
    component: LinkUi,
    title: 'LinkUi',
};
export default Story;

export const standalone = {
    args: {
        variant: 'standalone',
        title: 'Link',
        isDisabled: true,
        iconRightArrow: true,
        iconLeftArrow: true,
    },
};

export const standaloneSmall = {
    args: {
        variant: 'standalone',
        title: 'Link',
        size: 'small',
        isDisabled: false,
        iconRightArrow: true,
        iconLeftArrow: true,
    },
};

export const inline = {
    args: {
        variant: 'inline',
        title: 'Link',
        isDisabled: false,
        iconRightArrow: true,
        iconLeftArrow: true,
    },
};
export const inlineSmall = {
    args: {
        variant: 'inline',
        title: 'Link',
        size: 'small',
        isDisabled: false,
        iconRightArrow: true,
        iconLeftArrow: true,
    },
};
