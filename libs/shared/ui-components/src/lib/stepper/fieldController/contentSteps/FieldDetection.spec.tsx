import { render } from '@testing-library/react';

import FieldDetection, { FieldDetectionProps } from './FieldDetection';
import { typeFields } from '../../';
import { configureStore } from '@reduxjs/toolkit';
import { apiProfile } from '@breef/shared/data-access-profile';
import { Provider } from 'react-redux';
import { apiAuth } from '@breef/shared/data-access-auth';
import { GOOGLE_CLIENT_ID } from '@breef/shared/constants';
import { GoogleOAuthProvider } from '@react-oauth/google';

const mockConfiguredStore = configureStore({
    reducer: {
        [apiProfile.reducerPath]: apiProfile.reducer,
        [apiAuth.reducerPath]: apiAuth.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            apiAuth.middleware,
            apiProfile.middleware,
        ),
});

const defaultProps = {
    setValue: jest.fn(),
    onChange: jest.fn(),
    onClick: jest.fn(),
    path: 'path',
    typeField: undefined,
    isDisableNextBtn: false,
};
const WrapperFieldDetection = (props: FieldDetectionProps) => (
    <Provider store={mockConfiguredStore}>
        <GoogleOAuthProvider
            onScriptLoadSuccess={() =>
                console.log('[google script load success]')
            }
            onScriptLoadError={() => console.log('[google script load error]')}
            clientId={GOOGLE_CLIENT_ID}
        >
            <FieldDetection {...props} />
        </GoogleOAuthProvider>
    </Provider>
);

describe('FieldDetection', () => {
    it('should render successfully', () => {
        const { baseElement, getByTestId } = render(
            <WrapperFieldDetection {...defaultProps} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByTestId('field-input')).toBeInTheDocument();
    });
    it('should render emailSocialBtnPassBtn typeField successfully', () => {
        const { getByTestId } = render(
            <WrapperFieldDetection
                {...defaultProps}
                typeField={typeFields.emailSocialBtnPassBtn}
            />,
        );
        expect(getByTestId('field-input')).toBeInTheDocument();
        expect(getByTestId('google-auth-wrapper')).toBeInTheDocument();
    });
    it('should render emailFindPasswordBackBtn typeField successfully', () => {
        const { getByTestId, getByText } = render(
            <WrapperFieldDetection
                {...defaultProps}
                typeField={typeFields.emailFindPasswordBackBtn}
            />,
        );
        expect(getByTestId('field-input')).toBeInTheDocument();
        expect(getByText('Back to sign in')).toBeInTheDocument();
    });
    it('should render passwordForgotBtn typeField successfully', () => {
        const { getByText, getByTestId } = render(
            <WrapperFieldDetection
                {...defaultProps}
                typeField={typeFields.passwordForgotBtn}
            />,
        );
        expect(getByTestId('field-input')).toBeInTheDocument();
        expect(getByText('Forgot password?')).toBeInTheDocument();
    });
    it('should render select typeField successfully', () => {
        const { getByTestId } = render(
            <WrapperFieldDetection
                {...defaultProps}
                typeField={typeFields.select}
            />,
        );
        expect(getByTestId('field-select')).toBeInTheDocument();
    });
    it('should render cardSelect typeField successfully', () => {
        const { getByTestId } = render(
            <WrapperFieldDetection
                {...defaultProps}
                typeField={typeFields.cardSelect}
            />,
        );
        expect(getByTestId('card-select-wrapper')).toBeInTheDocument();
    });
    it('should render multiCardSelect typeField successfully', () => {
        const { getByTestId } = render(
            <WrapperFieldDetection
                {...defaultProps}
                typeField={typeFields.multiCardSelect}
                listType="services"
            />,
        );
        expect(getByTestId('custom-button')).toBeInTheDocument();
        expect(getByTestId('services-select')).toBeInTheDocument();
    });
    it('should render multiChipSelect typeField successfully', () => {
        const { getByTestId } = render(
            <WrapperFieldDetection
                {...defaultProps}
                typeField={typeFields.multiChipSelect}
                listType="skills"
            />,
        );
        expect(getByTestId('custom-button')).toBeInTheDocument();
        expect(getByTestId('skills-select')).toBeInTheDocument();
    });
    it('should render bookACall typeField successfully', () => {
        const { getByTestId } = render(
            <WrapperFieldDetection
                {...defaultProps}
                typeField={typeFields.bookACall}
            />,
        );
        expect(getByTestId('book-a-call')).toBeInTheDocument();
    });
    it('should render multiplePlacesAutocomplete typeField successfully', () => {
        const { getByTestId } = render(
            <WrapperFieldDetection
                {...defaultProps}
                typeField={typeFields.multiplePlacesAutocomplete}
                value={[]}
            />,
        );
        expect(getByTestId('multiple-places-autocomplete')).toBeInTheDocument();
    });
});
