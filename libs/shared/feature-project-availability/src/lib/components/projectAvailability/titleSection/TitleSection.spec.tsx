import { render } from '@testing-library/react';
import { TitleSection } from './TitleSection';

describe('TitleSection', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<TitleSection title="title" />);
        expect(baseElement).toBeTruthy();
    });
    it('should render successfully title', () => {
        const { getByText } = render(<TitleSection title="title" />);
        expect(getByText('title')).toBeTruthy();
    });
    it('should render successfully date', () => {
        const { getByText } = render(
            <TitleSection title="title" date="date" />,
        );
        expect(getByText('- date')).toBeTruthy();
    });
    it('should render successfully not date', () => {
        const { queryByText } = render(<TitleSection title="title" />);
        expect(queryByText('- date')).toBe(null);
    });
});
