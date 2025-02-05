import { render } from '@testing-library/react';
import Tag from './Tag';

describe('Tag', () => {
    it('should render successfully', () => {
        const props = {
            title: 'title',
        };
        const { baseElement } = render(<Tag {...props} />);
        expect(baseElement).toBeTruthy();
    });

    describe('Elements render Tag', () => {
        it(`should render successfully Tag with title`, () => {
            const props = {
                title: 'title',
            };
            const { getByText } = render(<Tag {...props} />);
            const element = getByText('title');
            expect(element).toBeInTheDocument();
        });

        it(`should render successfully Tag with children`, () => {
            const props = {
                children: 'children',
            };
            const { getByText } = render(<Tag {...props} />);
            const element = getByText('children');
            expect(element).toBeInTheDocument();
        });
    });
});
