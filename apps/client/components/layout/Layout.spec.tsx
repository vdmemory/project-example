import { render } from '@testing-library/react';

describe('Layout', () => {
    it('should render successfully', () => {
        // TODO: remove the plug and write the tests
        const { baseElement } = render(<div>Hello</div>);
        expect(baseElement).toBeTruthy();
    });
});
