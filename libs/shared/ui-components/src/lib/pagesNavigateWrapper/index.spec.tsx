import { render } from '@testing-library/react';

import FloatNavigation from './FloatNavigation';

const props = {
    children: <div>children</div>,
    parent: 'header' as 'header' | 'footer',
};
describe('FloatNavigation', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <FloatNavigation {...props} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('children')).toBeInTheDocument();
    });
});
