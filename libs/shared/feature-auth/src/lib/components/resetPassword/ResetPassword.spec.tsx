import { render, screen } from '@testing-library/react';
import ResetPassword from './ResetPassword';
import { Provider } from 'react-redux';
import { mockConfiguredStore } from '../../store/mockStore';

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: {},
            asPath: '',
            push: () => null,
        };
    },
}));
const WrapperResetPassword = () => {
    return (
        <Provider store={mockConfiguredStore}>
            <ResetPassword token="token" />
        </Provider>
    );
};

describe('ResetPassword', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<WrapperResetPassword />);
        expect(baseElement).toBeTruthy();
    });
});
