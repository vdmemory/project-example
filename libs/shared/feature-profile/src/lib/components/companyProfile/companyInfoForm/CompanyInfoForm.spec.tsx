import { fireEvent, render } from '@testing-library/react';
import CompanyInfoForm from './CompanyInfoForm';
import { MockProfileProvider } from '../../../utils/mockData.ts/mockProfileProvider';
import { mockCompanyInfoData } from '../../../utils/mockData.ts/mockProps';
import 'intersection-observer';

const props = {
    isLoading: false,
    companyInfoData: mockCompanyInfoData,
    isActiveForm: true,
};
describe('BillingAddressForm', () => {
    it('should render for client user type successfully', () => {
        const { getByDisplayValue, getByText, getAllByText } = render(
            <MockProfileProvider>
                <CompanyInfoForm {...props} companyType="client" />
            </MockProfileProvider>,
        );
        expect(getByDisplayValue('Test Company')).toBeInTheDocument();
        expect(getByDisplayValue('example.com')).toBeInTheDocument();
        expect(getByText('industry 1')).toBeInTheDocument();
        expect(getByText('location 1')).toBeInTheDocument();
        expect(getAllByText('It’s just me').length).toBe(2);
        expect(getByText('@instagram')).toBeInTheDocument();
        expect(getByText('@twitter')).toBeInTheDocument();
        expect(getByText('@tiktok')).toBeInTheDocument();
        expect(getByDisplayValue('Test Company Overview')).toBeInTheDocument();
    });
    it('should render for agency user type successfully', () => {
        const { getByDisplayValue, getByText } = render(
            <MockProfileProvider>
                <CompanyInfoForm {...props} companyType="agency" />
            </MockProfileProvider>,
        );
        expect(getByDisplayValue('Test Company')).toBeInTheDocument();
        expect(getByDisplayValue('example.com')).toBeInTheDocument();
        expect(getByText('location 1')).toBeInTheDocument();
        expect(getByText('@instagram')).toBeInTheDocument();
        expect(getByText('@twitter')).toBeInTheDocument();
        expect(getByText('@linkedin')).toBeInTheDocument();
        expect(getByDisplayValue('Test Company Overview')).toBeInTheDocument();
    });
    it('should change field values on input successfully', () => {
        const { getByLabelText, getByPlaceholderText, getByDisplayValue } =
            render(
                <MockProfileProvider>
                    <CompanyInfoForm {...props} companyType="client" />
                </MockProfileProvider>,
            );
        const companyName = getByPlaceholderText('Your Company Name');
        const website = getByLabelText('Website');
        const companyOverview = getByPlaceholderText(
            'Share an short intro here...',
        );

        fireEvent.change(companyName, {
            target: { value: 'New Company Name' },
        });
        fireEvent.change(website, { target: { value: 'new-website.com' } });
        fireEvent.change(companyOverview, {
            target: { value: 'New Company Overview Test' },
        });

        expect(getByDisplayValue('New Company Name')).toBeInTheDocument();
        expect(getByDisplayValue('new-website.com')).toBeInTheDocument();
        expect(
            getByDisplayValue('New Company Overview Test'),
        ).toBeInTheDocument();
    });
});
