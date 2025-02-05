import { render } from '@testing-library/react';
import { TotalSection } from './TotalSection';

describe('TotalSection', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <TotalSection
                totalPaid="$1,000.00"
                totalValue="$2,000.00"
                totalTeamTake="$750.00"
            />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('$1,000.00')).toBeInTheDocument();
        expect(getByText('$2,000.00')).toBeInTheDocument();
        expect(getByText('$750.00')).toBeInTheDocument();
    });
});
