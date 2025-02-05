import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import BillingDataStep from './BillingDataStep';
import { ReactNode } from 'react';
import { BillingDataFormType } from '../../../types/kickoffTypes';
import { yupResolver } from '@hookform/resolvers/yup';
import { billingDataSchema } from '../../../utils/validation-forms/billingDataSchema';
import { Provider } from 'react-redux';
import { mockConfiguredStore } from '../../../store/mockStore';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

const Wrapper = (props: { children: ReactNode }) => {
    const methods = useForm<BillingDataFormType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            legalName: '',
            billingAddress: '',
            billingAddressAdditional: '',
            teamMembers: [],
            teamInvites: [],
            invites: [],
            files: [],
        },
        resolver: yupResolver(billingDataSchema),
    });
    return <FormProvider {...methods}>{props.children}</FormProvider>;
};

jest.mock('react-google-autocomplete/lib/usePlacesAutocompleteService');
(useGoogle as jest.Mock).mockReturnValue({
    placePredictions: [],
    getPlacePredictions: jest.fn(),
    isPlacePredictionsLoading: false,
});

describe('BillingDataStep', () => {
    it('should render component by agency user type successfully', () => {
        const { baseElement } = render(
            <Provider store={mockConfiguredStore}>
                <Wrapper>
                    <BillingDataStep userType="agency" />
                </Wrapper>
            </Provider>,
        );
        expect(baseElement).toBeTruthy();
        const contractsComponent = screen.getByText(/Contract \/ SOW:/gi);
        expect(contractsComponent).toBeTruthy();
    });
    it('should render component by client user type successfully', () => {
        const { baseElement } = render(
            <Provider store={mockConfiguredStore}>
                <Wrapper>
                    <BillingDataStep userType="client" />
                </Wrapper>
            </Provider>,
        );
        expect(baseElement).toBeTruthy();
    });
});
