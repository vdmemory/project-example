import { render } from '@testing-library/react';
import Services from './Services';

const onChange = jest.fn();
const defaultProps = {
    value: [],
    onChange,
    label: 'Test Label',
    services: [
        {
            id: 1,
            name: 'service 1',
        },
        {
            id: 2,
            name: 'service 2',
        },
    ],
};
describe('Services', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <Services {...defaultProps} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('Test Label')).toBeInTheDocument();
        expect(getByText('service 1')).toBeInTheDocument();
        expect(getByText('service 2')).toBeInTheDocument();
    });
});
