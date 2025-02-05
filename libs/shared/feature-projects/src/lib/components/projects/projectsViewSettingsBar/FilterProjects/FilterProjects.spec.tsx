import { render, fireEvent } from '@testing-library/react';
import { Filters } from '@breef/shared/constants';
import { FilterProjects } from './FilterProjects';
import '@testing-library/jest-dom';

const defaultProps = {
    activeProjectsCount: 2,
    archivedProjectsCount: 3,
    inProgressProjectsCount: 4,
    newProjectsCount: 5,
    submittedProjectsCount: 6,
    role: 'client' as 'client' | 'agency',
};

describe('FilterProjects', () => {
    it('renders the ClientFilter when role is "client"', () => {
        const { getByTestId, queryByTestId } = render(
            <FilterProjects {...defaultProps} />,
        );
        expect(getByTestId('client-filter-projects')).toBeInTheDocument();
        expect(queryByTestId('agency-filter-projects')).toBeNull();
    });

    it('renders the AgencyFilter when role is "agency"', () => {
        const { getByTestId, queryByTestId } = render(
            <FilterProjects {...defaultProps} role="agency" />,
        );
        expect(getByTestId('agency-filter-projects')).toBeInTheDocument();
        expect(queryByTestId('client-filter-projects')).toBeNull();
    });

    it('does not call the changeFilterProjects function when the component is fetching projects', () => {
        const changeFilterProjectsMock = jest.fn();
        const { getByText } = render(
            <FilterProjects
                {...defaultProps}
                isFetchingProjects
                changeFilterProjects={changeFilterProjectsMock}
                role="agency"
            />,
        );
        fireEvent.click(
            getByText(`New projects (${defaultProps.newProjectsCount})`),
        );
        expect(changeFilterProjectsMock).not.toHaveBeenCalled();
    });

    it('calls the changeFilterProjects function with the correct filter when a filter is clicked', () => {
        const changeFilterProjectsMock = jest.fn();
        const { getByText } = render(
            <FilterProjects
                {...defaultProps}
                changeFilterProjects={changeFilterProjectsMock}
                role="agency"
            />,
        );
        fireEvent.click(
            getByText(`New projects (${defaultProps.newProjectsCount})`),
        );
        expect(changeFilterProjectsMock).toHaveBeenCalledWith({
            status: Filters.new_projects,
        });
    });

    it('displays the correct project counts in the filters', () => {
        const { getByText } = render(
            <FilterProjects {...defaultProps} role="agency" />,
        );
        expect(
            getByText(`New projects (${defaultProps.newProjectsCount})`),
        ).toBeInTheDocument();
        expect(
            getByText(`submitted (${defaultProps.submittedProjectsCount})`),
        ).toBeInTheDocument();
        expect(
            getByText(`in progress (${defaultProps.inProgressProjectsCount})`),
        ).toBeInTheDocument();
        expect(getByText('archive')).toBeInTheDocument();
    });

    it('does not display the archive filter if archivedProjectsCount is zero', () => {
        const { queryByText } = render(
            <FilterProjects
                {...defaultProps}
                archivedProjectsCount={0}
                role="agency"
            />,
        );
        expect(queryByText('archive')).not.toBeInTheDocument();
    });
});
