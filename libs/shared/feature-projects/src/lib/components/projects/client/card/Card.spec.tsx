import { render, screen } from '@testing-library/react';
import { Card } from './Card';

const props = {
    label: 'card',
    children: <div>children</div>,
    renderFooter: <div>render footer</div>,
};

describe('Card', () => {
    it('should render successfully Card', () => {
        const { baseElement } = render(<Card {...props} />);
        expect(baseElement).toBeTruthy();
    });

    it('should render successfully Card label and children props', () => {
        const { baseElement } = render(<Card {...props} />);

        expect(screen.getByTestId('label')).toHaveTextContent('card');
        expect(baseElement).toHaveTextContent('children');
        expect(screen.getByText('render footer')).toBeInTheDocument();
    });
});
