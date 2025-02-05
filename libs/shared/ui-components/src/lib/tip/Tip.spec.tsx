import { fireEvent, render, screen } from '@testing-library/react';
import Tip from './Tip';

const props = {
    label: 'label',
    text: 'text',
    linesCount: 10,
};

describe('Tip', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Tip {...props} />);
        expect(baseElement).toBeTruthy();
    });

    describe('Elements render Tip', () => {
        const testCases = [
            { name: 'label', expected: 'label' },
            { name: 'text', expected: 'text' },
        ];

        testCases.forEach(testCase => {
            it(`should render successfully Tip with ${testCase.name}`, () => {
                const { getByText } = render(<Tip {...props} />);
                const element = getByText(testCase.expected);
                expect(element).toBeInTheDocument();
            });
        });
    });
});
