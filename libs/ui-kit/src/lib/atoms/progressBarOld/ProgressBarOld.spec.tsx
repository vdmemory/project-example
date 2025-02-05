import { render, screen } from '@testing-library/react';
import { ProgressBarOld } from './ProgressBarOld.component';

describe('ProgressBarOld', () => {
    it('renders without errors', () => {
        render(<ProgressBarOld items={['Item 1', 'Item 2']} />);
    });

    it('displays items correctly', () => {
        const items = ['Item 1', 'Item 2', 'Item 3'];
        const { getByText } = render(<ProgressBarOld items={items} />);

        items.forEach(item => {
            const itemElement = getByText(item);
            expect(itemElement).toBeInTheDocument();
        });
    });

    it('displays items when active == order', () => {
        const items = ['Item 1', 'Item 2', 'Item 3'];
        render(<ProgressBarOld items={items} active={1} />);

        const progressBar = screen.getByTestId('progress-bar');
        const childrenClass = progressBar.children[0].className;
        const toBeActive = childrenClass.includes('activeStyle');

        expect(toBeActive).toBeTruthy();
    });

    it('displays items when active > order', () => {
        const items = ['Item 1', 'Item 2', 'Item 3'];
        render(<ProgressBarOld items={items} active={2} />);

        const progressBar = screen.getByTestId('progress-bar');
        const firstChildrenClass = progressBar.children[0].className;
        const nextChildrenClass = progressBar.children[1].className;
        const toBeCompleted = firstChildrenClass.includes('completedStyle');
        const toBeActive = nextChildrenClass.includes('activeStyle');

        expect(toBeActive).toBeTruthy();
        expect(toBeCompleted).toBeTruthy();
    });

    it('displays items when active == order and isCompleted', () => {
        const items = ['Item 1', 'Item 2', 'Item 3'];
        render(<ProgressBarOld items={items} active={2} isCompleted />);

        const progressBar = screen.getByTestId('progress-bar');
        const firstChildrenClass = progressBar.children[0].className;
        const nextChildrenClass = progressBar.children[1].className;
        const firstToBeCompleted =
            firstChildrenClass.includes('completedStyle');
        const nextToBeActive = nextChildrenClass.includes('activeStyle');
        const nextToBeCompleted = nextChildrenClass.includes('completedStyle');

        expect(firstToBeCompleted).toBeTruthy();
        expect(nextToBeActive).toBeTruthy();
        expect(nextToBeCompleted).toBeTruthy();
    });
});
