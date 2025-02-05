import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

const props = {
    children: 'text error',
};

describe('Error', () => {
    it('should render successfully Error', () => {
        const { baseElement } = render(<ErrorMessage {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('text error')).toBeInTheDocument();
        expect(
            baseElement.getElementsByClassName('error_class')[0],
        ).not.toBeDefined();
    });
    it('should render successfully Error with className', () => {
        const { baseElement } = render(
            <ErrorMessage className="error_class" {...props} />,
        );
        expect(screen.getByText('text error')).toBeInTheDocument();
        expect(
            baseElement.getElementsByClassName('error_class')[0],
        ).toBeDefined();
    });
});
