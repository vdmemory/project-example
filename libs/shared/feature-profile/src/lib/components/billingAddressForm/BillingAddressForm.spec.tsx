import { fireEvent, render } from '@testing-library/react';
import { MockProfileProvider } from '../../utils/mockData.ts/mockProfileProvider';
import BillingAddressForm from './BillingAddressForm';
import { mockBillingData } from '../../utils/mockData.ts/mockProps';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

const props = {
    isLoading: false,
    billingAddressData: mockBillingData,
    isActiveForm: true,
};

jest.mock('react-google-autocomplete/lib/usePlacesAutocompleteService');
(useGoogle as jest.Mock).mockReturnValue({
    placePredictions: [],
    getPlacePredictions: jest.fn(),
    isPlacePredictionsLoading: false,
});

describe('BillingAddressForm', () => {
    it('should render successfully', () => {
        const { baseElement, getByDisplayValue } = render(
            <MockProfileProvider>
                <BillingAddressForm {...props} />
            </MockProfileProvider>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByDisplayValue('Test Legal Name')).toBeInTheDocument();
        expect(getByDisplayValue('Kyiv, UA')).toBeInTheDocument();
        expect(getByDisplayValue('6666666')).toBeInTheDocument();
    });
    it('should change each field value on input', () => {
        const { getByDisplayValue, getByPlaceholderText } = render(
            <MockProfileProvider>
                <BillingAddressForm {...props} />
            </MockProfileProvider>,
        );
        const legalName = getByPlaceholderText('Legal Name');
        const billingAddress = getByPlaceholderText('Billing Address');
        const billingAddressAdditional = getByPlaceholderText(
            'Apartment # / PO Box / Suite #...',
        );

        fireEvent.change(legalName, { target: { value: 'test legal' } });
        fireEvent.change(billingAddress, {
            target: { value: 'test billing address' },
        });
        fireEvent.change(billingAddressAdditional, {
            target: { value: 'test suite' },
        });

        expect(getByDisplayValue('test legal')).toBeInTheDocument();
        expect(getByDisplayValue('test billing address')).toBeInTheDocument();
        expect(getByDisplayValue('test suite')).toBeInTheDocument();
    });
});
