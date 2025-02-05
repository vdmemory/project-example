import { fireEvent, render, screen } from '@testing-library/react';
import CustomGoogleButton from './CustomGoogleButton';

const onClick = jest.fn();
const props = {
    title: 'test title',
    onClick,
};
describe('CustomGoogleButton', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CustomGoogleButton {...props} />);
        expect(baseElement).toBeTruthy();
        expect(screen.getByText('test title')).toBeInTheDocument();
    });
    it('should call onClick on button click successfully', () => {
        const { baseElement } = render(<CustomGoogleButton {...props} />);
        const button = document.getElementsByTagName('button')[0];
        fireEvent.click(button);
        expect(onClick).toBeCalled();
    });
});
