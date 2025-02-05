import { fireEvent, render, screen } from '@testing-library/react';
import FieldButton from './FieldButton';

const onClick = jest.fn();
const props = {
    onClick,
};

describe('FieldButton', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<FieldButton {...props} />);
        expect(baseElement).toBeTruthy();
    });
    it('should click successfully', async () => {
        render(<FieldButton {...props} />);
        const button = screen.getByTestId('field-button');
        expect(button).toBeTruthy();
        fireEvent.click(button);
        expect(onClick).toBeCalled();
    });
});
