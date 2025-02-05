import { render } from '@testing-library/react';
import { Dots } from './Dots';

describe('Dots', () => {
    it('should render successfully Dots', () => {
        const { baseElement } = render(<Dots />);
        expect(baseElement).toBeTruthy();
        const spans = baseElement.getElementsByTagName('span');
        expect(spans).toHaveLength(3);
    });
    it('should render successfully Dots with className', () => {
        const { baseElement } = render(<Dots className="dots_class" />);
        const elemWithClass =
            baseElement.getElementsByClassName('dots_class')[0];
        expect(elemWithClass).toBeDefined();
    });
});
