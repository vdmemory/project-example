import { fireEvent, render } from '@testing-library/react';
import { BeforeCreationPopup } from './BeforeCreationPopup';

const onClickComplete = jest.fn();
const defaultProps = {
    label: 'test label',
    note: 'test note',
    headerImageUrl: 'url',
    onClickComplete,
    completeButtonLabel: 'test complete',
    isDisableComplete: false,
};
describe('BeforeCreationPopup', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <BeforeCreationPopup {...defaultProps}>
                <div>test content</div>
            </BeforeCreationPopup>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('test label')).toBeInTheDocument();
        expect(getByText('test note')).toBeInTheDocument();
        expect(getByText('test complete')).toBeInTheDocument();
    });
    it('should not call onClickComplete if isDisableComplete is true', () => {
        const { getByText } = render(
            <BeforeCreationPopup {...defaultProps} isDisableComplete={true}>
                <div>test content</div>
            </BeforeCreationPopup>,
        );
        const buttonComplete = getByText('test complete');
        fireEvent.click(buttonComplete);
        expect(onClickComplete).not.toBeCalled();
    });
    it('should call onClickComplete successfully', () => {
        const { getByText } = render(
            <BeforeCreationPopup {...defaultProps}>
                <div>test content</div>
            </BeforeCreationPopup>,
        );
        const buttonComplete = getByText('test complete');
        fireEvent.click(buttonComplete);
        expect(onClickComplete).toBeCalled();
    });
});
