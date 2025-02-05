import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { Range } from './Range.component';

const Story: Meta<typeof Range> = {
    component: Range,
    title: 'Range',
    decorators: [
        (Story, context) => {
            const props = context.args;
            const [value, setValue] = useState<string | null>(props.value);
            const onChange = (val: string) => {
                setValue(val);
            };

            return (
                <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                    <Story
                        args={{
                            ...context.args,
                            value,
                            onChange,
                        }}
                        key={value}
                    />
                </div>
            );
        },
    ],
};
export default Story;

const listFirst = [
    {
        value: 'in_range',
        name: 'In Range',
    },
    {
        value: 'close_to_range',
        name: 'Close To Range',
    },
    {
        value: 'outside_range',
        name: 'Outside Range',
    },
];

const listSecond = [];
for (let i = 0; i < 5; i++) {
    listSecond.push({
        value: String(i),
        name: String(i),
    });
}

export const Default = {
    args: {
        value: 'close_to_range',
        label: 'Budget',
        list: listFirst,
        onChange: (value: string) => console.log(value),
    },
};

export const WithListNumber = {
    args: {
        value: '2',
        label: 'Experience',
        list: listSecond,
        onChange: (value: string) => console.log(value),
    },
};

export const VisibleAddComment = {
    args: {
        value: 'close_to_range',
        label: 'Budget',
        list: listFirst,
        onChange: (value: string) => console.log(value),
        isVisibleComment: true,
    },
};

export const VisibleComment = {
    args: {
        value: 'close_to_range',
        label: 'Budget',
        list: listFirst,
        onChange: (value: string) => console.log(value),
        isVisibleComment: true,
        comment: 'Comment',
    },
};

export const VisibleTips = {
    args: {
        value: '2',
        label: 'Experience',
        list: listSecond,
        onChange: (value: string) => console.log(value),
        startTip: 'Not a Fit',
        endTip: 'Great Fit',
    },
};
