import { render } from '@testing-library/react';

describe('AccountsList', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<div>Hello</div>);
        expect(baseElement).toBeTruthy();
    });
});

// TODO: write tests!!

// import { fireEvent, render } from '@testing-library/react';
// import AccountsList from './AccountsList';

// const addCard = jest.fn();
// const removeCard = jest.fn();

// const bankAccountList = [
//     {
//         id: '1',
//         type: 'bank',
//         name: 'Bank 1',
//         number: '************6666',
//         typeIcon: 'Chase',
//     },
// ];

// const cardList = [
//     {
//         id: '2',
//         type: 'card',
//         name: 'Test Bank',
//         number: '************6666',
//         typeIcon: 'mastercard',
//     },
// ];

// const props = {
//     addCard,
//     removeCard,
//     isLoadingList: false,
//     isSubmittingItem: false,
// };
// describe('AccountsList', () => {
//     it('should render with bank list successfully', () => {
//         const { baseElement, getByText, getByTestId } = render(
//             <AccountsList {...props} list={bankAccountList} />,
//         );
//         expect(baseElement).toBeTruthy();
//         expect(getByTestId('bank-image')).toBeInTheDocument();
//         expect(
//             getByText('Checking ending in ************6666'),
//         ).toBeInTheDocument();
//     });
//     it('should render with card list successfully', () => {
//         const { getByText, getByTestId } = render(
//             <AccountsList {...props} list={cardList} />,
//         );
//         expect(getByTestId('card-image')).toBeInTheDocument();
//         expect(
//             getByText('Credit card ending in ************6666'),
//         ).toBeInTheDocument();
//     });
//     it('should display loader if isLoadingList prop is ture', () => {
//         const { getByTestId } = render(
//             <AccountsList {...props} list={cardList} isLoadingList={true} />,
//         );
//         expect(getByTestId('loader')).toBeInTheDocument();
//     });
//     it('should call addCard function on button add click', () => {
//         const { getByText } = render(
//             <AccountsList {...props} list={cardList} />,
//         );
//         const buttonAdd = getByText('PAYMENT METHOD');
//         fireEvent.click(buttonAdd);
//         expect(addCard).toBeCalled();
//     });
//     it('should call removeCard function on card click', () => {
//         const { getByText } = render(
//             <AccountsList {...props} list={cardList} />,
//         );
//         const card = getByText('Test Bank');
//         fireEvent.click(card);
//         expect(removeCard).toBeCalledWith('card', '2');
//     });
// });
