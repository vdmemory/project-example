import { render, waitFor } from '@testing-library/react';
import CompanyProfile from './CompanyProfile';
import {
    mockBillingData,
    mockCompanyInfoData,
    mockServiceData,
} from '../../utils/mockData.ts/mockProps';
import { MockProfileProvider } from '../../utils/mockData.ts/mockProfileProvider';
import {
    useChangeBillingDataMutation,
    useChangeCapabilitiesMutation,
    useChangeCompanyInfoMutation,
    useChangeCompanyMutation,
} from '@breef/shared/data-access-profile';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import 'intersection-observer';

jest.mock('./useCompProfileAsyncMethods', () => ({
    __esModule: true,
    ...jest.requireActual('./useCompProfileAsyncMethods'),
    useCompProfileAsyncMethods: () => ({
        getFetchData: jest.fn(),
        isLoading: false,
        services: mockServiceData,
        companyInfo: mockCompanyInfoData,
        billingData: mockBillingData,
    }),
}));

jest.mock('@breef/shared/hooks', () => ({
    __esModule: true,
    ...jest.requireActual('@breef/shared/hooks'),
    useGetRestrictions: () => ({
        checkIsHaveRestriction: jest.fn(),
    }),
    useSaveLogoImage: () => ({
        uploadCroppedImage: jest.fn(),
        objectImage: null,
    }),
    useGetList: () => [
        {
            value: '1',
            label: '1',
        },
        {
            value: '2',
            label: '2',
        },
    ],
}));

window.scrollTo = jest.fn();

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: {},
            asPath: '',
            push: jest.fn(),
        };
    },
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

jest.mock('@breef/shared/data-access-profile', () => ({
    __esModule: true,
    ...jest.requireActual('@breef/shared/data-access-profile'),
    useChangeCompanyInfoMutation: jest.fn(),
    useChangeBillingDataMutation: jest.fn(),
    useChangeCompanyMutation: jest.fn(),
    useChangeCapabilitiesMutation: jest.fn(),
}));

jest.mock('react-google-autocomplete/lib/usePlacesAutocompleteService');
(useGoogle as jest.Mock).mockReturnValue({
    placePredictions: [],
    getPlacePredictions: jest.fn(),
    isPlacePredictionsLoading: false,
});

(useChangeBillingDataMutation as jest.Mock).mockImplementation(() => [
    jest.fn(),
    jest.fn(() =>
        Promise.resolve({
            isLoading: false,
        }),
    ),
]);

(useChangeCompanyInfoMutation as jest.Mock).mockImplementation(() => [
    jest.fn(),
    jest.fn(() =>
        Promise.resolve({
            isLoading: false,
        }),
    ),
]);

(useChangeCompanyMutation as jest.Mock).mockImplementation(() => [
    jest.fn(),
    jest.fn(() =>
        Promise.resolve({
            isLoading: false,
        }),
    ),
]);

(useChangeCapabilitiesMutation as jest.Mock).mockImplementation(() => [
    jest.fn(),
    jest.fn(() =>
        Promise.resolve({
            isLoading: false,
        }),
    ),
]);

const renderElement = (companyType: 'client' | 'agency') => {
    const methods = render(
        <MockProfileProvider>
            <CompanyProfile companyType={companyType} />
        </MockProfileProvider>,
    );
    return { ...methods };
};

describe('CompanyProfile', () => {
    it('should render for client user type successfully', () => {
        const { baseElement } = renderElement('client');
        expect(baseElement).toBeTruthy();
    });
    describe('CompanyProfile section texts, wait for the asynchronous operations to complete for role client', () => {
        const testCases = [
            { expected: 'Company Information' },
            { expected: 'Your Logo' },
            { expected: 'Company name' },
            { expected: 'Website' },
            { expected: 'Industries' },
        ];

        testCases.forEach((testCase, i) => {
            it(`should render successfully text ${i + 1}`, async () => {
                const { getByText } = renderElement('client');
                await waitFor(() => {
                    expect(getByText(testCase.expected)).toBeInTheDocument();
                });
            });
        });
    });
});
