import { render } from '@testing-library/react';
import { PaymentStatusNames } from '@breef/shared/constants';
import AccountsList from './AccountsList';

const listCards = [
    {
        id: '1',
        type: PaymentStatusNames.BANK_ACCOUNT,
        name: 'Chase',
        number: '1234',
        typeIcon: 'bank',
        displayName: 'Bank account ending in 1234',
        token: 'token',
        brand: 'Brand',
        default: true,
        expiredDate: '12/2023',
        address: {
            line1: 'line1',
            city: 'city',
            country: 'US',
        },
    },
];

const props = {
    list: listCards,
    addItem: jest.fn(),
    removeItem: jest.fn(),
    onSelectItem: jest.fn(),
    handleEditCard: jest.fn(),
    selectedItem: null,
    isShowError: false,
    nameLinkBtn: 'Add new card',
    hasCreditCard: true,
    isEdit: false,
    handleUpdateIsEdit: jest.fn(),
    isLoadingList: false,
};

describe('AccountsList', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<AccountsList {...props} />);
        expect(baseElement).toBeTruthy();
    });

    describe('Elements render AccountsList', () => {
        const testCases = [
            { name: 'brand account', expected: 'Brand' },
            { name: 'bank account name', expected: 'Chase' },
            { name: 'bank account number', expected: '1234' },
            { name: 'bank account expires', expected: /12\/2023/ },
            { name: 'add button name', expected: 'Add new card' },
        ];

        testCases.forEach(testCase => {
            it(`should render successfully AccountsList with ${testCase.name}`, () => {
                const { getByText } = render(<AccountsList {...props} />);
                const element = getByText(testCase.expected);
                expect(element).toBeInTheDocument();
            });
        });

        it(`should render successfully AccountsList with edit button`, () => {
            const { baseElement } = render(<AccountsList {...props} />);
            const editButton = baseElement.querySelector('.edit-button');
            expect(editButton).toBeTruthy();
        });

        it(`should render successfully AccountsList with short cut`, () => {
            const { baseElement } = render(<AccountsList {...props} />);
            const shortCut = baseElement.querySelector('.short-cut');
            expect(shortCut).toBeTruthy();
        });

        it(`should render successfully AccountsList with radio`, () => {
            const { baseElement } = render(<AccountsList {...props} />);
            const radio = baseElement.querySelector('.radio');
            expect(radio).toBeTruthy();
        });

        it(`should render successfully AccountsList with icon card`, () => {
            const { baseElement } = render(<AccountsList {...props} />);
            const item = baseElement.querySelector('.item-icon');
            const childrenElement = item?.childNodes[0];
            expect(childrenElement).toBeTruthy();
        });

        it(`should render successfully AccountsList with remove button`, () => {
            const { baseElement } = render(<AccountsList {...props} />);
            const removeBtn = baseElement.querySelector('.remove');
            expect(removeBtn).toBeTruthy();
        });

        it(`should render successfully AccountsList with button add`, () => {
            const { baseElement } = render(<AccountsList {...props} />);
            const buttonAdd = baseElement.querySelector('.button-add');
            expect(buttonAdd).toBeTruthy();
        });
    });
});
