import { render, screen } from '@testing-library/react';
import HeaderPagesSupport from './HeaderPagesSupport';

describe('Faq', () => {
    it('should render successfully HeaderPagesSupport', () => {
        const { baseElement } = render(
            <HeaderPagesSupport title="title for HeaderPagesSupport" />,
        );
        expect(baseElement).toBeTruthy();
        expect(
            screen.getByText('title for HeaderPagesSupport'),
        ).toBeInTheDocument();
    });
});
