import { render } from '@testing-library/react';
import Skills from './Skills';

const defaultProps = {
    value: [],
    onChange: jest.fn(),
    label: 'Test Label',
    skills: [
        {
            id: 1,
            name: 'skill 1',
        },
        {
            id: 2,
            name: 'skill 2',
        },
    ],
};
describe('Skills', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(<Skills {...defaultProps} />);
        expect(baseElement).toBeTruthy();
        expect(getByText('Test Label')).toBeInTheDocument();
        expect(getByText('skill 1')).toBeInTheDocument();
        expect(getByText('skill 2')).toBeInTheDocument();
    });
});
