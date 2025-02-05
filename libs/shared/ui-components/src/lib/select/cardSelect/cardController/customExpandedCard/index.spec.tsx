import { fireEvent, render, screen } from '@testing-library/react';

import CustomExpandedCard from './CustomExpandedCard';

const onChange = jest.fn();
const buttonClickHandler = jest.fn();
const onDelete = jest.fn();
const onEdit = jest.fn();
const children = <div>Children for CustomExpandedCard</div>;

const props = {
    label: 'expanded label',
    isChecked: true,
    onChange,
    cardNumber: 1,
    children: children,
    buttonLabel: 'label for button',
    buttonClickHandler,
    onDelete,
    onEdit,
    cardId: 2,
};

describe('CustomExpandedCard', () => {
    it('should render CustomExpandedCard successfully ', () => {
        const { baseElement } = render(<CustomExpandedCard {...props} />);
        expect(baseElement).toBeTruthy();
    });

    it('should render CustomExpandedCard with onDelete successfully ', () => {
        render(<CustomExpandedCard {...props} isEditable={true} />);
        const buttonDelete = screen.getByTestId('button-delete');
        fireEvent.click(buttonDelete);
        expect(buttonDelete).toBeTruthy();
        expect(props.onDelete).toBeCalledTimes(1);
    });

    it('should render CustomExpandedCard with onEdit successfully ', () => {
        const { getByTestId } = render(
            <CustomExpandedCard {...props} isEditable={false} />,
        );
        const buttonEdit = getByTestId('button-edit');
        fireEvent.click(buttonEdit);
        expect(props.onEdit).toBeCalledTimes(1);
        expect(buttonEdit).toBeTruthy();
    });

    it('should render CustomExpandedCard with number card successfully ', () => {
        const { baseElement } = render(<CustomExpandedCard {...props} />);
        expect(
            baseElement.getElementsByClassName('number')[0].textContent,
        ).toBe(`00${props.cardNumber}`);
    });
});
