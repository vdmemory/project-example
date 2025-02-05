import { fireEvent, render, screen } from '@testing-library/react';
import AgencyPreferencesStep from './AgencyPreferencesStep';
import { useProjectCreateFormControl } from '../../../hooks/useProjectCreateFormControl';
import { FormProvider } from 'react-hook-form';
import { Provider } from 'react-redux';
import { mockConfiguredStore } from '../../../store/mockStore';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

const AgencyPreferencesWrapper = () => {
    const { methods } = useProjectCreateFormControl({ setIsReady: jest.fn() });
    return (
        <Provider store={mockConfiguredStore}>
            <FormProvider {...methods.agencyPreferences}>
                <AgencyPreferencesStep />
            </FormProvider>
        </Provider>
    );
};

jest.mock('react-google-autocomplete/lib/usePlacesAutocompleteService');
(useGoogle as jest.Mock).mockReturnValue({
    placePredictions: [],
    getPlacePredictions: jest.fn(),
    isPlacePredictionsLoading: false,
});

describe('AgencyPreferencesStep', () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
        matches: false,
    }));
    it('should switch location pill to anywhere successfully', () => {
        render(<AgencyPreferencesWrapper />);
        const anywhere = screen.getByText('Anywhere');
        fireEvent.click(anywhere);
        expect(screen.queryByPlaceholderText('Add preferred city')).toBe(null);
        expect(
            screen.getByText('Is the location of your agency important?'),
        ).toBeInTheDocument();
    });
    it('should switch location pill to specific successfully', () => {
        render(<AgencyPreferencesWrapper />);
        const specific = screen.getByText('Specific location');
        fireEvent.click(specific);
        expect(
            screen.getByPlaceholderText('Preferred Location'),
        ).toBeInTheDocument();
    });
});
