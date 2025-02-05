import React from 'react';
import { render } from '@testing-library/react';
import { Progress } from './Progress.component';
import { ProgressItem, ProgressState } from '@breef/shared/types'; // Import your ProgressBar component

const items: ProgressItem[] = [
    { name: 'Item 1', status: ProgressState.inProgress },
    { name: 'Item 2', status: ProgressState.disabled },
];
describe('Progress', () => {
    it('renders without errors', () => {
        render(<Progress items={items} />);
    });

    it('displays items correctly', () => {
        const { getByText } = render(<Progress items={items} />);

        items.forEach(item => {
            const itemElement = getByText(item.name);
            expect(itemElement).toBeInTheDocument();
        });
    });
});
