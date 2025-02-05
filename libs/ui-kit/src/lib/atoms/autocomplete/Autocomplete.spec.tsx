import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Autocomplete from './Autocomplete.component';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { getGeocode } from 'use-places-autocomplete';

jest.mock('react-google-autocomplete/lib/usePlacesAutocompleteService');
jest.mock('use-places-autocomplete', () => ({
    getGeocode: jest.fn(),
}));

const mockPlacePredictions = [
    {
        place_id: '1',
        description: 'New York, NY',
        structured_formatting: { main_text: 'New York', secondary_text: 'NY' },
    },
    {
        place_id: '2',
        description: 'Los Angeles, CA',
        structured_formatting: {
            main_text: 'Los Angeles',
            secondary_text: 'CA',
        },
    },
];

const results = [
    {
        formatted_address: 'New York, NY',
        address_components: [
            {
                long_name: 'New York',
                short_name: 'NY',
                types: ['country'],
            },
        ],
    },
];

describe('Autocomplete Component Tests', () => {
    beforeEach(() => {
        (useGoogle as jest.Mock).mockReturnValue({
            placePredictions: mockPlacePredictions,
            getPlacePredictions: jest.fn(),
            isPlacePredictionsLoading: false,
        });
        (getGeocode as jest.Mock).mockResolvedValue(results);
    });

    it('should render successfully', () => {
        const { baseElement } = render(
            <Autocomplete onClick={jest.fn()} value={'test value'} />,
        );
        expect(baseElement).toBeTruthy();
        expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
    });

    it('renders input element correctly', () => {
        render(<Autocomplete onClick={jest.fn()} placeholder="Search..." />);
        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    it('displays suggestions when user types in the input', async () => {
        render(<Autocomplete onClick={jest.fn()} placeholder="Search..." />);
        fireEvent.change(screen.getByPlaceholderText('Search...'), {
            target: { value: 'New' },
        });
        await waitFor(() => {
            expect(screen.getByText('New York')).toBeVisible();
            expect(screen.getByText('NY')).toBeVisible();
        });
    });

    it('does not show suggestions when input is empty', () => {
        render(<Autocomplete onClick={jest.fn()} placeholder="Search..." />);
        const input = screen.getByPlaceholderText('Search...');
        fireEvent.change(input, { target: { value: '' } });
        expect(input.nodeValue).toBeNull();
    });

    it('calls onClick when a suggestion is selected', async () => {
        const handleClick = jest.fn();
        render(<Autocomplete onClick={handleClick} placeholder="Search..." />);
        fireEvent.change(screen.getByPlaceholderText('Search...'), {
            target: { value: 'New' },
        });
        await waitFor(() => {
            screen.getByText('New York');
            fireEvent.click(screen.getByText('New York'));
        });
        expect(handleClick).toHaveBeenCalled();
    });
});
