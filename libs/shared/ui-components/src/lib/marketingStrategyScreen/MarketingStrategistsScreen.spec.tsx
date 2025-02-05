import { render } from '@testing-library/react';
import { MarketingStrategistsScreen } from './MarketingStrategistsScreen';

const mockDesktopMarketingScreen = [
    { color: 'red', zIndex: 1 },
    { color: 'blue', zIndex: 2 },
    { color: 'green', zIndex: 3 },
];

const mockMobileMarketingScreen = [
    { fontWeight: 'bold', zIndex: 1 },
    { fontStyle: 'italic', zIndex: 2 },
    { textDecoration: 'underline', zIndex: 3 },
];

describe('MarketingStrategistsScreen', () => {
    it('renders marketing strategists screen with elements and list', () => {
        const { getByText, getByAltText } = render(
            <MarketingStrategistsScreen
                label="Team Members"
                list={['Aditi', 'Alana', 'Emily']}
                desktopMarketingScreen={mockDesktopMarketingScreen}
                mobileMarketingScreen={mockMobileMarketingScreen}
            />,
        );

        expect(getByText('Aditi')).toBeInTheDocument();
        expect(getByText('Alana')).toBeInTheDocument();
        expect(getByText('Emily')).toBeInTheDocument();
        expect(getByText('Team Members')).toBeInTheDocument();

        expect(getByAltText('Aditi Card')).toBeInTheDocument();
        expect(getByAltText('Alana Card')).toBeInTheDocument();
        expect(getByAltText('Emily Card')).toBeInTheDocument();
    });
});
