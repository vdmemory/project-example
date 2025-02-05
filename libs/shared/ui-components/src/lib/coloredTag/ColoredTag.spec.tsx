import { render } from '@testing-library/react';
import { ColoredTag } from './ColoredTag';

describe('ColoredTag', () => {
    it('renders ColoredTag component with default color', () => {
        const { getByText } = render(<ColoredTag tag="Test Tag" />);
        const tagElement = getByText('Test Tag');
        expect(tagElement).toBeInTheDocument();
    });

    it('renders ColoredTag component with specified color', () => {
        const { getByText } = render(
            <ColoredTag tag="Test Tag" color="green" />,
        );
        const tagElement = getByText('Test Tag');
        expect(tagElement).toBeInTheDocument();
    });
});
