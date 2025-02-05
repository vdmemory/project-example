import { render } from '@testing-library/react';
import { Separator } from './Separator';

describe('Separator', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(<Separator />);
        expect(baseElement).toBeTruthy();
        expect(getByText(/or continue with/gi)).toBeInTheDocument();
    });
    it('should render with custom text successfully', () => {
        const { getByText } = render(<Separator text="or another variant" />);
        expect(getByText(/or another variant/gi)).toBeInTheDocument();
    });
});
