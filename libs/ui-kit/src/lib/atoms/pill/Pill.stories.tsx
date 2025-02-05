import type { ArgTypes, Meta } from '@storybook/react';
import Pill, { PillProps } from './Pill.component';
import { FC, useState } from 'react';

const listPills = [
    {
        value: '1',
        label: 'Label 1',
    },
    {
        value: '2',
        label: 'Label 2',
    },
    {
        value: '3',
        label: 'Label 3',
    },
];

const Story: Meta<typeof Pill> = {
    component: Pill,
    title: 'Pill',
    decorators: [
        (Story, context) => {
            const props = context.args;
            const [valueCheckbox, setValueCheckbox] = useState<string[]>([]);
            const [valueRadio, setValueRadio] = useState<string | null>(null);

            const onClickRadio = (val: string) => setValueRadio(val);
            const onClickCheckbox = (val: string) => {
                if (valueCheckbox.includes(val)) {
                    return setValueCheckbox(
                        valueCheckbox.filter(item => item !== val),
                    );
                }
                const newValue = [...valueCheckbox];
                newValue.push(val);
                return setValueCheckbox(newValue);
            };

            const renderPill = ({
                label,
                value,
            }: {
                value: string;
                label: string;
            }) => {
                const checked =
                    props.type === 'checkbox'
                        ? valueCheckbox.includes(value)
                        : valueRadio === value;
                const onChange =
                    props.type === 'checkbox' ? onClickCheckbox : onClickRadio;

                return (
                    <Story
                        args={{
                            ...context.args,
                            label,
                            checked,
                            onChange: () => onChange(value),
                        }}
                        key={value}
                    />
                );
            };

            return (
                <div style={{ display: 'flex', gap: '12px' }}>
                    {listPills.map(renderPill)}
                </div>
            );
        },
    ],
    argTypes: {
        label: {
            control: false,
        },
        checked: {
            control: false,
        },
    } as Partial<ArgTypes<FC<PillProps>>>,
};
export default Story;

const mainProps = {
    iconSide: 'both',
    isUppercase: false,
    name: 'pills',
    type: 'button',
    onClick: () => console.log('Click!'),
};

export const Default = {
    args: {
        ...mainProps,
        disabled: false,
    },
};

export const Disabled = {
    args: {
        ...mainProps,
        disabled: true,
    },
};
