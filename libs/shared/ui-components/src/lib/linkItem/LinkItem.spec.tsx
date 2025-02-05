import { render, screen } from '@testing-library/react';
import LinkItem from './LinkItem';

describe('LinkItem', () => {
    it('renders link item with title and correct link', () => {
        const title = 'Example Link';
        const link = 'https://example.com';
        render(<LinkItem title={title} link={link} />);

        const linkElement = screen.getByText(title);
        expect(linkElement).toBeInTheDocument();
        const a = linkElement.parentElement;
        expect(a).toHaveAttribute('href', link);
        expect(a).toHaveAttribute('target', '_blank');
    });
});
