import { render } from '@testing-library/react';

describe('ReviewPitches', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<div>Hello</div>);
        expect(baseElement).toBeTruthy();
    });
});

// TODO: write tests!!
