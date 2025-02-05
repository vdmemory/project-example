import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TeammatesSelect } from './TeammatesSelect';

describe('TeammatesSelect', () => {
    const mockTeammatesList = [
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'janedoe@example.com',
        },
    ];
    const mockSelectedTeammates = [mockTeammatesList[0]];
    const mockOnChange = jest.fn();
    const mockOnAdd = jest.fn();

    it('renders TeammatesSelect component correctly', () => {
        const { baseElement } = render(
            <TeammatesSelect
                teammatesList={mockTeammatesList}
                selectedTeammates={mockSelectedTeammates}
                onChange={mockOnChange}
                onAdd={mockOnAdd}
            />,
        );

        const teammateElements = baseElement.querySelectorAll('.teammate-name');
        expect(teammateElements).toHaveLength(mockTeammatesList.length);

        const addButton = screen.getByText('Add Team Member');
        expect(addButton).toBeInTheDocument();
    });

    it('calls onChange function when teammate is clicked', () => {
        render(
            <TeammatesSelect
                teammatesList={mockTeammatesList}
                selectedTeammates={mockSelectedTeammates}
                onChange={mockOnChange}
                onAdd={mockOnAdd}
            />,
        );

        const teammateElement = screen.getByText('John Doe');
        fireEvent.click(teammateElement);

        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenCalledWith(mockTeammatesList[0]);
    });
});
