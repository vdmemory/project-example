import { render, screen } from '@testing-library/react';
import HeaderReview from './HeaderReview';

const props = {
    children: <div>children HeaderReview</div>,
    title: 'title for HeaderReview',
};

describe('Faq', () => {
    it('should render successfully HeaderReview', () => {
        const { baseElement } = render(<HeaderReview {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('title for HeaderReview')).toBeInTheDocument();
        expect(screen.getByText('children HeaderReview')).toBeInTheDocument();
    });
});
