import { AchIcon, CardIcon, WireIcon } from '../../icons';
import type { Meta } from '@storybook/react';
import { TabPaymentType } from './tab/Tab.types';
import { Tabs } from './Tabs.component';

const Story: Meta<typeof Tabs> = {
    component: Tabs,
    title: 'Tabs',
};
export default Story;

const config: TabPaymentType[] = [
    {
        label: 'ACH',
        icon: <AchIcon />,
        key: 'ACH',
    },
    {
        label: 'Card',
        icon: <CardIcon />,
        key: 'CARD',
    },
    {
        label: 'Wire',
        icon: <WireIcon />,
        key: 'WIRE',
    },
];

export const Default = {
    args: {
        tabs: config,
    },
};
