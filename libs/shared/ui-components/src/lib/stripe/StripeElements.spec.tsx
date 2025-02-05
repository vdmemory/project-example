import { render } from '@testing-library/react';
import StripeElements from './StripeElementsLayout';

describe('StripeElements', () => {
    it('should render successfully', () => {
        const { baseElement, getByTestId } = render(
            <StripeElements>
                <input data-testid="input-children" type="text" />
            </StripeElements>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByTestId('input-children')).toBeInTheDocument();
    });
});
