import { render } from '@testing-library/react';
import { FloatingElement } from './FloatingElement';

describe('FloatingElement', () => {
    it('renders children with default styles', () => {
        const { getByText } = render(
            <FloatingElement>
                <div>Test Content</div>
            </FloatingElement>,
        );

        expect(getByText('Test Content')).toBeInTheDocument();
    });
});
