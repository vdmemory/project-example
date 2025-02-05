import { render } from '@testing-library/react';
import { SignUpTerms } from './SignUpTerms';

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: {},
            asPath: '',
            push: jest.fn(),
        };
    },
}));
describe('SignUpTerms', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(<SignUpTerms />);
        expect(baseElement).toBeTruthy();
        expect(
            getByText('By continuing, you agree to Breef’s and'),
        ).toBeInTheDocument();
        expect(getByText('Terms of Use')).toBeInTheDocument();
        expect(getByText('Privacy Policy')).toBeInTheDocument();
    });
});
