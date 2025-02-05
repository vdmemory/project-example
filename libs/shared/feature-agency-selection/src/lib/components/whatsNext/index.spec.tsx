import { render, screen } from '@testing-library/react';

import WhatsNext from './WhatsNext';

const props = {
    step: 1,
    subStep: 2,
};

describe('WhatsNext step', () => {
    it('should render component WhatsNext ', () => {
        const { baseElement } = render(<WhatsNext {...props} />);
        expect(baseElement).toBeTruthy();
        const step = screen.getByText('1/2');
        expect(step).toBeInTheDocument();
    });
});
