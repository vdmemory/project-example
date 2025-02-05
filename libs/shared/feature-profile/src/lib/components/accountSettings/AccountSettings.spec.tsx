import { render, waitFor } from '@testing-library/react';
import { MockProfileProvider } from '../../utils/mockData.ts/mockProfileProvider';
import AccountSettings from './AccountSettings';

const mockAccountInfoData = {
    firstName: 'FirstName',
    lastName: 'LastName',
    email: 'test@gmail.com',
    phoneNumber: {
        number: '66-666-6666',
        code: '66',
        numberWithoutCountryCode: '66666666',
    },
    hasPassword: false,
    hasSocialAccount: false,
    role: 'owner',
};

window.scrollTo = jest.fn();

jest.mock('@breef/shared/data-access-profile', () => ({
    __esModule: true,
    ...jest.requireActual('@breef/shared/data-access-profile'),
    useGetAccountInfoQuery: () => ({
        data: mockAccountInfoData,
    }),
}));

const renderElement = (companyType: 'client' | 'agency') => {
    const methods = render(
        <MockProfileProvider>
            <AccountSettings companyType={companyType} />
        </MockProfileProvider>,
    );
    return { ...methods };
};

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

describe('AccountSettings', () => {
    it('should render successfully', () => {
        const { baseElement } = renderElement('client');
        expect(baseElement).toBeTruthy();
    });

    describe('CompanyProfile section texts, wait for the asynchronous operations to complete for role client', () => {
        const testCases = [
            { expected: 'Account information' },
            { expected: 'First name' },
            { expected: 'Last name' },
            { expected: 'Email' },
            { expected: 'Phone number' },
            { expected: 'New password' },
            { expected: 'Confirm new password' },
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
