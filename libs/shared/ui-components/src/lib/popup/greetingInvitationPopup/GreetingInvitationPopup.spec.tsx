import { fireEvent, render } from '@testing-library/react';
import GreetingInvitationPopup from './GreetingInvitationPopup';
const mockOnClickFn = jest.fn();
const props = {
    role: 'client' as 'client' | 'agency',
    onClick: mockOnClickFn,
};
describe('GreetingInvitation', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <GreetingInvitationPopup {...props} close={jest.fn()} />,
        );
        expect(baseElement).toBeTruthy();
        expect(
            getByText(
                'Here on your dashboard is where you’ll have access to any projects you’ve been added to by a colleague - or even start one yourself!',
            ),
        ).toBeInTheDocument();
        expect(getByText('Agency Pitches in < 7 Days')).toBeInTheDocument();
    });
    it('should render successfully for agency user type', () => {
        const { getByText } = render(
            <GreetingInvitationPopup
                {...props}
                role="agency"
                close={jest.fn()}
            />,
        );
        expect(
            getByText(
                'Here on your dashboard is where you’ll have access to any projects you’ve been added to by a colleague.',
            ),
        ).toBeInTheDocument();
        expect(getByText('Pitch Brands Around the World')).toBeInTheDocument();
    });
    it('should call successfully onClick handler on click button', () => {
        const { getByTestId } = render(
            <GreetingInvitationPopup {...props} close={jest.fn()} />,
        );
        const button = getByTestId('custom-button');
        fireEvent.click(button);
        expect(mockOnClickFn).toBeCalledTimes(1);
    });
});
