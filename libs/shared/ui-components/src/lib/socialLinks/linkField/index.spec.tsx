// import { fireEvent, render } from '@testing-library/react';
// import LinkField from './LinkField';

// const onChange = jest.fn();
// const defaultProps = {
//     onChange,
//     value: 'test-link.com',
//     label: 'instagram',
// };

// describe('LinkField', () => {
//     it('should render successfully ', () => {
//         const { baseElement, getByText } = render(
//             <LinkField {...defaultProps} />,
//         );
//         expect(baseElement).toBeTruthy();
//         expect(getByText('test-link.com')).toBeInTheDocument();
//     });
//     it('should call onChange fn on delete icon click successfully', () => {
//         const { getByTestId } = render(<LinkField {...defaultProps} />);
//         const deleteIconElem = getByTestId('delete-icon-wrapper');
//         expect(deleteIconElem).toBeInTheDocument();
//         fireEvent.click(deleteIconElem);
//         expect(onChange).toBeCalled();
//     });
// });

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { LinkField } from './LinkField';
import { usePopup } from '../../popup/usePopup';

// Mock the dependencies
jest.mock('@breef/shared/assets', () => ({
    CloseIcon: () => <div data-testid="close-icon" />,
}));

jest.mock('@breef/shared/utils', () => ({
    getProfileNameDisplay: (value: string) => value,
}));

// jest.mock('../../popup/usePopup', () => ({
//     usePopup: jest.fn(),
// }));

const mockOpen = jest.fn();
const mockClose = jest.fn();

jest.mock('../../popup/usePopup', () => ({
    usePopup: jest.fn(() => ({
        isOpen: false,
        open: mockOpen,
        close: mockClose,
    })),
}));

jest.mock('../../popup/defaultPopup/socialLinksPopup/SocialLinksPopup', () => ({
    __esModule: true,
    default: ({ close }: any) => (
        <div>
            <button data-testid="close-popup" onClick={close}>
                Close
            </button>
        </div>
    ),
}));

jest.mock('@breef/shared/hooks', () => ({
    useMediaContext: () => ({ isMobile: false }),
}));

describe('LinkField', () => {
    const onChangeMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the component with the correct value', () => {
        render(
            <LinkField
                value="http://example.com"
                onChange={onChangeMock}
                label="Link"
            />,
        );
        expect(screen.getByText('http://example.com')).toBeInTheDocument();
    });

    it('should render the delete icon when there is a value', () => {
        render(
            <LinkField
                value="http://example.com"
                onChange={onChangeMock}
                label="Link"
            />,
        );
        expect(screen.getByTestId('delete-icon-wrapper')).toBeInTheDocument();
    });

    it('should not render the delete icon when there is no value', () => {
        render(<LinkField value="" onChange={onChangeMock} label="Link" />);
        expect(
            screen.queryByTestId('delete-icon-wrapper'),
        ).not.toBeInTheDocument();
    });

    it('should call onChange with an empty value when delete icon is clicked', () => {
        render(
            <LinkField
                value="http://example.com"
                onChange={onChangeMock}
                label="Link"
            />,
        );
        fireEvent.click(screen.getByTestId('delete-icon-wrapper'));
        expect(onChangeMock).toHaveBeenCalledWith({ target: { value: '' } });
    });

    it('should close the popup when close button is clicked', () => {
        const mockOpen = jest.fn();
        const mockClose = jest.fn();
        (usePopup as jest.Mock).mockReturnValue({
            isOpen: true,
            open: mockOpen,
            close: mockClose,
        });

        render(
            <LinkField
                value="http://example.com"
                onChange={onChangeMock}
                label="Link"
            />,
        );

        fireEvent.click(screen.getByTestId('close-popup'));
        expect(mockClose).toHaveBeenCalled();
    });
});
