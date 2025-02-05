import { Provider } from 'react-redux';
import { FormProvider } from 'react-hook-form';
import CompanyDetailsStep from './CompanyDetailsStep';
import { fireEvent, render, screen } from '@testing-library/react';
import { useProjectCreateFormControl } from '../../../hooks/useProjectCreateFormControl';
import { mockConfiguredStore } from '../../../store/mockStore';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

jest.mock('react-google-autocomplete/lib/usePlacesAutocompleteService');
(useGoogle as jest.Mock).mockReturnValue({
    placePredictions: [],
    getPlacePredictions: jest.fn(),
    isPlacePredictionsLoading: false,
});

const CompanyDetailsStepWrapper = () => {
    const { methods } = useProjectCreateFormControl({ setIsReady: jest.fn() });
    return (
        <Provider store={mockConfiguredStore}>
            <FormProvider {...methods.companyDetails}>
                <CompanyDetailsStep />
            </FormProvider>
        </Provider>
    );
};

describe('CompanyDetailsStep', () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
        matches: false,
    }));
    it('should render successfully', () => {
        render(<CompanyDetailsStepWrapper />);
        expect(screen.getByText('Company Name')).toBeInTheDocument();
        expect(screen.getByText('Website')).toBeInTheDocument();
        expect(screen.getByText('Your Location')).toBeInTheDocument();
        expect(screen.getByText('About My Company')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Share more about your company’s background, mission and goals.',
            ),
        ).toBeInTheDocument();
    });
    it('should change website on input successfully', () => {
        render(<CompanyDetailsStepWrapper />);
        const inputWebsite = screen.getAllByPlaceholderText('breef.com')[0];
        expect(inputWebsite).toBeInTheDocument();
        fireEvent.change(inputWebsite, {
            target: { value: 'test-website.com' },
        });
        expect(
            screen.getByDisplayValue('test-website.com'),
        ).toBeInTheDocument();
    });
});
