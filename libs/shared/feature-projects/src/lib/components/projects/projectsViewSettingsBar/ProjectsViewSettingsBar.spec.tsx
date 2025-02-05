import { fireEvent, render, screen } from '@testing-library/react';
import { ProjectsViewSettingsBar } from './ProjectsViewSettingsBar';

const props = {
    activeProjectsCount: 3,
    archivedProjectsCount: 1,
    inProgressProjectsCount: 0,
    newProjectsCount: 0,
    submittedProjectsCount: 0,
    filterProjects: {},
    changeFilterProjects: jest.fn(),
    isFetchingProjects: false,
    role: 'client' as 'client' | 'agency',
};

describe('ProjectsViewSettingsBar', () => {
    it('renders the FilterProjects component when there are projects', () => {
        render(<ProjectsViewSettingsBar {...props} />);

        expect(
            screen.getByTestId('client-filter-projects'),
        ).toBeInTheDocument();
    });
    it('does not call the changeFilterProjects function when a filter label is clicked while fetching projects', () => {
        render(
            <ProjectsViewSettingsBar {...props} isFetchingProjects={true} />,
        );

        fireEvent.click(screen.getByText('Archive'));

        expect(props.changeFilterProjects).not.toHaveBeenCalled();
    });

    it('renders a message when there are no projects', () => {
        render(
            <ProjectsViewSettingsBar
                {...props}
                activeProjectsCount={0}
                archivedProjectsCount={0}
            />,
        );

        expect(screen.getByText('The benefits of breef')).toBeInTheDocument();
    });

    it('calls the changeFilterProjects function with the correct value when a filter label is clicked', () => {
        render(<ProjectsViewSettingsBar {...props} />);

        fireEvent.click(screen.getByText('Archive'));

        expect(props.changeFilterProjects).toHaveBeenCalledWith({
            status: 'archived',
        });
    });
});
