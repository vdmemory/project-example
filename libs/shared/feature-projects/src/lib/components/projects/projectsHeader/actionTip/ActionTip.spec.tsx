import { fireEvent, render } from '@testing-library/react';
import { ActionTip } from './ActionTip';

const mockOnClick = jest.fn();
const props = {
    title: 'title',
    imageConfig: {
        imageUrl: '',
        position: {},
    },
    onClick: mockOnClick,
    btnTitle: 'title',
};

describe('ActionTip', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ActionTip {...props} />);
        expect(baseElement).toBeTruthy();
    });
    it('should call onClick handler on button click successfully', () => {
        const { getByTestId } = render(<ActionTip {...props} />);
        const button = getByTestId('custom-button');
        fireEvent.click(button);
        expect(mockOnClick).toBeCalledTimes(1);
    });
});
