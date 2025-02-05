import { fireEvent, render, screen } from '@testing-library/react';
import { TagInput } from './TagInput.component';

const onClick = jest.fn();
const props = {
    id: 1,
    value: 'test value',
    onClick,
    isWarning: false,
};
describe('TagInput', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<TagInput {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('test value'));
    });
    it('should call onClick on button click successfully', () => {
        render(<TagInput {...props} />);
        const button = document.getElementsByTagName('button')[0];
        fireEvent.click(button);
        expect(onClick).toBeCalledWith(1);
    });
});
