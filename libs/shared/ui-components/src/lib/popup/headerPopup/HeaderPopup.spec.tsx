import { fireEvent, render } from '@testing-library/react';
import HeaderPopup from './HeaderPopup';

const onClose = jest.fn();
const defaultProps = {
    isClose: false,
    onClose,
};
describe('HeaderPopup', () => {
    it('should render with close button successfully', () => {
        const { getByTestId } = render(<HeaderPopup {...defaultProps} />);
        expect(getByTestId('button-close')).toBeInTheDocument();
    });
    it('should call onClose on button close click successfully', () => {
        const { getByTestId } = render(<HeaderPopup {...defaultProps} />);
        const button = getByTestId('button-close');
        fireEvent.click(button);
        expect(onClose).toBeCalled();
    });
});
