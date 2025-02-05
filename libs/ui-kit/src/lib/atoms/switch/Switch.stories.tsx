import type { Meta } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Switch } from './Switch.component';

const Container = ({ isOn, label }: { isOn: boolean; label: string }) => {
    const [isSaveCard, setIsSaveCard] = useState(isOn);

    useEffect(() => {
        setIsSaveCard(isOn);
    }, [isOn]);

    return (
        <Switch
            label={label}
            isOn={isSaveCard}
            onToggle={() => setIsSaveCard(prev => !prev)}
        />
    );
};

const Story: Meta<typeof Switch> = {
    component: Container,
    title: 'Switch',
};
export default Story;

export const Default = {
    args: {
        isOn: false,
        label: 'Save for future payments',
    },
};

export const On = {
    args: {
        isOn: true,
        label: 'Save for future payments',
    },
};
