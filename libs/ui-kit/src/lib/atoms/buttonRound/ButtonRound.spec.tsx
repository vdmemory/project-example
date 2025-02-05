import { fireEvent, render } from '@testing-library/react';
import { ButtonRound } from './ButtonRound.component';

const onClick = jest.fn();
const props = {
    onClick,
};
describe('ButtonRound', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ButtonRound {...props} />);
        expect(baseElement).toBeTruthy();
    });
    it('should call onClick successfully', () => {
        render(<ButtonRound {...props} />);
        const button = document.getElementsByTagName('button')[0];
        fireEvent.click(button);
        expect(onClick).toBeCalled();
    });
});
