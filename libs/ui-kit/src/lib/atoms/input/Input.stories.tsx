import type { Meta } from '@storybook/react';
import Input from './Input.component';

const Story: Meta<typeof Input> = {
    component: Input,
    title: 'Input',
};
export default Story;

export const Primary = {
    args: {
        placeholder: 'Placeholder',
        descriptiveText: 'Descriptive Text',
        isDollarSymbol: true,
        isPercentSymbol: true,
        isSearchIcon: true,
        isWarningIcon: true,
        disabled: false,
        inputDirection: 'left',
    },
};

export const VisibleCounter = {
    args: {
        placeholder: 'Placeholder',
        disabled: false,
        inputDirection: 'left',
        isVisibleCounter: true,
        value: '1234567890',
    },
};
