import React from 'react';
import { render, screen } from '@testing-library/react';
import { LinkUi } from './LinkUi.component';

describe('LinkUi', () => {
    it('renders a link with the correct text', () => {
        const linkText = 'Click me';
        render(<LinkUi>{linkText}</LinkUi>);
        const linkElement = screen.getByText(linkText);
        expect(linkElement).toBeInTheDocument();
        expect(linkElement.className).toBe('link-children');
    });

    it('renders a disabled link when isDisabled prop is true', () => {
        render(<LinkUi isDisabled={true}>Disabled Link</LinkUi>);
        const disabledLinkElement = screen.getByTestId('link');
        expect(disabledLinkElement).toBeInTheDocument();
        expect(disabledLinkElement).toHaveClass('link-disabled');
    });

    it('renders a link with prop title, without children', () => {
        render(<LinkUi title="Link with icons" />);
        const linkElement = screen.getByText('Link with icons');
        expect(linkElement).toBeInTheDocument();
        expect(linkElement.className).toBe('link-children');
    });
});
