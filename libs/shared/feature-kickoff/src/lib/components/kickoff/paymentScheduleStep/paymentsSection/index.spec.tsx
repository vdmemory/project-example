import { render } from '@testing-library/react';
import PaymentsSection from './PaymentsSection';

describe('PaymentsSection', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <PaymentsSection>
                <div>test children</div>
            </PaymentsSection>,
        );
        expect(baseElement).toBeTruthy();
    });
});
