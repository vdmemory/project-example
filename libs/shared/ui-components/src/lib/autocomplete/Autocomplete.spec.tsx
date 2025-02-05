import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PlacesAutocomplete from './Autocomplete';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

describe('PlacesAutocomplete', () => {
    const props = {
        onClick: jest.fn(),
    };
    it('should render successfully', () => {
        const { baseElement } = render(<PlacesAutocomplete {...props} />);
        expect(baseElement).toBeTruthy();
    });
    it('should select google place successfully', async () => {
        render(<PlacesAutocomplete {...props} />);
        const input = screen.getByTestId('autocomplete-input');
        fireEvent.change(input, { target: { value: 'Ukraine' } });
        expect(screen.getByDisplayValue('Ukraine') === input).toBeTruthy();
    });
});

jest.mock('react-google-autocomplete/lib/usePlacesAutocompleteService');
(useGoogle as jest.Mock).mockReturnValue({
    placePredictions: [],
    getPlacePredictions: jest.fn(),
    isPlacePredictionsLoading: false,
});

describe('PlacesAutocomplete', () => {
    it('renders PlacesAutocomplete component', () => {
        render(<PlacesAutocomplete onClick={() => undefined} />);
        const autocompleteInput = screen.getByTestId('autocomplete-input');
        expect(autocompleteInput).toBeInTheDocument();
    });

    it('handles input change and displays predictions', async () => {
        render(<PlacesAutocomplete onClick={() => undefined} />);
        const autocompleteInput = screen.getByTestId('autocomplete-input');

        fireEvent.change(autocompleteInput, { target: { value: 'New York' } });
        await waitFor(() => {
            const predictionItem = screen.getByTestId('autocomplete-input');
            const value = predictionItem.getAttribute('value');
            expect(value).toBe('New York');
        });
    });
});
