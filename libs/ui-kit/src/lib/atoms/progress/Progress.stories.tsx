import type { Meta } from '@storybook/react';
import { Progress, type ProgressType } from './Progress.component';

interface Props {
    items: ProgressType;
    className?: string;
    active?: number | null;
    completed?: number | null;
}

const styles = {
    width: '650px',
};

const Wrapper = ({ ...rest }: Props) => (
    <div style={styles}>
        <Progress {...rest} />
    </div>
);

const Story: Meta<typeof Progress> = {
    component: Wrapper,
    title: 'Progress',
};
export default Story;

const config: ProgressType = [
    'Project Scope',
    'Review Pitches',
    'Select Agency',
];

export const Default = {
    args: {
        items: config,
    },
};

export const Active = {
    args: {
        items: config,
        active: 2,
    },
};
