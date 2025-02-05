import { render } from '@testing-library/react';
import Preview from './Preview';

const propsElement = {
    label: 'Add Bank Account',
    children: <div>children element</div>,
};

const renderElement = () => {
    const methods = render(<Preview {...propsElement} />);
    return { ...methods };
};

describe('Preview', () => {
    it('should render successfully', () => {
        const { baseElement } = renderElement();
        expect(baseElement).toBeTruthy();
    });
    describe('Preview section texts', () => {
        const testCases = [
            { expected: 'Add Bank Account' },
            { expected: 'children element' },
        ];

        testCases.forEach((testCase, i) => {
            it(`should render successfully text ${i + 1}`, async () => {
                const { getByText } = renderElement();
                expect(getByText(testCase.expected)).toBeTruthy();
            });
        });
    });

    it('should render successfully Logo', () => {
        const { baseElement } = renderElement();
        const logo = baseElement.getElementsByClassName('logo')[0];
        expect(logo).toBeDefined();
    });

    it('should render successfully Logos Bank', () => {
        const { baseElement } = renderElement();
        const logos = baseElement.getElementsByClassName('logos')[0];
        expect(logos).toBeDefined();
        const icons = baseElement.getElementsByTagName('reactcomponent');
        expect(icons.length).toBe(5);
    });
});
