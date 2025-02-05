import { fireEvent, render, screen } from '@testing-library/react';
import TeamMember from './TeamMember';

const onClick = jest.fn();
const props = {
    isChecked: false,
    onClick,
    firstName: 'firstName',
    lastName: 'lastName',
};

describe('TeamMember', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<TeamMember {...props} />);
        expect(baseElement).toBeTruthy();
        const mainContainer = screen.getByTestId('main-container');
        fireEvent.click(mainContainer);
        expect(onClick).toBeCalled();
    });
});
