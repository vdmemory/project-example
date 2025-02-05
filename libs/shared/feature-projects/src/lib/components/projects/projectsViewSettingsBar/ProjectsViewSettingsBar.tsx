import { StyledProjectsViewSettingsBar } from './ProjectsViewSettingsBar.styled';
import { RefObject } from 'react';
import { FilterProjectsType } from '@breef/shared/types';
import { FilterProjects } from './FilterProjects/FilterProjects';

interface ProjectsViewSettingsBarProps {
    activeProjectsCount: number;
    archivedProjectsCount: number;
    inProgressProjectsCount: number;
    newProjectsCount: number;
    submittedProjectsCount: number;
    setRef?: RefObject<HTMLDivElement>;
    filterProjects?: FilterProjectsType;
    changeFilterProjects?: (values: FilterProjectsType) => void;
    isFetchingProjects?: boolean;
    role: 'client' | 'agency';
}

export function ProjectsViewSettingsBar({
    setRef,
    filterProjects,
    changeFilterProjects,
    isFetchingProjects = false,
    activeProjectsCount,
    archivedProjectsCount,
    inProgressProjectsCount = 0,
    newProjectsCount = 0,
    submittedProjectsCount = 0,
    role = 'client',
}: ProjectsViewSettingsBarProps) {
    const isRenderFilters = () => {
        if (
            role === 'client' &&
            (!!activeProjectsCount || !!archivedProjectsCount)
        ) {
            return true;
        } else if (role === 'agency') {
            return true;
        }
        return false;
    };

    return (
        <StyledProjectsViewSettingsBar
            ref={setRef}
            isClient={role === 'client'}
            className={'projects-view-settings-bar'}
        >
            {isRenderFilters() ? (
                <FilterProjects
                    activeProjectsCount={activeProjectsCount}
                    archivedProjectsCount={archivedProjectsCount}
                    filterProjects={filterProjects}
                    changeFilterProjects={changeFilterProjects}
                    isFetchingProjects={isFetchingProjects}
                    inProgressProjectsCount={inProgressProjectsCount}
                    newProjectsCount={newProjectsCount}
                    submittedProjectsCount={submittedProjectsCount}
                    role={role}
                />
            ) : (
                <span className="filter-label">The benefits of breef</span>
            )}
        </StyledProjectsViewSettingsBar>
    );
}
