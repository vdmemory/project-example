import { render, screen } from '@testing-library/react';
import { Tag } from './Tag';

const props = {
    value: 'Welcome, user',
};

describe('Tag', () => {
    it('should render successfully Tag', () => {
        const { baseElement } = render(<Tag {...props} />);
        expect(baseElement).toBeTruthy();
    });

    it('should render successfully Tag name and date props', () => {
        render(<Tag {...props} />);

        expect(screen.getByText('Welcome, user')).toBeInTheDocument();
    });
});
