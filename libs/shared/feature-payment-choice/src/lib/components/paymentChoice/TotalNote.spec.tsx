import { render } from '@testing-library/react';
import { TotalNote } from './TotalNote';

describe('TotalNote Component', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<TotalNote total={200} />);
        expect(baseElement).toBeTruthy();
    });

    it(`should render successfully label`, async () => {
        const { getByText } = render(<TotalNote total={200} />);
        expect(getByText('Payment total')).toBeInTheDocument();
    });
    it(`should render successfully total`, async () => {
        const { getByText } = render(<TotalNote total={200} />);
        expect(getByText('$200')).toBeInTheDocument();
    });
});
