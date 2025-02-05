import { useGetCompanyInfoQuery } from '@breef/shared/data-access-profile';
import { render } from '@testing-library/react';
import { useRouter } from 'next/router';
import { BookACallModifiedPopup } from './BookACallModifiedPopup';

const onClose = jest.fn();
const onNext = jest.fn();

const props = {
    onClose,
    onNext,
};

jest.mock('@breef/shared/data-access-auth', () => ({
    __esModule: true,
    ...jest.requireActual('@breef/shared/data-access-auth'),
    useGetSelfQuery: () => ({
        data: {
            id: 1,
            email: 'email@gmail.com',
            firstName: 'first',
            lastName: 'last',
            companyType: 'client',
            isOnboardingComplete: true,
            companyPosition: 'owner',
            timeZone: 'Kiev',
            hasSocialAccount: false,
            dateJoined: '13.12.23',
            companyName: 'Company Name',
        },
        isLoading: false,
        isSuccess: true,
    }),
}));

jest.mock('@breef/shared/data-access-profile', () => ({
    __esModule: true,
    ...jest.requireActual('@breef/shared/data-access-profile'),
    useGetCompanyInfoQuery: jest.fn(),
}));

const getCompanyInfo = jest.fn();
(useGetCompanyInfoQuery as jest.Mock).mockImplementation(() => [
    getCompanyInfo,
]);

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));
(useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
});

jest.mock('@breef/shared/utils', () => ({
    ...jest.requireActual('@breef/shared/utils'),
    logout: jest.fn(),
}));

describe('BookACallModifiedPopup', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<BookACallModifiedPopup {...props} />);
        expect(baseElement).toBeTruthy();
    });

    describe('Elements render BookACallModifiedPopup', () => {
        const testCases = [
            { name: 'form title', expected: 'Book a planning call' },
            {
                name: 'form description',
                expected: 'Finalize your project with a Breef Strategist',
            },
            { name: 'form submit button', expected: 'Next' },
        ];

        testCases.forEach(testCase => {
            it(`should render successfully BookACallModifiedPopup with ${testCase.name}`, () => {
                const { getByText } = render(
                    <BookACallModifiedPopup {...props} />,
                );
                const element = getByText(testCase.expected);
                expect(element).toBeInTheDocument();
            });
        });
    });

    it(`should render successfully StartPitchPopup with popup window`, () => {
        render(<BookACallModifiedPopup {...props} />);
        const element = document.querySelector('.modal-pop');
        expect(element).toBeInTheDocument();
    });

    it(`should render successfully StartPitchPopup with popup overlay`, () => {
        render(<BookACallModifiedPopup {...props} />);
        const element = document.querySelector('.modal-overlay');
        expect(element).toBeInTheDocument();
    });
});
