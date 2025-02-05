import type { Meta } from '@storybook/react';
import { ProgressBar, type ProgressBarType } from './ProgressBar.component';

interface Props {
    items: ProgressBarType;
    className?: string;
    active?: number | null;
    completed?: number | null;
}

const styles = {
    width: '650px',
};

const Wrapper = ({ ...rest }: Props) => (
    <div style={styles}>
        <ProgressBar {...rest} />
    </div>
);

const Story: Meta<typeof ProgressBar> = {
    component: Wrapper,
    title: 'ProgressBar',
};
export default Story;

const config: ProgressBarType = ['Project', 'Agency', 'Company'];

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

export const Completed = {
    args: {
        items: config,
        active: 2,
        isCompleted: true,
    },
};
