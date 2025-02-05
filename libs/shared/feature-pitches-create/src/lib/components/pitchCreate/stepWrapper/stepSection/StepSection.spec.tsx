import { render, screen } from '@testing-library/react';
import StepSection from './StepSection';

describe('StepSection', () => {
    it('should render successfully', () => {
        render(
            <StepSection>
                <div>children</div>
            </StepSection>,
        );
        expect(screen.getByText('children')).toBeInTheDocument();
    });
});
