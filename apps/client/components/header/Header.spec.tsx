import { render } from '@testing-library/react';

describe('Header', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<div>hello</div>);
        expect(baseElement).toBeTruthy();
    });
});
