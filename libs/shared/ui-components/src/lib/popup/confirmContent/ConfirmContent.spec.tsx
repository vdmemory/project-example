import { fireEvent, render } from '@testing-library/react';
import ConfirmContent from './ConfirmContent';

const onClick = jest.fn();
const defaultProps = {
    title: 'test title',
    description: 'test description',
    onClick,
    nameCancelBtn: 'test cancel btn',
    nameConfirmBtn: 'test confirm btn',
    isSubmitting: false,
};
describe('ConfirmContent', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <ConfirmContent {...defaultProps} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('test title')).toBeInTheDocument();
        expect(getByText('test description')).toBeInTheDocument();
        expect(getByText('test cancel btn')).toBeInTheDocument();
        expect(getByText('test confirm btn')).toBeInTheDocument();
    });
    it('should call onClick on confirm button successfully', () => {
        const { getByText } = render(<ConfirmContent {...defaultProps} />);
        const confirmBtn = getByText('test confirm btn');
        fireEvent.click(confirmBtn);
        expect(onClick).toBeCalledWith('confirm');
    });
    it('should call onClick on cancel button successfully', () => {
        const { getByText } = render(<ConfirmContent {...defaultProps} />);
        const cancelBtn = getByText('test cancel btn');
        fireEvent.click(cancelBtn);
        expect(onClick).toBeCalledWith('cancel');
    });
});
