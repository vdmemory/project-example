import { fireEvent, render, waitFor } from '@testing-library/react';
import AccountInfoForm from './AccountInfoForm';
import { MockProfileProvider } from '../../../utils/mockData.ts/mockProfileProvider';
import { mockAccountInfoData } from '../../../utils/mockData.ts/mockProps';

//TODO: fix test

const renderElement = (companyType: 'client' | 'agency') => {
    const methods = render(
        <MockProfileProvider>
            <AccountInfoForm companyType={companyType} />
        </MockProfileProvider>,
    );
    return {
        ...methods,
    };
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

describe('AccountInfoForm', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = renderElement('client');
        expect(baseElement).toBeTruthy();
        expect(getByText('First name')).toBeTruthy();
    });

    describe('CompanyProfile section texts, wait for the asynchronous operations to complete for role client', () => {
        const testCases = [
            { expected: 'First name' },
            { expected: 'Last name' },
            { expected: 'Email' },
            { expected: 'Phone number' },
        ];

        testCases.forEach((testCase, i) => {
            it(`should render successfully text ${i + 1}`, () => {
                const { getByText } = renderElement('client');
                expect(getByText(testCase.expected)).toBeInTheDocument();
            });
        });
    });

    it('should render successfully', () => {
        const { getByLabelText, getByDisplayValue, getByPlaceholderText } =
            renderElement('client');
        const firstName = getByLabelText('First name');
        const lastName = getByLabelText('Last name');
        const email = getByLabelText('Email');

        fireEvent.change(firstName, { target: { value: 'New First Name' } });
        fireEvent.change(lastName, { target: { value: 'New Last Name' } });
        fireEvent.change(email, {
            target: { value: 'new.email.example@gmail.com' },
        });

        expect(getByDisplayValue('New First Name')).toBeInTheDocument();
        expect(getByDisplayValue('New Last Name')).toBeInTheDocument();
        expect(
            getByDisplayValue('new.email.example@gmail.com'),
        ).toBeInTheDocument();
    });
});
