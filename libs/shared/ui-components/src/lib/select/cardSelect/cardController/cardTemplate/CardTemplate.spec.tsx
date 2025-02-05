import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import CardTemplate from './CardTemplate';

const onChange = jest.fn();
const defaultProps = {
    data: {
        id: 'input-id',
        name: 'test name',
        isTagged: false,
    },
    isTagged: false,
    isChecked: false,
    type: 'checkbox' as 'radio' | 'checkbox',
    onChange,
};
describe('CardTemplate', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CardTemplate {...defaultProps} />);
        expect(baseElement).toBeTruthy();
        expect(document.querySelector('#input-id')).toBeInTheDocument();
    });
    it('should render with marks successfully', () => {
        const { getByTestId } = render(
            <CardTemplate
                {...defaultProps}
                isChecked={true}
                data={{ ...defaultProps.data, isTagged: true }}
            />,
        );
        expect(getByTestId('tagged-icon')).toBeInTheDocument();
        expect(getByTestId('check-min-icon')).toBeInTheDocument();
    });
    it('should render successfully', () => {
        const { getByTestId } = render(<CardTemplate {...defaultProps} />);
        fireEvent.click(getByTestId('card-wrapper'));
        expect(onChange).toBeCalled();
    });
});
