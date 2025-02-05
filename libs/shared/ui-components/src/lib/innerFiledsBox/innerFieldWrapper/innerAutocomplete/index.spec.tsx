import { render } from '@testing-library/react';
import InnerAutocomplete from './InnerAutocomplete';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

const onChange = jest.fn();
const parentRef = { current: document.createElement('div') };
const props = {
    value: '',
    onChange,
    parentRef,
};

jest.mock('react-google-autocomplete/lib/usePlacesAutocompleteService');
(useGoogle as jest.Mock).mockReturnValue({
    placePredictions: [],
    getPlacePredictions: jest.fn(),
    isPlacePredictionsLoading: false,
});

describe('InnerAutocomplete', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<InnerAutocomplete {...props} />);
        expect(baseElement).toBeTruthy();
    });
});
