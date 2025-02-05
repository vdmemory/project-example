import type { Meta } from '@storybook/react';
import { Button } from './Button.component';
import { ArrowRightIcon } from '../../icons';

const Story: Meta<typeof Button> = {
    component: Button,
    title: 'Button',
};
export default Story;

export const Primary = {
    args: {
        variant: 'primary',
        label: 'Click Me',
        icon: <ArrowRightIcon />,
    },
};

export const Secondary = {
    args: {
        variant: 'secondary',
        label: 'Click Me',
        icon: <ArrowRightIcon />,
    },
};

export const Subtle = {
    args: {
        variant: 'subtle',
        label: 'Click Me',
        icon: <ArrowRightIcon />,
    },
};

export const Outlined = {
    args: {
        variant: 'outlined',
        label: 'Click Me',
        icon: <ArrowRightIcon />,
    },
};

export const Ghost = {
    args: {
        variant: 'ghost',
        label: 'Click Me',
        icon: <ArrowRightIcon />,
    },
};

export const Danger = {
    args: {
        variant: 'danger',
        label: 'Click Me',
        icon: <ArrowRightIcon />,
    },
};

export const Success = {
    args: {
        variant: 'success',
        label: 'Click Me',
        icon: <ArrowRightIcon />,
    },
};

export const Small = {
    args: {
        size: 'small',
        label: 'Click Me',
        icon: <ArrowRightIcon />,
    },
};

export const Medium = {
    args: {
        size: 'medium',
        label: 'Click Me',
        icon: <ArrowRightIcon />,
    },
};

export const Large = {
    args: {
        size: 'large',
        label: 'Click Me',
        icon: <ArrowRightIcon />,
    },
};

export const Disabled = {
    args: {
        isDisabled: true,
        label: 'Click Me',
        icon: <ArrowRightIcon />,
    },
};

export const Submitted = {
    args: {
        isSubmitted: true,
        label: 'Click Me',
        icon: <ArrowRightIcon />,
    },
};
