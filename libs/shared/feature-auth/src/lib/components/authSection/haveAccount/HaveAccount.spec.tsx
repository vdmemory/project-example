import { render } from '@testing-library/react';
import { HaveAccount } from './HaveAccount';

describe('AlreadyHaveAccount', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(<HaveAccount />);
        expect(baseElement).toBeTruthy();
        expect(getByText('Already have an account?')).toBeInTheDocument();
        expect(getByText('Log in')).toBeInTheDocument();
    });
    it('should render successfully with isSignInFlow prop', () => {
        const { baseElement, getByText } = render(<HaveAccount isSignInFlow />);
        expect(baseElement).toBeTruthy();
        expect(getByText('Don’t have an account yet?')).toBeInTheDocument();
        expect(getByText('Sign up')).toBeInTheDocument();
    });
});
