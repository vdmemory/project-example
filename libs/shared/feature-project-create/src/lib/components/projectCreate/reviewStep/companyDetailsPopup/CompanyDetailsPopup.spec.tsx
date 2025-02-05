import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CompanyDetailsPopup } from './CompanyDetailsPopup';
import { useCompanyDetailsFormControl } from '../../../../hooks/useCompanyDetailsFormControl';
import { useRouter } from 'next/router';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

jest.mock('react-google-autocomplete/lib/usePlacesAutocompleteService');
(useGoogle as jest.Mock).mockReturnValue({
    placePredictions: [],
    getPlacePredictions: jest.fn(),
    isPlacePredictionsLoading: false,
});

jest.mock('../../../../hooks/useCompanyDetailsFormControl');

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

(useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
});

const mockUseCompanyDetailsFormControl =
    useCompanyDetailsFormControl as jest.Mock;

const mockFormControl = {
    form: {
        name: {
            field: { value: '', onChange: jest.fn() },
            error: { message: '' },
        },
        website: {
            field: { value: '', onChange: jest.fn() },
            error: { message: '' },
        },
        location: {
            field: { value: '', onChange: jest.fn() },
            error: { message: '' },
        },
        description: {
            field: { value: '', onChange: jest.fn() },
            error: { message: '' },
        },
    },
    handleSave: jest.fn(),
    isValidForm: true,
};

mockUseCompanyDetailsFormControl.mockReturnValue(mockFormControl);

describe('CompanyDetailsPopup', () => {
    it('renders the popup with title and subtitle', () => {
        render(<CompanyDetailsPopup />);

        expect(screen.getByText('Add company details')).toBeInTheDocument();
        expect(
            screen.getByText(
                'This is the last step before viewing your custom project scope.',
            ),
        ).toBeInTheDocument();
    });

    it('renders form fields with placeholders', () => {
        render(<CompanyDetailsPopup />);

        expect(screen.getByPlaceholderText('Company Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Website')).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText('Company Location'),
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText(
                'We’re a small, woman-owned, beauty company focusing on....',
            ),
        ).toBeInTheDocument();
    });

    it('calls onClose when the close button is clicked', () => {
        const onClose = jest.fn();
        const { baseElement } = render(
            <CompanyDetailsPopup onClose={onClose} />,
        );

        const closeButton = baseElement.querySelector(
            '.close-button',
        ) as HTMLButtonElement;
        fireEvent.click(closeButton);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onBack when the back button is clicked', () => {
        const onBack = jest.fn();
        const { baseElement } = render(<CompanyDetailsPopup onBack={onBack} />);
        const backButton = baseElement.querySelector(
            '.button-back',
        ) as HTMLButtonElement;
        fireEvent.click(backButton);

        expect(onBack).toHaveBeenCalledTimes(1);
    });

    it('calls handleSave when the Next button is clicked', () => {
        const onNext = jest.fn();
        render(<CompanyDetailsPopup onNext={onNext} />);
        const nextButton = screen.getByTestId('button-container');
        fireEvent.click(nextButton);
        expect(mockFormControl.handleSave).toHaveBeenCalledTimes(1);
    });

    it('disables the Next button when the form is invalid', () => {
        const onNext = jest.fn();
        mockFormControl.isValidForm = false;
        render(<CompanyDetailsPopup onNext={onNext} />);
        const nextButton = screen.getByTestId('button-container');
        expect(nextButton).toBeDisabled();
    });

    it('enables the Next button when the form is valid', () => {
        const onNext = jest.fn();
        mockFormControl.isValidForm = true;
        render(<CompanyDetailsPopup onNext={onNext} />);
        const nextButton = screen.getByTestId('button-container');
        expect(nextButton).not.toBeDisabled();
    });
});
