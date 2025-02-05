import { fireEvent, render } from '@testing-library/react';
import BackButton from './BackButton';

const onClick = jest.fn();
const props = {
    onClick,
    name: 'Back Button',
};
jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: {},
            asPath: '',
        };
    },
}));
describe('BackButton', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(<BackButton {...props} />);
        expect(baseElement).toBeTruthy();
        expect(getByText('Back Button')).toBeInTheDocument();
    });
    it('should call onClick successfully', () => {
        const { getByText } = render(<BackButton {...props} />);
        const btn = getByText('Back Button');
        fireEvent.click(btn);
        expect(onClick).toBeCalled();
    });
});
