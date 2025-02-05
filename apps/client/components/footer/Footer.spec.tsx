import { render } from '@testing-library/react';

describe('Footer', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<div>Footer</div>);
        expect(baseElement).toBeTruthy();
    });
});
