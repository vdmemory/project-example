import { render, screen } from '@testing-library/react';
import { Placeholder } from './Placeholder';

describe('Placeholder', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Placeholder title="title" />);
        expect(baseElement).toBeTruthy();
    });
    it('should render successfully title', () => {
        const { getByText } = render(<Placeholder title="title" />);
        expect(getByText('title')).toBeTruthy();
    });
    it('should render successfully image stars', () => {
        render(<Placeholder title="title" />);
        const image = screen.getByAltText('Stars');
        expect(image).toBeTruthy();
    });
    it('should render successfully reactcomponent', () => {
        const { baseElement } = render(<Placeholder title="title" />);
        const element = baseElement.getElementsByTagName('reactcomponent')[0];
        expect(element.tagName).toBe('REACTCOMPONENT');
    });
});
