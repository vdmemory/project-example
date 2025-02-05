import { fireEvent, render } from '@testing-library/react';
import ButtonChoice from './ButtonChoice';

const handleClick = jest.fn();
const props = {
    handleClick,
    src: {
        src: 'image.src',
        height: 20,
        width: 20,
    },
    title: 'Test title',
    desc: 'Test description',
    activeItem: false,
};

describe('BackButton', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(<ButtonChoice {...props} />);
        expect(baseElement).toBeTruthy();
        expect(getByText('Test title')).toBeInTheDocument();
        expect(getByText('Test description')).toBeInTheDocument();
        expect(document.getElementsByClassName('active').length).toBe(0);
    });
    it('should render with active class successfully', () => {
        render(<ButtonChoice {...props} activeItem={true} />);
        expect(document.getElementsByClassName('active').length).toBe(1);
    });
    it('should call handleClick on click successfully', () => {
        const { getByText } = render(<ButtonChoice {...props} />);
        fireEvent.click(getByText('Test title'));
        expect(handleClick).toBeCalled();
    });
});
