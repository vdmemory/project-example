import { render } from '@testing-library/react';
import CardSelect from './CardSelect';

const defaultProps = {
    initialOptions: [
        {
            id: 1,
            name: 'test name 1',
            description: 'test description 1',
        },
        {
            id: 2,
            name: 'test name 2',
            description: 'test description 2',
        },
    ],
    initialSelected: [],
    handleSelect: jest.fn(),
    cardType: '',
};
describe('CardSelect', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <CardSelect {...defaultProps}>
                <div>test children</div>
            </CardSelect>,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('test name 1')).toBeInTheDocument();
        expect(getByText('test name 2')).toBeInTheDocument();
        expect(getByText('test children')).toBeInTheDocument();
    });
    it('should render successfully', () => {
        const { getByTestId } = render(
            <CardSelect {...defaultProps} isLoading={true}>
                <div>test children</div>
            </CardSelect>,
        );
        expect(getByTestId('preloader-wrapper')).toBeInTheDocument();
    });
});
