import { FilterProjectsType } from '@breef/shared/types';
import ClientFilter from './clientFilter/ClientFilter';
import AgencyFilter from './agencyFilter/AgencyFilter';

interface FilterProjectsProps {
    filterProjects?: FilterProjectsType;
    activeProjectsCount: number;
    archivedProjectsCount: number;
    inProgressProjectsCount: number;
    newProjectsCount: number;
    submittedProjectsCount: number;
    changeFilterProjects?: (values: FilterProjectsType) => void;
    isFetchingProjects?: boolean;
    role: 'client' | 'agency';
}

export function FilterProjects({
    filterProjects,
    changeFilterProjects,
    isFetchingProjects = false,
    activeProjectsCount,
    archivedProjectsCount,
    inProgressProjectsCount,
    newProjectsCount,
    submittedProjectsCount,
    role,
}: FilterProjectsProps) {
    return role === 'client' ? (
        <ClientFilter
            activeProjectsCount={activeProjectsCount}
            archivedProjectsCount={archivedProjectsCount}
            isFetchingProjects={isFetchingProjects}
            filterProjects={filterProjects}
            changeFilterProjects={changeFilterProjects}
        />
    ) : (
        <AgencyFilter
            activeProjectsCount={activeProjectsCount}
            archivedProjectsCount={archivedProjectsCount}
            isFetchingProjects={isFetchingProjects}
            filterProjects={filterProjects}
            inProgressProjectsCount={inProgressProjectsCount}
            newProjectsCount={newProjectsCount}
            submittedProjectsCount={submittedProjectsCount}
            changeFilterProjects={changeFilterProjects}
        />
    );
}
