import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ChipAutocomplete from './ChipAutocomplete';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

jest.mock('react-google-autocomplete/lib/usePlacesAutocompleteService');
(useGoogle as jest.Mock).mockReturnValue({
    placePredictions: [],
    getPlacePredictions: jest.fn(),
    isPlacePredictionsLoading: false,
});

describe('ChipAutocomplete', () => {
    const mockListValues = [
        { name: 'Location 1', id: 1 },
        { name: 'Location 2', id: 2 },
        { name: 'Location 3', id: 3 },
    ];

    const mockListPopular = [
        { name: 'Popular Location 1', id: 101 },
        { name: 'Popular Location 2', id: 102 },
    ];

    it('renders ChipAutocomplete component', () => {
        const onClickMock = jest.fn();
        const { getByText } = render(
            <ChipAutocomplete
                initialListValues={mockListValues}
                initialListPopular={mockListPopular}
                onClick={onClickMock}
            />,
        );
        mockListValues.forEach(({ name }) => {
            expect(getByText(name)).toBeInTheDocument();
        });
        expect(getByText('Add office')).toBeInTheDocument();
    });

    it('handles click event to add and remove chips', () => {
        const onClickMock = jest.fn();
        const { getByText, queryByText } = render(
            <ChipAutocomplete
                initialListValues={mockListValues}
                initialListPopular={mockListPopular}
                onClick={onClickMock}
            />,
        );
        fireEvent.click(getByText('Add office'));
        expect(getByText('Popular Location 1')).toBeInTheDocument();
        fireEvent.click(getByText('Popular Location 1'));
        expect(getByText('Popular Location 1')).toBeInTheDocument();
        fireEvent.click(getByText('Popular Location 1'));
        expect(queryByText('Popular Location 1')).toBeNull();
        expect(onClickMock).toHaveBeenCalledWith({
            target: {
                value: [
                    { name: 'Location 1', id: 1 },
                    { name: 'Location 2', id: 2 },
                    { name: 'Location 3', id: 3 },
                ],
            },
        });
    });
});
