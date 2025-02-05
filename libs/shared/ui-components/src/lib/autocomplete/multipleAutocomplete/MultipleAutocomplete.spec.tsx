import { render, screen, fireEvent } from '@testing-library/react';
import MultiplePlacesAutocomplete from './MultipleAutocomplete';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

const props = {
    places: [{ location: 'Ukraine, UA' }],
    onChange: jest.fn(),
    onClick: jest.fn(),
};

jest.mock('react-google-autocomplete/lib/usePlacesAutocompleteService');
(useGoogle as jest.Mock).mockReturnValue({
    placePredictions: [],
    getPlacePredictions: jest.fn(),
    isPlacePredictionsLoading: false,
});

describe('MultiplePlacesAutocomplete', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <MultiplePlacesAutocomplete {...props} />,
        );
        expect(baseElement).toBeTruthy();
    });
    it('should add office click successfully', () => {
        render(<MultiplePlacesAutocomplete {...props} />);
        const linkBtn = screen.getByText(/office/i);
        expect(screen.queryByTestId('places-autocomplete-1')).toBeNull();
        fireEvent.click(linkBtn);
        expect(props.onChange).toBeCalled();
        expect(screen.queryByTestId('places-autocomplete-1')).toBeDefined();
    });
});
