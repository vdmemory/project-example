import { render, screen } from '@testing-library/react';
import List from './List.component';

describe('List', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <List>
                <div>item 1</div>
                <div>item 2</div>
            </List>,
        );
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('item 1')).toBeInTheDocument();
        expect(screen.getByText('item 2')).toBeInTheDocument();
    });
});
