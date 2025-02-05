import { render, fireEvent } from '@testing-library/react';
import { EditableElem } from './EditableElem';

const onClick = jest.fn();
const props = {
    onClick,
    icon: <svg />,
    value: 'test description',
};

describe('EditableElem', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(<EditableElem {...props} />);
        expect(baseElement).toBeTruthy();
        expect(getByText('test description')).toBeInTheDocument();
    });
    it('should call onClick function successfully', () => {
        const { getByText } = render(<EditableElem {...props} />);
        fireEvent.click(getByText('test description'));
        expect(onClick).toBeCalled();
    });
});
