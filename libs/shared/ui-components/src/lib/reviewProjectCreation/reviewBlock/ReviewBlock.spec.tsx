import { render, screen } from '@testing-library/react';
import { ReviewBlock } from './ReviewBlock';

const onEdit = jest.fn();
const props = {
    onEdit,
};
describe('ReviewBlock', () => {
    it('should render successfully', () => {
        render(
            <ReviewBlock {...props}>
                <div>children</div>
            </ReviewBlock>,
        );
        const buttonEdit = document.querySelector('.absolute-button');
        expect(screen.getByText('children')).toBeInTheDocument();
        expect(buttonEdit).toBeInTheDocument();
    });
    it('should render without edit successfully', () => {
        render(
            <ReviewBlock>
                <div>children</div>
            </ReviewBlock>,
        );
        const buttonEdit = document.querySelector('.absolute-button');
        expect(buttonEdit).toBe(null);
    });
});
