import { fireEvent, render, screen } from '@testing-library/react';
import { CreatePasswordPopup } from './CreatePasswordPopup';
import { useMediaContext, useViewPassword } from '@breef/shared/hooks';
import { useSetPasswordMutation } from '@breef/shared/data-access-profile';
import { useLazyGetSelfQuery } from '@breef/shared/data-access-auth';

const onClose = jest.fn();
const close = jest.fn();
const onBack = jest.fn();
const onSuccessCallback = jest.fn();

jest.mock('@breef/shared/data-access-profile', () => ({
    useSetPasswordMutation: jest.fn(),
}));
jest.mock('@breef/shared/data-access-auth', () => ({
    useLazyGetSelfQuery: jest.fn(),
}));
jest.mock('@breef/shared/hooks', () => ({
    useMediaContext: jest.fn(),
    useViewPassword: jest.fn(),
    useLimitSymbols: jest.fn(),
}));

const props = {
    onClose,
    close,
    onBack,
    onSuccessCallback,
};
//TODO: complete tests

const mockUseViewPassword = useViewPassword as jest.Mock;

describe('CreatePasswordPopup', () => {
    (useSetPasswordMutation as jest.Mock).mockReturnValue([
        jest.fn(),
        { isLoading: false },
    ]);
    (useLazyGetSelfQuery as jest.Mock).mockReturnValue([
        jest.fn(),
        { isLoading: false },
    ]);
    (useMediaContext as jest.Mock).mockReturnValue({
        isMobile: false,
    });
    mockUseViewPassword.mockReturnValue({
        typeInput: 'text',
        toggleTypeInput: jest.fn(),
    });
    it('should render successfully', () => {
        render(<CreatePasswordPopup {...props} />);
        expect(screen.getByText('Create password')).toBeInTheDocument();
        expect(
            screen.getByText('Set a password to save your scope to Breef.'),
        ).toBeInTheDocument();
    });
    it('should handle click on button back successfully', () => {
        render(<CreatePasswordPopup {...props} />);
        const backButton = document.getElementsByClassName('button-back')[0];
        expect(backButton).toBeInTheDocument();
        fireEvent.click(backButton);
        expect(onBack).toBeCalled();
    });
    it('should handle close popup on close button click successfully', () => {
        render(<CreatePasswordPopup {...props} />);
        const closeButton = document.getElementsByClassName('close-button')[0];
        expect(closeButton).toBeInTheDocument();
        fireEvent.click(closeButton);
        expect(onClose).toBeCalled();
    });
    // it('should inputs values in fields successfully', () => {
    //     render(
    //         <CreatePasswordPopup {...props} />,
    //     );
    //     const inputPassword = screen.getByPlaceholderText('Password');
    //     const inputConfirmPassword = screen.getByPlaceholderText('Confirm Password');
    //     expect(inputPassword).toBeInTheDocument();
    //     expect(inputConfirmPassword).toBeInTheDocument();
    //
    //
    //     // const closeButton = document.getElementsByClassName('close-button')[0];
    //     // expect(closeButton).toBeInTheDocument();
    //     // fireEvent.click(closeButton);
    //     // expect(onClose).toBeCalled();
    // });
});
