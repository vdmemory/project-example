import { render, screen } from '@testing-library/react';
import { OtherLink } from './OtherLink';

const props = {
    link: 'test.com',
    title: 'test title',
};
describe('OtherLink', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<OtherLink {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('test title')).toBeInTheDocument();
        expect(document.querySelector('a[href="test.com"]'));
    });
});
