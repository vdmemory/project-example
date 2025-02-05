import { render } from '@testing-library/react';
import { ReviewScopeCard } from './ReviewScopeCard';

const props = {
    className: 'classNameCustom',
    title: 'title',
    children: 'children',
    onEdit: () => console.log('onEdit'),
    wLine: 10,
};

describe('ReviewScopeCard', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ReviewScopeCard {...props} />);
        expect(baseElement).toBeTruthy();
    });

    describe('Elements render ReviewScopeCard', () => {
        const testCases = [
            { name: 'title', expected: 'title' },
            { name: 'children', expected: 'children' },
        ];

        testCases.forEach(testCase => {
            it(`should render successfully ReviewScopeCard with ${testCase.name}`, () => {
                const { getByText } = render(<ReviewScopeCard {...props} />);
                const element = getByText(testCase.expected);
                expect(element).toBeInTheDocument();
            });
        });
    });

    it(`should render successfully ReviewScopeCard with className prop`, () => {
        render(<ReviewScopeCard {...props} />);
        const element = document.querySelector('.classNameCustom');
        expect(element).toBeInTheDocument();
    });

    it(`should render successfully ReviewScopeCard with button edit`, () => {
        render(<ReviewScopeCard {...props} />);
        const element = document.querySelector('.edit-button');
        expect(element).toBeInTheDocument();
    });
});
