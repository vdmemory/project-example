import { render } from '@testing-library/react';
import TipBothParts from './TipBothParts';

describe('TipBothParts', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<TipBothParts />);
        expect(baseElement).toBeTruthy();
    });
});
