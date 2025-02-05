import { render } from '@testing-library/react';
import Toastify from './Toastify';

describe('Toastify', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Toastify />);
        expect(baseElement).toBeTruthy();
    });
});
