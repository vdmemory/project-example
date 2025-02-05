import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ClientFilter from './ClientFilter';
import '@testing-library/jest-dom';
import { Filters } from '@breef/shared/constants';

describe('ClientFilter', () => {
    const changeFilterProjects = jest.fn();

    it('should render "Your projects" filter label', () => {
        const { getByText } = render(
            <ClientFilter
                activeProjectsCount={1}
                archivedProjectsCount={0}
                isFetchingProjects={false}
                filterProjects={{ status: Filters.active }}
                changeFilterProjects={changeFilterProjects}
            />,
        );

        expect(getByText('My projects')).toBeInTheDocument();
    });

    it('should render "Archive" filter label if there are archived projects', () => {
        const { getByText } = render(
            <ClientFilter
                activeProjectsCount={1}
                archivedProjectsCount={1}
                isFetchingProjects={false}
                filterProjects={{ status: Filters.archived }}
                changeFilterProjects={changeFilterProjects}
            />,
        );

        expect(getByText('Archive')).toBeInTheDocument();
    });

    it('should not call changeFilterProjects when filters are being fetched', () => {
        const { getByText } = render(
            <ClientFilter
                activeProjectsCount={1}
                archivedProjectsCount={0}
                isFetchingProjects={true}
                filterProjects={{ status: Filters.active }}
                changeFilterProjects={changeFilterProjects}
            />,
        );

        fireEvent.click(getByText('My projects'));

        expect(changeFilterProjects).not.toHaveBeenCalled();
    });

    it('should call changeFilterProjects when "Your projects" filter is clicked', () => {
        const { getByText } = render(
            <ClientFilter
                activeProjectsCount={1}
                archivedProjectsCount={0}
                isFetchingProjects={false}
                filterProjects={{ status: Filters.active }}
                changeFilterProjects={changeFilterProjects}
            />,
        );

        fireEvent.click(getByText('My projects'));

        expect(changeFilterProjects).toHaveBeenCalledWith({
            status: 'active',
        });
    });

    it('should call changeFilterProjects when "Archive" filter is clicked', () => {
        const { getByText } = render(
            <ClientFilter
                activeProjectsCount={0}
                archivedProjectsCount={1}
                isFetchingProjects={false}
                filterProjects={{ status: Filters.active }}
                changeFilterProjects={changeFilterProjects}
            />,
        );

        fireEvent.click(getByText('Archive'));

        expect(changeFilterProjects).toHaveBeenCalledWith({
            status: 'archived',
        });
    });
});
