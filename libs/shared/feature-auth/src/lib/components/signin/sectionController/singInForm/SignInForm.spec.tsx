import { fireEvent, render } from '@testing-library/react';
import SignInForm from './SignInForm';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../../../utils';
import { LoginLinkFormValuesType } from '../../../../types/authFormTypes';
import { Provider } from 'react-redux';
import { mockConfiguredStore } from '../../../../store/mockStore';

const onClickForgotPassword = jest.fn();

const Wrapper = () => {
    const methods = useForm<LoginLinkFormValuesType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        resolver: yupResolver(loginSchema),
    });

    return (
        <Provider store={mockConfiguredStore}>
            <FormProvider {...methods}>
                <SignInForm onClickForgotPassword={onClickForgotPassword} />
            </FormProvider>
        </Provider>
    );
};
jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: { view: 'password' },
            asPath: '',
            push: jest.fn(),
        };
    },
}));

describe('SignInForm', () => {
    it('should render successfully', () => {
        const { baseElement, getByLabelText } = render(<Wrapper />);
        expect(baseElement).toBeTruthy();
        expect(getByLabelText('Email')).toBeInTheDocument();
        expect(getByLabelText('Password')).toBeInTheDocument();
    });
    it('should call onClickForgotPassword successfully', () => {
        const { getByText } = render(<Wrapper />);
        const forgotPasswordBtn = getByText('Forgot Password');
        fireEvent.click(forgotPasswordBtn);
        expect(onClickForgotPassword).toBeCalled();
    });
});
