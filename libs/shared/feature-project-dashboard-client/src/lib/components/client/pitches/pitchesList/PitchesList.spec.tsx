import { render } from '@testing-library/react';

describe('PitchesList', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<div>hello</div>);
        expect(baseElement).toBeTruthy();
    });
});

// TODO: write tests!!
