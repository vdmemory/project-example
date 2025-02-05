import type { ArgTypes, Meta } from '@storybook/react';
import { ButtonSelect, ButtonSelectProps } from './ButtonSelect.component';
import { FC, useState } from 'react';
import styled from '@emotion/styled';

const listButtonSelect = [
    {
        value: '1',
        label: 'Industry Experience',
    },
    {
        value: '2',
        label: 'Creative Alignment',
    },
    {
        value: '3',
        label: 'Long-Term Partnership',
    },
    {
        value: '4',
        label: 'Immediate Availability',
    },
    {
        value: '5',
        label: 'Competitive Pricing',
    },
    {
        value: '6',
        label: 'Diverse Skillset',
    },
];

const StyledListButtons = styled.div`
    display: flex;
    width: 520px;
    flex-wrap: wrap;
    gap: 20px;
`;

const Story: Meta<typeof ButtonSelect> = {
    component: ButtonSelect,
    title: 'ButtonSelect',
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

            const renderButtonSelect = ({
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
                <StyledListButtons>
                    {listButtonSelect.map(renderButtonSelect)}
                </StyledListButtons>
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
    } as Partial<ArgTypes<FC<ButtonSelectProps>>>,
};
export default Story;

export const Checkbox = {
    args: {
        type: 'checkbox',
    },
};

export const Radio = {
    args: {
        type: 'radio',
    },
};

export const Disabled = {
    args: {
        disabled: true,
    },
};
