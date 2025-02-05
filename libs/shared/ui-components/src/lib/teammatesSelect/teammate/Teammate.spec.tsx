import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Teammate } from './Teammate';

describe('Teammate', () => {
    const mockTeammate = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        isDisabled: false,
    };
    const mockOnChange = jest.fn();
    const mockIsSelected = false;

    it('renders Teammate component correctly', () => {
        render(
            <Teammate
                teammate={mockTeammate}
                onChange={mockOnChange}
                isSelected={mockIsSelected}
            />,
        );

        const teammateName = screen.getByText('John Doe');
        expect(teammateName).toBeInTheDocument();
    });

    it('calls onChange function when clicked', () => {
        render(
            <Teammate
                teammate={mockTeammate}
                onChange={mockOnChange}
                isSelected={mockIsSelected}
            />,
        );

        const teammateElement = screen.getByText('John Doe');
        fireEvent.click(teammateElement);

        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenCalledWith(mockTeammate);
    });

    it('displays teammate email if first and last name are not provided', () => {
        const mockTeammateNoName = {
            ...mockTeammate,
            firstName: '',
            lastName: '',
        };

        render(
            <Teammate
                teammate={mockTeammateNoName}
                onChange={mockOnChange}
                isSelected={mockIsSelected}
            />,
        );

        const teammateEmail = screen.getByText('johndoe@example.com');
        expect(teammateEmail).toBeInTheDocument();
    });

    it('renders check icon when isSelected is true', () => {
        const { baseElement } = render(
            <Teammate
                teammate={mockTeammate}
                onChange={mockOnChange}
                isSelected={true}
            />,
        );

        const checkIcon = baseElement.querySelector('.check-icon');
        expect(checkIcon).toBeInTheDocument();
    });
});
