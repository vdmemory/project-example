import React from 'react';
import { render, screen } from '@testing-library/react';
import GoogleAuth from './GoogleAuth';
import { AuthGoogleType } from '@breef/shared/types';

jest.mock('./useGoogleLoginMethods', () => ({
    __esModule: true,
    useGoogleLoginMethods: jest.fn(() => ({
        loginImplicit: jest.fn(),
        userCredential: null,
    })),
}));

describe('GoogleAuth', () => {
    it('should render successfully', () => {
        const mockOnClick = jest.fn((data: AuthGoogleType) => undefined);

        render(<GoogleAuth onClick={mockOnClick} />);

        const googleAuthElement = screen.getByTestId('google-auth');
        expect(googleAuthElement).toBeInTheDocument();
    });
});
