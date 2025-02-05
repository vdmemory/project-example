import { render } from '@testing-library/react';

import Navigation from './Navigation';

const props = {
    children: <div>children</div>,
    parent: 'header' as 'header' | 'footer',
};

describe('Navigation', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(<Navigation {...props} />);
        expect(baseElement).toBeTruthy();
        expect(getByText('children')).toBeInTheDocument();
    });
});
