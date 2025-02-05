import { fireEvent, render, screen } from '@testing-library/react';
import { SuccessPopup } from './SuccessPopup';

const onClose = jest.fn();
const onClick = jest.fn();

const props = {
    onClose,
    onClick,
    title: 'test title',
    subtitle: 'test subtitle',
    buttonTitle: 'test button title',
};

describe('SuccessPopup', () => {
    it('should render successfully', () => {
        render(<SuccessPopup {...props} />);
        expect(screen.getByText('test title')).toBeInTheDocument();
        expect(screen.getByText('test subtitle')).toBeInTheDocument();
        expect(screen.getByText('test button title')).toBeInTheDocument();
    });
    it('should handle close popup on close button click successfully', () => {
        render(<SuccessPopup {...props} />);
        const closeButton = document.getElementsByClassName('close-button')[0];
        expect(closeButton).toBeInTheDocument();
        fireEvent.click(closeButton);
        expect(onClose).toBeCalled();
    });
    it('should handle action on button click successfully', () => {
        render(<SuccessPopup {...props} />);
        const actionButton = document.getElementsByClassName('button-save')[0];
        expect(actionButton).toBeInTheDocument();
        fireEvent.click(actionButton);
        expect(onClick).toBeCalled();
    });
});
