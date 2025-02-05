import { render, screen } from '@testing-library/react';
import { TitleSection } from './TitleSection';

const props = {
    name: 'name',
    date: 'date',
};

describe('TitleSection', () => {
    it('should render successfully TitleSection', () => {
        const { baseElement } = render(<TitleSection {...props} />);
        expect(baseElement).toBeTruthy();
    });

    it('should render successfully TitleSection name and date props', () => {
        render(<TitleSection {...props} />);

        expect(screen.getByText('Welcome, name')).toBeInTheDocument();
        expect(screen.getByText('date')).toBeInTheDocument();
    });
});
