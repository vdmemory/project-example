import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AgencyFilter from './AgencyFilter';
import { Filters } from '@breef/shared/constants';
import '@testing-library/jest-dom';

describe('AgencyFilter', () => {
    const props = {
        activeProjectsCount: 2,
        archivedProjectsCount: 1,
        isFetchingProjects: false,
        inProgressProjectsCount: 3,
        newProjectsCount: 4,
        submittedProjectsCount: 5,
    };

    it('displays correct project counts', () => {
        render(<AgencyFilter {...props} />);
        expect(screen.getByText(/new projects/i)).toHaveTextContent(
            'New projects (4)',
        );
        expect(screen.getByText(/submitted/i)).toHaveTextContent(
            'submitted (5)',
        );
        expect(screen.getByText(/in progress/i)).toHaveTextContent(
            'in progress (3)',
        );
    });

    it('archive filter is only displayed if there are archived projects', () => {
        const newProps = { ...props, archivedProjectsCount: 0 };
        render(<AgencyFilter {...newProps} />);
        expect(screen.queryByText(/archive/i)).toBeNull();

        const newerProps = { ...props, archivedProjectsCount: 1 };
        render(<AgencyFilter {...newerProps} />);
        expect(screen.getByText(/archive/i)).toBeInTheDocument();
    });

    it('clicking filter items calls the changeFilterProjects prop with the correct value', () => {
        const changeFilterProjects = jest.fn();
        render(
            <AgencyFilter
                {...props}
                changeFilterProjects={changeFilterProjects}
                filterProjects={{ status: Filters.submitted }}
            />,
        );

        fireEvent.click(screen.getByText(/new projects/i));
        expect(changeFilterProjects).toHaveBeenCalledWith({
            status: Filters.new_projects,
        });

        fireEvent.click(screen.getByText(/in progress/i));
        expect(changeFilterProjects).toHaveBeenCalledWith({
            status: Filters.in_progress,
        });

        fireEvent.click(screen.getByText(/submitted/i));
        expect(changeFilterProjects).toHaveBeenCalledWith({
            status: Filters.submitted,
        });
    });
});
