import { fireEvent, render, screen } from '@testing-library/react';
import Placeholder from './Placeholder';

const onClick = jest.fn();
const setIsError = jest.fn();
const props = {
    onClick,
    isError: false,
    setIsError,
};
describe('Placeholder', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Placeholder {...props} />);
        expect(baseElement).toBeTruthy();
    });
    it('should call onClick on link button click successfully', () => {
        render(<Placeholder {...props} />);
        const linkButton = screen.getByText('ADD NEW CARD');
        fireEvent.click(linkButton);
        expect(onClick).toBeCalled();
    });
});
